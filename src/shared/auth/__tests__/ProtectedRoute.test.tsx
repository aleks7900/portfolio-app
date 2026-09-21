import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { AdminRoute, ProtectedRoute } from '../../ProtectedRoute';
import { renderWithProviders } from '../../../test/helpers/renderWithProviders';
import { mockUserJwtToken, mockValidJwtToken } from '../../../test/mocks/handlers';

describe('ProtectedRoute and AdminRoute components', () => {
  describe('ProtectedRoute', () => {
    it('redirects unauthenticated user away to "/"', () => {
      renderWithProviders(
        <Routes>
          <Route path="/" element={<div>Публичная главная</div>} />
          <Route
            path="/private"
            element={
              <ProtectedRoute>
                <div>Секретная зона</div>
              </ProtectedRoute>
            }
          />
        </Routes>,
        { initialRoute: '/private', authToken: null }
      );

      expect(screen.getByText('Публичная главная')).toBeInTheDocument();
      expect(screen.queryByText('Секретная зона')).not.toBeInTheDocument();
    });

    it('renders protected content when user is authenticated', () => {
      renderWithProviders(
        <Routes>
          <Route path="/" element={<div>Публичная главная</div>} />
          <Route
            path="/private"
            element={
              <ProtectedRoute>
                <div>Секретная зона</div>
              </ProtectedRoute>
            }
          />
        </Routes>,
        { initialRoute: '/private', authToken: mockUserJwtToken }
      );

      expect(screen.getByText('Секретная зона')).toBeInTheDocument();
      expect(screen.queryByText('Публичная главная')).not.toBeInTheDocument();
    });
  });

  describe('AdminRoute', () => {
    it('redirects unauthenticated user away to "/"', () => {
      renderWithProviders(
        <Routes>
          <Route path="/" element={<div>Публичная главная</div>} />
          <Route
            path="/admin/requests"
            element={
              <AdminRoute>
                <div>Админка заявок</div>
              </AdminRoute>
            }
          />
        </Routes>,
        { initialRoute: '/admin/requests', authToken: null }
      );

      expect(screen.getByText('Публичная главная')).toBeInTheDocument();
      expect(screen.queryByText('Админка заявок')).not.toBeInTheDocument();
    });

    it('redirects authenticated non-admin user away to "/"', () => {
      renderWithProviders(
        <Routes>
          <Route path="/" element={<div>Публичная главная</div>} />
          <Route
            path="/admin/requests"
            element={
              <AdminRoute>
                <div>Админка заявок</div>
              </AdminRoute>
            }
          />
        </Routes>,
        { initialRoute: '/admin/requests', authToken: mockUserJwtToken }
      );

      expect(screen.getByText('Публичная главная')).toBeInTheDocument();
      expect(screen.queryByText('Админка заявок')).not.toBeInTheDocument();
    });

    it('renders admin content when authenticated as admin', () => {
      renderWithProviders(
        <Routes>
          <Route path="/" element={<div>Публичная главная</div>} />
          <Route
            path="/admin/requests"
            element={
              <AdminRoute>
                <div>Админка заявок</div>
              </AdminRoute>
            }
          />
        </Routes>,
        { initialRoute: '/admin/requests', authToken: mockValidJwtToken }
      );

      expect(screen.getByText('Админка заявок')).toBeInTheDocument();
    });
  });
});
