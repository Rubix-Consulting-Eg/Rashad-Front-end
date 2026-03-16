"use server";

import { getApiClient } from "@/lib/api";

// ── Server Component example ─────────────────────────────────
export async function getUsers() {
  const api = await getApiClient();
  const { data } = await api.get("/users");
  return data;
}

// ── Server Action example ────────────────────────────────────
export async function createUser(name: string, email: string) {
  const api = await getApiClient();
  const { data } = await api.post("/users", {
    name,
    email,
  });
  return data;
}

// ── With custom params (merged normally) ─────────────────────
export async function getProducts(page: number) {
  const api = await getApiClient();
  const { data } = await api.get("/products", {
    params: { page, limit: 20 },
  });
  return data;
}
