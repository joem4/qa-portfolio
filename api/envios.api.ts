import { APIRequestContext, expect } from '@playwright/test';
import { BulkRequest, BulkResponse } from '../types/envio.types';

export class EnviosApi {
  constructor(private request: APIRequestContext) {}

  async crearEnvio(
    payload: BulkRequest,
    accessToken: string
  ): Promise<BulkResponse> {
    const response = await this.request.post(
      `${process.env.CORE_API_URL}/order/bulk`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          email: 'admin@urbano.com',
          username: 'admin',
        },
        data: payload,
      }
    );

    const text = await response.text();

    console.log('ENVIO STATUS:', response.status());
    console.log('ENVIO BODY:', text);

    expect(response.status()).toBe(201);

    const body: BulkResponse = JSON.parse(text);

    return body;

    

  }

  async buscarOrdenPorTrackingId(
  trackingId: string,
  accessToken: string
): Promise<any> {
  const response = await this.request.get(
    `${process.env.CORE_API_URL}/order/complete/${trackingId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Node: 'RENDICIONES',
        'Device-Info': 'Google Inc. SM-G981B - android Android 13',
      },
    }
  );

  const text = await response.text();

  console.log('BUSCAR ORDEN STATUS:', response.status());
  console.log('BUSCAR ORDEN BODY:', text);

  expect(response.status()).toBe(200);

  return JSON.parse(text);
}
}