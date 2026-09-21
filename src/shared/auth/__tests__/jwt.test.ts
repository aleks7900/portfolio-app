import { describe, expect, it } from 'vitest';
import { decodeJwt, isExpired } from '../jwt';
import { createJwtToken } from '../../../test/factories/dataFactories';

describe('jwt utility functions', () => {
  describe('decodeJwt', () => {
    it('decodes a valid JWT token payload correctly', () => {
      const token = createJwtToken({
        sub: 'user@example.com',
        roles: ['ROLE_USER'],
        exp: 1800000000,
      });

      const payload = decodeJwt(token);

      expect(payload).not.toBeNull();
      expect(payload?.sub).toBe('user@example.com');
      expect(payload?.roles).toEqual(['ROLE_USER']);
      expect(payload?.exp).toBe(1800000000);
    });

    it('handles unicode characters in token payload', () => {
      const token = createJwtToken({
        sub: 'тест@example.com',
        roles: ['АДМИН'],
      });

      const payload = decodeJwt(token);

      expect(payload).not.toBeNull();
      expect(payload?.sub).toBe('тест@example.com');
      expect(payload?.roles).toEqual(['АДМИН']);
    });

    it('returns null for an empty string', () => {
      expect(decodeJwt('')).toBeNull();
    });

    it('returns null for malformed token structure without dot separation', () => {
      expect(decodeJwt('notavalidtoken')).toBeNull();
    });

    it('returns null for invalid base64 string', () => {
      expect(decodeJwt('header.!!!invalid-base64!!!.signature')).toBeNull();
    });

    it('returns null for invalid JSON inside payload', () => {
      const invalidJsonPayload = btoa('not json')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
      expect(decodeJwt(`header.${invalidJsonPayload}.signature`)).toBeNull();
    });
  });

  describe('isExpired', () => {
    it('returns false when expiration timestamp is in the future', () => {
      const futureTime = Math.floor(Date.now() / 1000) + 3600; // +1 hour
      const token = createJwtToken({ exp: futureTime });

      expect(isExpired(token)).toBe(false);
    });

    it('returns true when expiration timestamp is in the past', () => {
      const pastTime = Math.floor(Date.now() / 1000) - 3600; // -1 hour
      const token = createJwtToken({ exp: pastTime });

      expect(isExpired(token)).toBe(true);
    });

    it('returns true when expiration timestamp equals current second', () => {
      const nowSec = Math.floor(Date.now() / 1000);
      const token = createJwtToken({ exp: nowSec });

      expect(isExpired(token)).toBe(true);
    });

    it('returns false when token does not contain exp field', () => {
      const token = createJwtToken({ sub: 'user@example.com' });

      expect(isExpired(token)).toBe(false);
    });

    it('returns false for completely invalid token without payload', () => {
      expect(isExpired('invalid-token')).toBe(false);
    });
  });
});
