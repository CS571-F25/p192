import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Save JWT token to cookie
export function saveToken(token) {
  Cookies.set("jwt_token", token, { expires: 7 });
}

export function loadToken() {
  const token = Cookies.get("jwt_token");
  return token ? JSON.parse(token) : null;
}

export function decodeToken(token) {
  return token; 
}

export function logoutUser() {
  Cookies.remove("jwt_token");
}