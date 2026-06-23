import { test, expect } from '../src/fixtures/apiFixtures';
import { createValidBookingData, createCustomBookingData } from '../src/data/bookingData';

test.describe('Booking - UpdateBooking & PartialUpdateBooking API', () => {
  let bookingId: number;

  test.beforeEach(async ({ bookingApi }) => {
    const response = await bookingApi.createBooking(createValidBookingData());
    expect(response.status()).toBe(200);
    const body = await response.json();
    bookingId = body.bookingid;
  });

  test('Verify PUT /booking/:id updates all fields using Cookie auth (TC-UB-001)', async ({ bookingApi, cookieAuthHeader }) => {
    const updatedData = createCustomBookingData({
      firstname: 'James',
      totalprice: 222,
      additionalneeds: 'Late Checkout'
    });

    const response = await bookingApi.updateBooking(bookingId, updatedData, cookieAuthHeader);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.firstname).toBe('James');
    expect(body.totalprice).toBe(222);
    expect(body.additionalneeds).toBe('Late Checkout');
    expect(body.lastname).toBe(updatedData.lastname);
    expect(body.depositpaid).toBe(updatedData.depositpaid);
  });

  test('Verify PUT /booking/:id updates all fields using Basic Auth header (TC-UB-002)', async ({ bookingApi, basicAuthHeader }) => {
    const updatedData = createCustomBookingData({
      firstname: 'Alex',
      lastname: 'Green'
    });

    const response = await bookingApi.updateBooking(bookingId, updatedData, basicAuthHeader);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.firstname).toBe('Alex');
    expect(body.lastname).toBe('Green');
  });

  test('Verify PUT /booking/:id fails with 403 when no auth is provided (TC-UB-003)', async ({ bookingApi }) => {
    const updatedData = createValidBookingData();
    const response = await bookingApi.updateBooking(bookingId, updatedData, {});
    expect(response.status()).toBe(403);
  });

  test('Verify PATCH /booking/:id partially updates fields using Cookie auth (TC-PUB-001)', async ({ bookingApi, cookieAuthHeader }) => {
    const partialPayload = {
      firstname: 'ModifiedFirst',
      lastname: 'ModifiedLast'
    };

    const response = await bookingApi.partialUpdateBooking(bookingId, partialPayload, cookieAuthHeader);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.firstname).toBe('ModifiedFirst');
    expect(body.lastname).toBe('ModifiedLast');
    expect(body.totalprice).toBe(111);
  });

  test('Verify PATCH /booking/:id partially updates fields using Basic Auth (TC-PUB-002)', async ({ bookingApi, basicAuthHeader }) => {
    const partialPayload = {
      totalprice: 500
    };

    const response = await bookingApi.partialUpdateBooking(bookingId, partialPayload, basicAuthHeader);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.totalprice).toBe(500);
    expect(body.firstname).toBe('Jim');
  });

  test('Verify PATCH /booking/:id fails with 403 when no auth is provided (TC-PUB-003)', async ({ bookingApi }) => {
    const partialPayload = {
      firstname: 'Hack'
    };
    const response = await bookingApi.partialUpdateBooking(bookingId, partialPayload, {});
    expect(response.status()).toBe(403);
  });
});
