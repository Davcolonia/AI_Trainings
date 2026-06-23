export const createBookingSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "bookingid": {
      "type": "number"
    },
    "booking": {
      "$ref": "#/definitions/BookingDetails"
    }
  },
  "required": ["bookingid", "booking"],
  "definitions": {
    "BookingDetails": {
      "type": "object",
      "properties": {
        "firstname": { "type": "string" },
        "lastname": { "type": "string" },
        "totalprice": { "type": "number" },
        "depositpaid": { "type": "boolean" },
        "bookingdates": {
          "type": "object",
          "properties": {
            "checkin": { "type": "string", "format": "date" },
            "checkout": { "type": "string", "format": "date" }
          },
          "required": ["checkin", "checkout"]
        },
        "additionalneeds": { "type": "string" }
      },
      "required": ["firstname", "lastname", "totalprice", "depositpaid", "bookingdates"]
    }
  }
};
