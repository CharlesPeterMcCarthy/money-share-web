/*
  Copy and paste this template into the environment.ts and environment.prod.ts
  Fill in the values.
*/

export const environment = {
  production: true,
  brand: '{{ BRAND_NAME }}',
  awsConfig: {
    Auth: {
      identityPoolId: '{{ IDENTITY_POOL_ID }}',
      region: '{{ REGION }}',
      userPoolId: '{{ USER_POOL_ID }}',
      userPoolWebClientId: '{{ CLIENT_ID }}'
    },
    API: {
      endpoints: [
        {
          name: '{{ API_NAME }}',
          endpoint: '{{ API_URL }}',
          region: '{{ REGION }}'
        }
      ]
    }
  }
};
