"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getMessaging, onMessage, MessagePayload, isSupported } from "firebase/messaging";
import firebaseApp from "@/firebase";
import { usePrimeReactToast } from "./PrimeReactToastProvider";
import useFcmToken from "@/hooks/useFCMToken";
import useAuthContext from "./AuthProvider";
import { postToSaveWebAppToken } from "@/services/firebase/firebase-service";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Howl } from "howler"; // ✅ Import Howler

// Define Context Type
interface NotificationContextType {
    notification: MessagePayload | null;
}

// Create Context
const FirebaseNotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
    children: ReactNode;
}

export const FirebaseNotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [notification, setNotification] = useState<MessagePayload | null>(null);
    const primeReactToast = usePrimeReactToast();

    const queryClient = useQueryClient();

    const { fcmToken } = useFcmToken();
    const { getUserQuery } = useAuthContext();
    const userData = getUserQuery?.data?.data;
    console.log("🚀 ~ userData: tttttt", getUserQuery)

    console.log("🚀 ~ fcmToken:", fcmToken);


    // ✅ Initialize notification sound
    const notificationSound = new Howl({ src: ["/media/mixkit-bell-notification-933.wav"] });

    // Mutation to save token and subscribe via Laravel API
    const saveTokenMutation = useMutation({
        mutationFn: postToSaveWebAppToken,
        onSuccess: (data) => {
            console.log("🚀 ~ saveTokenMutation data:", data)
            // primeReactToast.success("Notification settings updated!");
        },
        onError: (error) => {
            primeReactToast.error("Failed to update notification settings.");
            console.error("saveTokenMutation Token update error:", error);
        },
    });

    // Save token when available
    useEffect(() => {
        if (fcmToken && userData) {
            saveTokenMutation.mutate({ firebase_token: fcmToken });
        }
    }, [fcmToken, userData]);

    // Handle Foreground Notifications
    useEffect(() => {

        const retrieveForegroundNotifications = async () => {
            // if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            const hasFirebaseMessagingSupport = await isSupported();
            if (hasFirebaseMessagingSupport) {
                console.log("Listening for foreground notifications...");
                const messaging = getMessaging(firebaseApp);
                const unsubscribe = onMessage(messaging, (payload: MessagePayload) => {
                    console.log("Foreground push notification received:", payload);
                    setNotification(payload);

                    // ✅ Play sound when notification arrives
                    notificationSound.play();

                    // Display toast notification
                    if (payload.notification?.title) {
                        primeReactToast.success(payload?.notification?.title, payload?.notification?.body);
                        // Check notification type
                        const notificationType = payload?.data?.type;
                        if (notificationType === "polls") {
                            queryClient.invalidateQueries({ queryKey: ["polls"] });
                        } else {
                            queryClient.invalidateQueries({ queryKey: ["notifications"] });
                        }
                    }
                });

                return () => unsubscribe();
            }
        }

        retrieveForegroundNotifications()

    }, [fcmToken]);

    return (
        <FirebaseNotificationContext.Provider value={{ notification }}>
            {children}
        </FirebaseNotificationContext.Provider>
    );
};

// Custom Hook to use the notification context
export const useFirebaseNotifications = (): NotificationContextType => {
    const context = useContext(FirebaseNotificationContext);
    if (!context) {
        throw new Error("useFirebaseNotifications must be used within FirebaseNotificationProvider");
    }
    return context;
};
