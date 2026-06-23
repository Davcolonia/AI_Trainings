export interface AuthPayload {
  username?: string;
  password?: string;
}

export interface AuthResponse {
  token?: string;
  reason?: string;
}

export interface BookingDates {
  checkin?: string;
  checkout?: string;
}

export interface BookingDetails {
  firstname?: string;
  lastname?: string;
  totalprice?: number;
  depositpaid?: boolean;
  bookingdates?: BookingDates;
  additionalneeds?: string;
}

export interface BookingResponse {
  bookingid: number;
  booking: BookingDetails;
}

export interface BookingIdResponse {
  bookingid: number;
}
