import React from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../shared/i18n/i18n.tsx';
import { ThemeProvider } from '../../shared/theme/theme.tsx';
import { AuthProvider } from '../../shared/auth/auth.tsx';

export interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialRoute?: string;
  authToken?: string | null;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    initialRoute = '/',
    authToken = null,
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  if (authToken) {
    localStorage.setItem('auth_token', authToken);
  }

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <I18nProvider>
        <ThemeProvider>
          <AuthProvider>
            <MemoryRouter initialEntries={[initialRoute]}>
              {children}
            </MemoryRouter>
          </AuthProvider>
        </ThemeProvider>
      </I18nProvider>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
