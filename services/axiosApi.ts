"use client";
import axios from "axios";
import Cookies from "js-cookie"; // Client-side cookies

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log("🚀 ~ baseURL :", baseURL);

// Function to get access token (Server & Client)
// 🌍 Client-side: Use js-cookie
const accessToken = Cookies.get("access_token") || null;

export const headers = {
  Authorization: `Bearer ${accessToken ? accessToken : null}`,
  "Content-Type": "application/json",
  accept: "application/json"
};

// Create Axios instance
const axiosAPI = axios.create({
  baseURL: baseURL,
  // timeout: 50000,
  withCredentials: false,
  headers: headers
});

// Set new headers (Client-side only)
export function setNewHeaders(response?: any) {
  // console.log("🚀 ~ setNewHeaders ~ response:", response)

  if (response?.data?.refresh_token) {
    // Cookies.set("refresh_token", response.data.data.refresh_token, { expires: 7, secure: true, sameSite: "Strict" });
    Cookies.set("refresh_token", response.data.data.refresh_token, {
      expires: 7
    });
  }

  if (response?.data?.access_token) {
    Cookies.set("access_token", response.data.access_token, { expires: 7 });
    axiosAPI.defaults.headers.Authorization = `Bearer ${response.data.access_token}`;
  }
}

// Set profile data in cookies (Client-side only) 7 days to expire
export function setProfileHeaders(response?: { data?: unknown }) {
  if (!response?.data) return;
  Cookies.set("profile", JSON.stringify(response.data), { expires: 7 });
}

// Remove cookies (Logout)
export function clearAuthCookies() {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  Cookies.remove("profile");
  delete axiosAPI.defaults.headers.Authorization;
}

export default axiosAPI;
