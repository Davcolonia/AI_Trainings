import { APIRequestContext, APIResponse } from '@playwright/test';
import { AuthPayload } from '../models/Booking';

export class AuthApi {
  constructor(private request: APIRequestContext) {}

  async createToken(payload: AuthPayload): Promise<APIResponse> {
    return this.request.post('/auth', {
      data: payload,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async getAuthToken(
    username = process.env.AUTH_USERNAME || 'admin',
    password = process.env.AUTH_PASSWORD || 'password123'
  ): Promise<string> {
    const response = await this.createToken({ username, password });
    if (!response.ok()) {
      throw new Error(`Failed to generate auth token: ${response.statusText()}`);
    }
    const body = await response.json();
    if (!body.token) {
      throw new Error(`Auth failed: reason = ${body.reason || 'unknown'}`);
    }
    return body.token;
  }
}
