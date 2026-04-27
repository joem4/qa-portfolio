import { APIRequestContext, expect } from '@playwright/test';

export class AuthApi {
  constructor(private request: APIRequestContext) {}

  async getAccessToken(): Promise<string> {
    const response = await this.request.post(process.env.COGNITO_URL as string, {
      headers: {
        'Content-Type': 'application/x-amz-json-1.1',
        'x-amz-target': 'AWSCognitoIdentityProviderService.InitiateAuth',
      },
      data: {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: process.env.COGNITO_CLIENT_ID,
        AuthParameters: {
          USERNAME: process.env.COGNITO_USERNAME,
          PASSWORD: process.env.COGNITO_PASSWORD,
        },
        ClientMetadata: {},
      },
    });

    const text = await response.text();

console.log('AUTH STATUS:', response.status());
console.log('AUTH BODY:', text);

expect(response.status()).toBe(200);

const body = JSON.parse(text);

return body.AuthenticationResult.IdToken;
    
  }
}