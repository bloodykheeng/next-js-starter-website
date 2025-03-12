// eslint-disable-next-line no-undef
importScripts(
  "https://www.gstatic.com/firebasejs/11.3.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.3.1/firebase-messaging-compat.js"
);

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
// };

// //----- farouks config =================
// const firebaseConfig = {
//   apiKey: "AIzaSyDAVSw8yTqXfCblomshf5dt6xSYgD_8qdY",
//   authDomain: "fcm-demo-25933.firebaseapp.com",
//   projectId: "fcm-demo-25933",
//   storageBucket: "fcm-demo-25933.firebasestorage.app",
//   messagingSenderId: "629792265761",
//   appId: "1:629792265761:web:a98550fa6d9aacede0f560",
//   measurementId: "G-5F97795PD8"
// };

//----- maks config =================
const firebaseConfig = {
  apiKey: "AIzaSyCToCuPV8aYxaJ4jYXFzHLayvYPpRbVzBE",
  authDomain: "oag-cfp.firebaseapp.com",
  projectId: "oag-cfp",
  storageBucket: "oag-cfp.appspot.com",
  messagingSenderId: "465146992051",
  appId: "1:465146992051:web:bba19191eac07edebea7c6",
  measurementId: "G-JWFHTS986C"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./logo.png"
  };

  // // by default if the payload comes with notification key inside firebase will trigger
  // // windows notification automatically but if so u have to remove self.registration
  // // to prevent double or twice notifications
  // // for more info read here
  // // https://stackoverflow.com/questions/66697332/firebase-web-push-notifications-is-triggered-twice-when-using-onbackgroundmessag

  // self.registration.showNotification(notificationTitle, notificationOptions);
});
