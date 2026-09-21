import { beforeEach, describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { apiFetch } from '../api';
import { server } from '../../../test/mocks/server';

describe('apiFetch client', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('performs a successful GET request and parses JSON', async () => {
    server.use(
      http.get('*/api/test-endpoint', () => {
        return HttpResponse.json({ success: true, count: 42 });
      })
    );

    const result = await apiFetch<{ success: boolean; count: number }>(
      '/test-endpoint'
    );
    expect(result).toEqual({ success: true, count: 42 });
  });

  it('deduplicates consecutive /api prefixes in URL paths', async () => {
    server.use(
      http.get('*/api/clean-path', () => {
        return HttpResponse.json({ ok: true });
      })
    );

    // If path begins with /api and base is /api, join should avoid /api/api
    const result = await apiFetch<{ ok: boolean }>('/api/clean-path');
    expect(result).toEqual({ ok: true });
  });

  it('injects Authorization: Bearer header when token exists in localStorage', async () => {
    localStorage.setItem('auth_token', 'my-secret-jwt');

    let capturedAuthHeader: string | null = null;
    server.use(
      http.get('*/api/protected-resource', ({ request }) => {
        capturedAuthHeader = request.headers.get('authorization');
        return HttpResponse.json({ allowed: true });
      })
    );

    await apiFetch('/protected-resource');
    expect(capturedAuthHeader).toBe('Bearer my-secret-jwt');
  });

  it('omits Authorization header when opts.auth is false even if token exists', async () => {
    localStorage.setItem('auth_token', 'my-secret-jwt');

    let capturedAuthHeader: string | null = null;
    server.use(
      http.get('*/api/public-resource', ({ request }) => {
        capturedAuthHeader = request.headers.get('authorization');
        return HttpResponse.json({ public: true });
      })
    );

    await apiFetch('/public-resource', { auth: false });
    expect(capturedAuthHeader).toBeNull();
  });

  it('handles 204 No Content returning undefined', async () => {
    server.use(
      http.delete('*/api/items/1', () => {
        return new HttpResponse(null, { status: 204 });
      })
    );

    const result = await apiFetch('/items/1', { method: 'DELETE' });
    expect(result).toBeUndefined();
  });

  it('serializes JSON body for object bodies', async () => {
    let capturedBody: unknown = null;
    server.use(
      http.post('*/api/echo', async ({ request }) => {
        capturedBody = await request.json();
        return HttpResponse.json({ received: true });
      })
    );

    await apiFetch('/echo', {
      method: 'POST',
      body: { title: 'New Item' },
    });

    expect(capturedBody).toEqual({ title: 'New Item' });
  });

  it('throws Error with backend message when server responds with 4xx or 5xx', async () => {
    server.use(
      http.post('*/api/error-test', () => {
        return HttpResponse.json(
          { message: 'Пользователь с таким email уже существует' },
          { status: 409 }
        );
      })
    );

    await expect(
      apiFetch('/error-test', { method: 'POST' })
    ).rejects.toThrow('Пользователь с таким email уже существует');
  });
});
