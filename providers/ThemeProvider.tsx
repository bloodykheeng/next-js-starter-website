"use client";

import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

type Theme = "light" | "dark";
type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children, defaultTheme }: { children: React.ReactNode, defaultTheme: any }) {

    const savedTheme = Cookies.get("theme") as Theme;
    const [theme, setTheme] = useState<Theme>(defaultTheme ?? savedTheme ?? "light");

    useEffect(() => {
        const html = document.documentElement;
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            Cookies.set("theme", theme, { expires: 365 }); // set initial default theme
        }

        if (savedTheme === "dark") {
            html.classList.add("dark");
            html.classList.remove("light");
            html.style.colorScheme = "dark";
            html.setAttribute("data-theme", 'dark'); // Set data-theme attribute
        } else {
            html.classList.add("light");
            html.classList.remove("dark");
            html.style.colorScheme = "light";
            html.setAttribute("data-theme", 'light'); // Set data-theme attribute
        }
    }, []);

    const handleSetTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        Cookies.set("theme", newTheme, { expires: 365 }); // Store for a year

        const html = document.documentElement;

        if (newTheme === "dark") {
            html.classList.add("dark");
            html.classList.remove("light");
            html.style.colorScheme = "dark";
            html.setAttribute("data-theme", 'dark'); // Set data-theme attribute
        } else {
            html.classList.add("light");
            html.classList.remove("dark");
            html.style.colorScheme = "light";
            html.setAttribute("data-theme", 'light'); // Set data-theme attribute
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
