import { http, HttpResponse } from 'msw';

export const mockValidJwtToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  btoa(
    JSON.stringify({
      sub: 'admin@example.com',
      email: 'admin@example.com',
      roles: ['ROLE_ADMIN'],
      exp: Math.floor(Date.now() / 1000) + 3600 * 24, // valid for 24h
    })
  )
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '') +
  '.mockSignature';

export const mockExpiredJwtToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  btoa(
    JSON.stringify({
      sub: 'expired@example.com',
      email: 'expired@example.com',
      roles: ['ROLE_USER'],
      exp: Math.floor(Date.now() / 1000) - 3600, // expired 1 hour ago
    })
  )
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '') +
  '.mockSignature';

export const mockUserJwtToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  btoa(
    JSON.stringify({
      sub: 'user@example.com',
      email: 'user@example.com',
      roles: ['ROLE_USER'],
      exp: Math.floor(Date.now() / 1000) + 3600 * 24,
    })
  )
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '') +
  '.mockSignature';

export const mockSampleProducts = [
  {
    id: 1,
    title: 'Веб-сайт под ключ',
    brand: 'Alex-Lab',
    price: 1200,
    inStock: true,
    category: 'custom_orders',
    subcategory: 'site_orders',
    description: 'Разработка корпоративного сайта',
    availability: 'in_stock',
    imgLinks: ['/images/products/site-1.jpg'],
  },
  {
    id: 2,
    title: 'SPA-приложение React',
    brand: 'Alex-Lab',
    price: 2500,
    inStock: true,
    category: 'custom_orders',
    subcategory: 'spa_orders',
    description: 'Интерактивное SPA приложение',
    availability: 'in_stock',
    imgLinks: ['/images/products/spa-1.jpg'],
  },
];

export const mockSampleRequests = [
  {
    id: 101,
    name: 'Иван Петров',
    email: 'ivan@example.com',
    phone: '+37369123456',
    subject: 'Заказ сайта',
    message: 'Нужен сайт для компании',
    createdAt: '2026-09-20T10:00:00.000Z',
    status: 'NEW',
  },
  {
    id: 102,
    name: 'Мария Сидорова',
    email: 'maria@example.com',
    phone: '+37369234567',
    subject: 'Консультация',
    message: 'Хотим перенести проект на React',
    createdAt: '2026-09-20T12:30:00.000Z',
    status: 'IN_PROGRESS',
  },
];

export const handlers = [
  // Auth login
  http.post('*/auth/login', async ({ request }) => {
    const body = (await request.json().catch(() => ({}))) as {
      email?: string;
      password?: string;
    };
    if (body.email === 'admin@example.com' && body.password === 'secret') {
      return HttpResponse.json({
        token: mockValidJwtToken,
        tokenType: 'Bearer',
        accessToken: mockValidJwtToken,
      });
    }
    if (body.email === 'user@example.com' && body.password === 'secret') {
      return HttpResponse.json({
        token: mockUserJwtToken,
        tokenType: 'Bearer',
        accessToken: mockUserJwtToken,
      });
    }
    return HttpResponse.json(
      { message: 'Неверный логин или пароль' },
      { status: 401 }
    );
  }),

  // Products
  http.get('*/products', () => {
    return HttpResponse.json({
      content: mockSampleProducts,
      totalPages: 1,
      number: 0,
      size: 20,
    });
  }),

  http.get('*/products/:id', ({ params }) => {
    const product = mockSampleProducts.find((p) => p.id === Number(params.id));
    if (!product) {
      return HttpResponse.json({ message: 'Товар не найден' }, { status: 404 });
    }
    return HttpResponse.json(product);
  }),

  http.post('*/products', async ({ request }) => {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    return HttpResponse.json({ ...body, id: 999 }, { status: 201 });
  }),

  http.put('*/products/:id', async ({ request, params }) => {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    return HttpResponse.json({ ...body, id: Number(params.id) });
  }),

  http.delete('*/products/:id', () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // Requests
  http.get('*/requests', () => {
    return HttpResponse.json({
      content: mockSampleRequests,
      totalPages: 1,
      number: 0,
      size: 20,
    });
  }),

  http.post('*/requests', async ({ request }) => {
    // handles both multipart/form-data and JSON
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      return HttpResponse.json(
        {
          id: 200,
          name: formData.get('name') || '',
          email: formData.get('email') || '',
          phone: formData.get('phone') || '',
          subject: formData.get('subject') || '',
          message: formData.get('message') || '',
          createdAt: new Date().toISOString(),
          status: 'NEW',
        },
        { status: 201 }
      );
    }

    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    return HttpResponse.json(
      {
        id: 201,
        ...body,
        createdAt: new Date().toISOString(),
        status: 'NEW',
      },
      { status: 201 }
    );
  }),

  http.patch('*/requests/:id/status', async ({ request, params }) => {
    const body = (await request.json().catch(() => ({}))) as { status?: string };
    const existing = mockSampleRequests.find((r) => r.id === Number(params.id));
    return HttpResponse.json({
      ...(existing || { id: Number(params.id), name: 'Тест', message: 'Тест' }),
      status: body.status || 'DONE',
    });
  }),

  http.delete('*/requests/:id', () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // Callback Widget
  http.post('*/callbacks', async ({ request }) => {
    const body = (await request.json().catch(() => ({}))) as { phone?: string };
    if (!body.phone) {
      return HttpResponse.json({ message: 'Phone required' }, { status: 400 });
    }
    return HttpResponse.json({ ok: true, id: 301 });
  }),
  http.post('*/callback', async ({ request }) => {
    const body = (await request.json().catch(() => ({}))) as { phone?: string };
    if (!body.phone) {
      return HttpResponse.json({ message: 'Phone required' }, { status: 400 });
    }
    return HttpResponse.json({ ok: true, id: 301 });
  }),

  // Analytics events
  http.post('*/analytics/events', () => {
    return HttpResponse.json({ ok: true });
  }),

  // Users analytics page
  http.get('*/users/summary', () => {
    return HttpResponse.json({
      totalUsers: 1420,
      active7d: 350,
      active30d: 980,
      newToday: 24,
      avgSessionDurationSec: 185,
    });
  }),

  http.get('*/users/list', () => {
    return HttpResponse.json({
      items: [
        {
          userId: 'usr-1',
          firstSeen: '2026-09-01T10:00:00Z',
          lastSeen: '2026-09-21T09:00:00Z',
          sessions: 12,
          views: 45,
          avgSessionDurationSec: 210,
          bounceRate: 0.25,
        },
        {
          userId: 'usr-2',
          firstSeen: '2026-09-10T14:00:00Z',
          lastSeen: '2026-09-20T18:00:00Z',
          sessions: 4,
          views: 9,
          avgSessionDurationSec: 90,
          bounceRate: 0.5,
        },
      ],
      total: 2,
      page: 0,
      size: 20,
    });
  }),

  http.get('*/users', () => {
    return HttpResponse.json({
      items: [
        {
          userId: 'usr-1',
          firstSeen: '2026-09-01T10:00:00Z',
          lastSeen: '2026-09-21T09:00:00Z',
          sessions: 12,
          views: 45,
          avgSessionDurationSec: 210,
          bounceRate: 0.25,
        },
        {
          userId: 'usr-2',
          firstSeen: '2026-09-10T14:00:00Z',
          lastSeen: '2026-09-20T18:00:00Z',
          sessions: 4,
          views: 9,
          avgSessionDurationSec: 90,
          bounceRate: 0.5,
        },
      ],
      total: 2,
      page: 0,
      size: 20,
    });
  }),
];
