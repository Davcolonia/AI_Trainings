import { test, expect } from '../src/fixtures/apiFixtures';
import { createValidBookingData } from '../src/data/bookingData';
import { validateSchema } from '../src/utils/schemaValidator';
import { createBookingSchema } from '../src/schemas/createBookingSchema';

test.describe('Booking - CreateBooking API', () => {
  test('Verify POST /booking creates a new booking and returns bookingid and full booking object (TC-CB-001)', async ({ bookingApi }) => {
    const testBookingData = createValidBookingData();
    const response = await bookingApi.createBooking(testBookingData);
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    
    const schemaResult = validateSchema(createBookingSchema, body);
    expect(schemaResult.valid).toBe(true);

    expect(body).toHaveProperty('bookingid');
    expect(typeof body.bookingid).toBe('number');
    
    const booking = body.booking;
    expect(booking.firstname).toBe(testBookingData.firstname);
    expect(booking.lastname).toBe(testBookingData.lastname);
    expect(booking.totalprice).toBe(testBookingData.totalprice);
    expect(booking.depositpaid).toBe(testBookingData.depositpaid);
    expect(booking.bookingdates.checkin).toBe(testBookingData.bookingdates?.checkin);
    expect(booking.bookingdates.checkout).toBe(testBookingData.bookingdates?.checkout);
    expect(booking.additionalneeds).toBe(testBookingData.additionalneeds);
  });

  test('Verify POST /booking creates a new booking using XML Content-Type and returns XML response (TC-CB-002)', async ({ bookingApi }) => {
    const xmlPayload = `
      <booking>
        <firstname>Jim</firstname>
        <lastname>Brown</lastname>
        <totalprice>111</totalprice>
        <depositpaid>true</depositpaid>
        <bookingdates>
          <checkin>2018-01-01</checkin>
          <checkout>2019-01-01</checkout>
        </bookingdates>
        <additionalneeds>Breakfast</additionalneeds>
      </booking>
    `.trim();

    const response = await bookingApi.createBooking(xmlPayload, 'text/xml', 'application/xml');
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain('<created-booking>');
    expect(body).toContain('</created-booking>');
    expect(body).toContain('<bookingid>');
    expect(body).toContain('<firstname>Jim</firstname>');
    expect(body).toContain('<lastname>Brown</lastname>');
    expect(body).toContain('<totalprice>111</totalprice>');
    expect(body).toContain('<depositpaid>true</depositpaid>');
  });

  test('Verify POST /booking fails/warns for bad payload (e.g. missing checkin date) (TC-CB-003 Alternative)', async ({ bookingApi }) => {
    const badPayload = {
      firstname: 'Jim',
      lastname: 'Brown'
    };
    const response = await bookingApi.createBooking(badPayload);
    expect([500, 400]).toContain(response.status());
  });
});
