import { test, expect } from '../src/fixtures/apiFixtures';
import { createValidBookingData } from '../src/data/bookingData';
import { validateSchema } from '../src/utils/schemaValidator';
import { getBookingSchema } from '../src/schemas/getBookingSchema';

test.describe('Booking - GetBookingIds & GetBooking API', () => {
  let createdBookingId: number;
  const testBookingData = createValidBookingData();

  test.beforeAll(async ({ bookingApi }) => {
    const response = await bookingApi.createBooking(testBookingData);
    expect(response.status()).toBe(200);
    const body = await response.json();
    createdBookingId = body.bookingid;
  });

  test('Verify GET /booking returns an array of all booking ID objects (TC-GBI-001)', async ({ bookingApi }) => {
    const response = await bookingApi.getBookings();
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('bookingid');
    expect(typeof body[0].bookingid).toBe('number');
  });

  test('Verify GET /booking filtered by firstname and lastname returns matching bookings (TC-GBI-002)', async ({ bookingApi }) => {
    const queryParams = {
      firstname: testBookingData.firstname!,
      lastname: testBookingData.lastname!
    };
    const response = await bookingApi.getBookings(queryParams);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    
    const found = body.some((b: any) => b.bookingid === createdBookingId);
    expect(found).toBe(true);
  });

  test('Verify GET /booking filtered by checkin and checkout date (TC-GBI-003)', async ({ bookingApi }) => {
    const queryParams = {
      checkin: '2017-01-01',
      checkout: '2020-01-01'
    };
    const response = await bookingApi.getBookings(queryParams);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    
    const found = body.some((b: any) => b.bookingid === createdBookingId);
    expect(found).toBe(true);
  });

  test('Verify GET /booking/:id returns full booking object for a valid booking ID (TC-GB-001)', async ({ bookingApi }) => {
    const response = await bookingApi.getBooking(createdBookingId);
    expect(response.status()).toBe(200);
    const body = await response.json();
    
    expect(body.firstname).toBe(testBookingData.firstname);
    expect(body.lastname).toBe(testBookingData.lastname);
    expect(body.totalprice).toBe(testBookingData.totalprice);
    expect(body.depositpaid).toBe(testBookingData.depositpaid);
    expect(body.bookingdates.checkin).toBe(testBookingData.bookingdates?.checkin);
    expect(body.bookingdates.checkout).toBe(testBookingData.bookingdates?.checkout);
    expect(body.additionalneeds).toBe(testBookingData.additionalneeds);

    const schemaResult = validateSchema(getBookingSchema, body);
    expect(schemaResult.valid).toBe(true);
  });

  test('Verify GET /booking/:id returns XML response when Accept: application/xml is set (TC-GB-002)', async ({ bookingApi }) => {
    const response = await bookingApi.getBooking(createdBookingId, 'application/xml');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('<booking>');
    expect(body).toContain('</booking>');
    expect(body).toContain(`<firstname>${testBookingData.firstname}</firstname>`);
    expect(body).toContain(`<lastname>${testBookingData.lastname}</lastname>`);
  });

  test('Verify GET /booking/:id returns 404 for a non-existent booking ID (TC-GB-003)', async ({ bookingApi }) => {
    const response = await bookingApi.getBooking(999999);
    expect(response.status()).toBe(404);
  });
});
