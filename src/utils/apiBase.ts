/** Normalized API origin (no trailing slash). Same backend as www.flashfirejobs.com. */
export function getApiBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.flashfirejobs.com"
  ).replace(/\/+$/, "");
}

/** Absolute API path, e.g. apiUrl("/api/campaigns/track/visit") */
export function apiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${p}`;
}
