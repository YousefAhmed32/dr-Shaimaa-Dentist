export const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export async function apiFetch(path, options = {}) {
  const isFormData = options.body instanceof FormData;
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    ...options,
    headers: { ...(isFormData ? {} : options.body ? { "Content-Type": "application/json" } : {}), ...options.headers },
  });
  if (response.status === 204) return null;
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.message || "Request failed");
    error.code = payload.code;
    error.status = response.status;
    throw error;
  }
  return payload;
}

export const resolveMediaPath = (path) => path?.startsWith("/uploads/") ? `${API_URL}${path}` : path;

export const normalizeCase = (item) => ({ ...item, stages: item.stages.map((stage) => ({ ...stage, path: resolveMediaPath(stage.path) })) });
