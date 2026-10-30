# Clarivate Medicine Dashboard

## Auth0 SSO

Create a Single Page Application in Auth0, copy `.env.example` to `.env.local`, and set the application domain and client ID:

```env
VITE_AUTH0_DOMAIN=your-tenant.us.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
```

In the Auth0 application settings, add the app origin to **Allowed Callback URLs**, **Allowed Logout URLs**, and **Allowed Web Origins**. For local development, use `http://localhost:5173`. Add the deployed site origin to each list when deploying.

Restart Vite after changing environment variables. The client ID is public; never put an Auth0 client secret in a `VITE_` variable.

Signing in opens Auth0-hosted login in a popup while keeping the dashboard open.

## Development

Start the FastAPI backend in one terminal:

```sh
python -m pip install -r backend/requirements.txt
python -m uvicorn backend.main:app --reload
```

Then start the Vite frontend in another terminal:

```sh
npm install
npm run dev
```

Vite proxies `/api` requests to the backend at `http://127.0.0.1:8000`. The dashboard fetches its data from `/api/medicine-data`; the API reads `src/data/medicineData.json`. FastAPI's interactive API documentation is available at `http://127.0.0.1:8000/docs`.

## Deploy on Vercel

Import this repository into Vercel and set the project root to `vite-project` if Vercel does not select it automatically. The included `vercel.json` builds the Vite app into `dist` and rewrites `/api/medicine-data` to a Python serverless function. The Vercel function and local FastAPI backend both read the same `src/data/medicineData.json` file.

Add `VITE_AUTH0_DOMAIN` and `VITE_AUTH0_CLIENT_ID` in the Vercel project's Environment Variables for the environments you deploy, then redeploy. In Auth0, add the deployed Vercel URL to **Allowed Callback URLs**, **Allowed Logout URLs**, and **Allowed Web Origins**.
