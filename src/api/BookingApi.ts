import { APIRequestContext, APIResponse } from '@playwright/test';

export class BookingApi {
  constructor(private request: APIRequestContext) {}

  async getBookings(queryParams?: Record<string, string | number>): Promise<APIResponse> {
    return this.request.get('/booking', {
      params: queryParams
    });
  }

  async getBooking(id: string | number, acceptHeader = 'application/json'): Promise<APIResponse> {
    return this.request.get(`/booking/${id}`, {
      headers: {
        'Accept': acceptHeader
      }
    });
  }

  async createBooking(
    payload: any,
    contentType = 'application/json',
    acceptHeader = 'application/json'
  ): Promise<APIResponse> {
    const options: any = {
      headers: {
        'Content-Type': contentType,
        'Accept': acceptHeader
      }
    };

    if (contentType === 'application/json') {
      options.data = payload;
    } else if (contentType === 'application/x-www-form-urlencoded') {
      options.form = payload;
    } else {
      // For XML and raw formats, send as text
      options.data = payload;
    }

    return this.request.post('/booking', options);
  }

  async updateBooking(
    id: string | number,
    payload: any,
    authHeaders: Record<string, string>,
    contentType = 'application/json',
    acceptHeader = 'application/json'
  ): Promise<APIResponse> {
    const options: any = {
      headers: {
        'Content-Type': contentType,
        'Accept': acceptHeader,
        ...authHeaders
      }
    };

    if (contentType === 'application/json') {
      options.data = payload;
    } else {
      options.data = payload;
    }

    return this.request.put(`/booking/${id}`, options);
  }

  async partialUpdateBooking(
    id: string | number,
    payload: any,
    authHeaders: Record<string, string>,
    contentType = 'application/json',
    acceptHeader = 'application/json'
  ): Promise<APIResponse> {
    const options: any = {
      headers: {
        'Content-Type': contentType,
        'Accept': acceptHeader,
        ...authHeaders
      }
    };

    if (contentType === 'application/json') {
      options.data = payload;
    } else {
      options.data = payload;
    }

    return this.request.patch(`/booking/${id}`, options);
  }

  async deleteBooking(id: string | number, authHeaders: Record<string, string>): Promise<APIResponse> {
    return this.request.delete(`/booking/${id}`, {
      headers: {
        ...authHeaders
      }
    });
  }
}
