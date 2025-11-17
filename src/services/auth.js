// src/services/auth.js

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // ✅ named import

// Save JWT token to cookie
export function saveToken(token) {
  Cookies.set("jwt_token", token, { expires: 7 });
}

export function loadToken() {
  const token = Cookies.get("jwt_token");
  return token ? JSON.parse(token) : null;
}

export function decodeToken(token) {
  return token; // since we store it as JSON
}

export function logoutUser() {
  Cookies.remove("jwt_token");
}