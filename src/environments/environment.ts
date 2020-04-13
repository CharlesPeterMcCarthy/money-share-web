export const environment = {
  production: false,
  brand: 'MoneyShare',
  stripeAPIKey: 'pk_test_C3YzTsDUJVHfdDMv6PAxMhuJ00eEaKmxoq',
  awsConfig: {
    Auth: {
      identityPoolId: 'eu-west-1:6a9f773e-7f81-4b30-a0f6-481e2d7bab4c',
      region: 'eu-west-1',
      userPoolId: 'eu-west-1_gb8ClFz4k',
      userPoolWebClientId: '3s9vqdl3u97jr2rq4l021f133a'
    },
    API: {
      endpoints: [
        {
          name: 'dev-MoneyShare-ApiGatewayRestApi',
          endpoint: 'https://3w7ze6q3y6.execute-api.eu-west-1.amazonaws.com/dev',
          region: 'eu-west-1'
        }
      ]
    }
  }
};
