import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import {
  createRequest,
  deleteRequest,
  listRequests,
  updateRequestStatus,
} from '../requestsRepo';
import { server } from '../../../test/mocks/server';

describe('requests repository (requestsRepo.ts)', () => {
  it('lists requests and parses content correctly', async () => {
    const page = await listRequests();

    expect(page.content).toHaveLength(2);
    expect(page.content[0].name).toBe('Иван Петров');
    expect(page.content[0].status).toBe('NEW');
  });

  it('handles query parameters (status, page, size, q)', async () => {
    let capturedQuery: string | null = null;
    server.use(
      http.get('*/requests', ({ request }) => {
        const url = new URL(request.url);
        capturedQuery = url.search;
        return HttpResponse.json([]);
      })
    );

    await listRequests({ status: 'NEW', page: 2, size: 5, q: 'test' });

    expect(capturedQuery).toContain('status=NEW');
    expect(capturedQuery).toContain('page=2');
    expect(capturedQuery).toContain('size=5');
    expect(capturedQuery).toContain('q=test');
  });

  it('creates a new request without requiring authentication', async () => {
    const created = await createRequest({
      name: 'Новый Заказчик',
      email: 'client@mail.com',
      message: 'Нужна помощь с сайтом',
    });

    expect(created.id).toBe(201);
    expect(created.name).toBe('Новый Заказчик');
    expect(created.status).toBe('NEW');
  });

  it('updates request status', async () => {
    const updated = await updateRequestStatus(101, 'DONE');

    expect(updated.id).toBe(101);
    expect(updated.status).toBe('DONE');
  });

  it('deletes a request by id with purgeFiles flag', async () => {
    let capturedUrl: string | null = null;
    server.use(
      http.delete('*/requests/:id', ({ request }) => {
        capturedUrl = request.url;
        return new HttpResponse(null, { status: 204 });
      })
    );

    await deleteRequest(101, { purgeFiles: true });

    expect(capturedUrl).toContain('/requests/101?purgeFiles=1');
  });
});
