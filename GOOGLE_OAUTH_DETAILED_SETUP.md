# 🔐 Google OAuth Setup Guide for FocusFlow

## Step-by-Step Setup Instructions

### 1. **Enable Google+ API (You're here now!)**
**IMPORTANT UPDATE**: Google+ API is deprecated. Instead, look for:
- **"Google Identity Services API"** or 
- **"People API"** or
- Just **skip this step** - OAuth will work without enabling a specific API

**What to do now:**
- Clear the search box
- Search for "People API" 
- Click on "People API" and enable it
- OR proceed directly to step 2 (Credentials)

### 2. **Create OAuth 2.0 Credentials**
After enabling the API:
- Go to **"Credentials"** in the left sidebar
- Click **"+ CREATE CREDENTIALS"** 
- Select **"OAuth 2.0 Client IDs"**

### 3. **Configure OAuth Consent Screen** (if prompted)
- Choose **"External"** (for testing with personal accounts)
- Fill in required fields:
  - App name: `FocusFlow`
  - User support email: `your-email@gmail.com`
  - Developer contact: `your-email@gmail.com`
- Save and continue through all steps

### 4. **Create OAuth 2.0 Client ID**
- Application type: **"Web application"**
- Name: `FocusFlow Web Client`

**Authorized JavaScript origins:**
```
http://localhost:5174
https://focus-flow-kohl.vercel.app
```

**Authorized redirect URIs:**
```
http://localhost:8000/auth/google/callback
https://focusflow-backend.onrender.com/auth/google/callback
```

### 5. **Copy Your Credentials**
After creation, you'll get:
- **Client ID**: `xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com`
- **Client Secret**: `GOCSPX-xxxxxxxxxxxxxxxxxxxxxx`

### 6. **Update Your .env File**
Replace the placeholder values in `server/.env`:

```env
# Replace these with your actual credentials:
GOOGLE_CLIENT_ID=your_actual_client_id_from_step_5
GOOGLE_CLIENT_SECRET=your_actual_client_secret_from_step_5
```

### 7. **Restart Your Server**
```bash
cd server
npm start
```

You should see: `✅ Configuring Google OAuth strategy`

### 8. **Test Google Sign-In**
- Go to `http://localhost:5174/login`
- Click "Sign in with Google"
- Should redirect to Google → back to your app

---

## 🚨 **Important URLs to Configure:**

### **For Local Development:**
- **Frontend Origin**: `http://localhost:5174`
- **Backend Callback**: `http://localhost:8000/auth/google/callback`

### **For Production:**
- **Frontend Origin**: `https://focus-flow-kohl.vercel.app`
- **Backend Callback**: `https://focusflow-backend.onrender.com/auth/google/callback`

---

## 🔧 **Quick Test Commands:**

After setup, test these URLs:
- **Local Google Auth**: `http://localhost:8000/auth/google`
- **Production Google Auth**: `https://focusflow-backend.onrender.com/auth/google`

---

## 🆘 **Troubleshooting:**

1. **"redirect_uri_mismatch"** → Check your authorized redirect URIs
2. **"invalid_client"** → Verify Client ID and Secret are correct
3. **"access_denied"** → Make sure OAuth consent screen is configured

---

## ✅ **Success Indicators:**

- Server logs: `✅ Configuring Google OAuth strategy`
- Google sign-in button works without errors
- Redirects properly after Google authentication
- User is logged in and can access protected routes

---

**Need help?** The current implementation is fully ready - just need the credentials!
