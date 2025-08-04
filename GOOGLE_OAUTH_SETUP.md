# Google OAuth Setup Instructions

## 1. Create Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Set authorized redirect URIs:
     - For development: `http://localhost:8000/auth/google/callback`
     - For production: `https://your-backend-domain.com/auth/google/callback`

## 2. Configure Environment Variables

Create a `.env` file in the server directory with:

```bash
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
SESSION_SECRET=your-random-session-secret-here
CLIENT_URL=http://localhost:5173
```

## 3. How it Works

1. User clicks "Sign in with Google" button
2. Frontend redirects to `/auth/google` endpoint
3. Backend redirects to Google OAuth page
4. User authorizes the app on Google
5. Google redirects back to `/auth/google/callback`
6. Backend creates/finds user and generates JWT token
7. Backend redirects to frontend `/auth/callback?token=jwt_token`
8. Frontend receives token and logs user in
9. User is redirected to dashboard

## 4. Database Schema Updates

The User model now includes:
- `googleId`: Unique Google user identifier
- `avatar`: Profile picture URL from Google
- `password`: Now optional (not required for Google users)

## 5. Testing

1. Start the backend server: `npm start`
2. Start the frontend: `npm run dev`
3. Navigate to login page
4. Click "Sign in with Google"
5. Complete Google OAuth flow

## 6. Production Deployment

Make sure to:
1. Update authorized redirect URIs in Google Console
2. Set production environment variables
3. Use HTTPS for secure cookies
4. Update CORS origins for production domain
