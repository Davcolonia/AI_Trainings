import { BookingDetails } from '../models/Booking';

export function createValidBookingData(): BookingDetails {
  return {
    firstname: 'Jim',
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2018-01-01',
      checkout: '2019-01-01'
    },
    additionalneeds: 'Breakfast'
  };
}

export function createCustomBookingData(overrides: Partial<BookingDetails>): BookingDetails {
  return {
    ...createValidBookingData(),
    ...overrides
  };
}
