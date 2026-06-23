import { APIRequestContext, APIResponse } from '@playwright/test';

export class PingApi {
  constructor(private request: APIRequestContext) {}

  async healthCheck(): Promise<APIResponse> {
    return this.request.get('/ping');
  }
}
