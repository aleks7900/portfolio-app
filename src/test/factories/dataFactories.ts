import type { Product } from '../../data/types';
import type { RequestItem } from '../../shared/api/requestsRepo';

export function createTestProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 1,
    title: 'Тестовый сайт',
    brand: 'Alex-Lab',
    price: 1500,
    inStock: true,
    category: 'custom_orders',
    subcategory: 'site_orders',
    description: 'Описание тестового сайта',
    availability: 'in_stock',
    imgLinks: ['/images/test.jpg'],
    ...overrides,
  };
}

export function createTestRequest(overrides: Partial<RequestItem> = {}): RequestItem {
  return {
    id: 101,
    name: 'Тестовый Клиент',
    email: 'client@example.com',
    phone: '+37369000000',
    subject: 'Тестовая тема',
    message: 'Тестовое сообщение заявки',
    createdAt: new Date().toISOString(),
    status: 'NEW',
    ...overrides,
  };
}

export function createJwtToken(payload: {
  sub?: string;
  email?: string;
  roles?: string[];
  exp?: number;
}): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  const jsonStr = JSON.stringify(payload);
  const latin1 = unescape(encodeURIComponent(jsonStr));
  const body = btoa(latin1)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return `${header}.${body}.mockSig`;
}
