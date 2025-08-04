# Step-by-Step Guide: Getting Google OAuth Credentials

## 📋 **Step 1: Create a Google Cloud Project**

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create a New Project**
   - Click the project dropdown at the top
   - Click "New Project"
   - Enter project name: `FocusFlow` (or any name you prefer)
   - Click "Create"
   - Wait for the project to be created and select it

## 🔧 **Step 2: Enable Required APIs**

1. **Navigate to APIs & Services**
   - In the left sidebar, click "APIs & Services" → "Library"
   
2. **Enable Google+ API**
   - Search for "Google+ API" in the search bar
   - Click on "Google+ API"
   - Click "Enable" button
   - Wait for it to be enabled

## 🔑 **Step 3: Create OAuth 2.0 Credentials**

1. **Go to Credentials Page**
   - In the left sidebar, click "APIs & Services" → "Credentials"

2. **Configure OAuth Consent Screen (First Time Only)**
   - Click "Configure Consent Screen"
   - Choose "External" (unless you have a Google Workspace account)
   - Fill in required fields:
     - App name: `FocusFlow`
     - User support email: Your email
     - Developer contact information: Your email
   - Click "Save and Continue"
   - Skip "Scopes" and "Test users" for now
   - Click "Back to Dashboard"

3. **Create OAuth 2.0 Client ID**
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: Select "Web application"
   - Name: `FocusFlow Web Client`
   
4. **Add Authorized Redirect URIs**
   - In "Authorized redirect URIs" section, click "Add URI"
   - Add these URIs:
     ```
     http://localhost:8000/auth/google/callback
     https://your-backend-domain.vercel.app/auth/google/callback
     ```
   - Replace `your-backend-domain` with your actual Vercel backend URL when you deploy

5. **Create the Credentials**
   - Click "Create"
   - A popup will show your credentials

## 📝 **Step 4: Copy Your Credentials**

From the popup, you'll see:
- **Client ID**: Something like `123456789-abcdefg.apps.googleusercontent.com`
- **Client Secret**: Something like `GOCSPX-AbCdEfGhIjKlMnOpQrStUvWx`

**Copy both values!**

## 💾 **Step 5: Create Your .env File**

1. **Navigate to your server folder**
   ```bash
   cd server
   ```

2. **Create .env file** (copy from .env.example)
   ```bash
   copy .env.example .env
   ```
   Or on Mac/Linux:
   ```bash
   cp .env.example .env
   ```

3. **Edit the .env file** with your credentials:
   ```bash
   # Your existing variables...
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   
   # Add these Google OAuth credentials
   GOOGLE_CLIENT_ID=123456789-abcdefg.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-AbCdEfGhIjKlMnOpQrStUvWx
   SESSION_SECRET=your-random-long-string-here
   CLIENT_URL=http://localhost:5173
   ```

## 🔐 **Step 6: Generate SESSION_SECRET**

You can generate a random session secret using:

**Option 1: Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Option 2: Online Generator**
- Visit: https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx
- Generate a 64-character random string

## ✅ **Step 7: Test Your Setup**

1. **Start your backend server**
   ```bash
   cd server
   npm start
   ```

2. **Start your frontend**
   ```bash
   cd client
   npm run dev
   ```

3. **Test Google OAuth**
   - Go to http://localhost:5173/login
   - Click "Sign in with Google"
   - You should be redirected to Google's OAuth page
   - After authorization, you should be redirected back to your app

## 🚨 **Common Issues & Solutions**

### Issue 1: "redirect_uri_mismatch" error
**Solution**: Make sure your redirect URI in Google Console exactly matches:
```
http://localhost:8000/auth/google/callback
```

### Issue 2: "App not verified" warning
**Solution**: This is normal for development. Click "Advanced" → "Go to FocusFlow (unsafe)"

### Issue 3: Can't find Google+ API
**Solution**: Try searching for "People API" instead, as Google+ API might be deprecated

### Issue 4: "Client not found" error
**Solution**: Double-check your GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env file

## 📱 **For Production Deployment**

When you deploy to production:
1. Update authorized redirect URIs in Google Console
2. Add your production backend URL
3. Update environment variables on your hosting platform
4. Ensure HTTPS is used for production

## 🆘 **Need Help?**

If you encounter any issues:
1. Check the browser console for error messages
2. Check your server logs
3. Verify all environment variables are set correctly
4. Ensure your redirect URIs match exactly
