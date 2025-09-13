export type JwtPayload = {
    sub?: string;
    email?: string;
    roles?: string[];          // вариант 1
    authorities?: string[];    // вариант 2
    exp?: number;              // unix timestamp (sec)
    [k: string]: any;
};

export function decodeJwt(token: string): JwtPayload | null {
    try {
        const [, payload] = token.split(".");
        const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
        return JSON.parse(decodeURIComponent(escape(json)));
    } catch {
        return null;
    }
}

export function isExpired(token: string): boolean {
    const payload = decodeJwt(token);
    if (!payload?.exp) return false;
    const nowSec = Math.floor(Date.now() / 1000);
    return payload.exp <= nowSec;
}