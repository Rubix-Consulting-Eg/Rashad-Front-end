"use server";
import axios from "axios";
import { cookies } from "next/headers";

const COOKIE_TOKEN_KEY = "token";
const COOKIE_LANG_KEY = "lang";

async function getApiClient() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_TOKEN_KEY)?.value ?? "";
  const lang = cookieStore.get(COOKIE_LANG_KEY)?.value ?? "en";

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 15_000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": lang,
      "secret-key": process.env.NEXT_PUBLIC_API_SECRET_KEY ?? "",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  return instance;
}

export { getApiClient };
