# Clarivate Medicine Dashboard

## Auth0 SSO

Create a Single Page Application in Auth0, copy `.env.example` to `.env.local`, and set the application domain and client ID:

```env
VITE_AUTH0_DOMAIN=your-tenant.us.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
```

In the Auth0 application settings, add the app origin to **Allowed Callback URLs**, **Allowed Logout URLs**, and **Allowed Web Origins**. For local development, use `http://localhost:5173`. Add the deployed site origin to each list when deploying.

Restart Vite after changing environment variables. The client ID is public; never put an Auth0 client secret in a `VITE_` variable.

## Development

```sh
npm install
npm run dev
```

