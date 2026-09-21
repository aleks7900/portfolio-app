import { beforeEach, describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { AuthProvider, useAuth } from '../auth';
import { mockExpiredJwtToken, mockValidJwtToken } from '../../../test/mocks/handlers';

function wrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

describe('AuthProvider and useAuth hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('throws Error when useAuth is called outside of AuthProvider', () => {
    expect(() => renderHook(() => useAuth())).toThrow(
      'AuthProvider missing'
    );
  });

  it('initializes in unauthenticated state when localStorage is empty', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isAuth).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
  });

  it('initializes in authenticated admin state when valid admin token is in localStorage', () => {
    localStorage.setItem('auth_token', mockValidJwtToken);

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isAuth).toBe(true);
    expect(result.current.user?.email).toBe('admin@example.com');
    expect(result.current.user?.isAdmin).toBe(true);
  });

  it('automatically clears expired token on mount', () => {
    localStorage.setItem('auth_token', mockExpiredJwtToken);

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isAuth).toBe(false);
    expect(result.current.user).toBeNull();
    expect(localStorage.getItem('auth_token')).toBeNull();
  });

  it('logs in successfully and updates user and isAdmin status', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login('admin@example.com', 'secret');
    });

    expect(result.current.isAuth).toBe(true);
    expect(result.current.user?.email).toBe('admin@example.com');
    expect(result.current.user?.isAdmin).toBe(true);
    expect(localStorage.getItem('auth_token')).toBe(mockValidJwtToken);
  });

  it('throws and preserves unauthenticated state on failed login', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await expect(
      result.current.login('wrong@example.com', 'badpass')
    ).rejects.toThrow();

    expect(result.current.isAuth).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('logs out and clears localStorage', async () => {
    localStorage.setItem('auth_token', mockValidJwtToken);
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isAuth).toBe(true);

    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuth).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(localStorage.getItem('auth_token')).toBeNull();
  });

  it('automatically logs out on "auth:unauthorized" window event', () => {
    localStorage.setItem('auth_token', mockValidJwtToken);
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isAuth).toBe(true);

    act(() => {
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    });

    expect(result.current.isAuth).toBe(false);
    expect(result.current.user).toBeNull();
  });
});
