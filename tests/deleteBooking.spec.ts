import { test, expect } from '../src/fixtures/apiFixtures';
import { createValidBookingData } from '../src/data/bookingData';

test.describe('Booking - DeleteBooking API', () => {
  let bookingId: number;

  test.beforeEach(async ({ bookingApi }) => {
    const response = await bookingApi.createBooking(createValidBookingData());
    expect(response.status()).toBe(200);
    const body = await response.json();
    bookingId = body.bookingid;
  });

  test('Verify DELETE /booking/:id deletes an existing booking using Cookie auth (TC-DB-001)', async ({ bookingApi, cookieAuthHeader }) => {
    const deleteResponse = await bookingApi.deleteBooking(bookingId, cookieAuthHeader);
    expect(deleteResponse.status()).toBe(201);
    const text = await deleteResponse.text();
    expect(text).toBe('Created');

    const getResponse = await bookingApi.getBooking(bookingId);
    expect(getResponse.status()).toBe(404);
  });

  test('Verify DELETE /booking/:id deletes an existing booking using Basic Auth header (TC-DB-002)', async ({ bookingApi, basicAuthHeader }) => {
    const deleteResponse = await bookingApi.deleteBooking(bookingId, basicAuthHeader);
    expect(deleteResponse.status()).toBe(201);
    
    const getResponse = await bookingApi.getBooking(bookingId);
    expect(getResponse.status()).toBe(404);
  });

  test('Verify DELETE /booking/:id fails with 403 when no authorization is provided (TC-DB-003)', async ({ bookingApi }) => {
    const deleteResponse = await bookingApi.deleteBooking(bookingId, {});
    expect(deleteResponse.status()).toBe(403);

    const getResponse = await bookingApi.getBooking(bookingId);
    expect(getResponse.status()).toBe(200);
  });
});
