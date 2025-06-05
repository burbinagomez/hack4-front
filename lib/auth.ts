import { CognitoClient } from '@aws-sdk/client-cognito-identity-provider';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

const COGNITO_DOMAIN = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
const CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const USER_POOL_ID = process.env.NEXT_PUBLIC_USER_POOL_ID;

// Initialize the JWT verifier
const verifier = CognitoJwtVerifier.create({
  userPoolId: USER_POOL_ID!,
  clientId: CLIENT_ID!,
  tokenUse: 'access',
});

// Initialize Cognito client
const cognitoClient = new CognitoClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

export const auth = {
  // Redirect to Cognito hosted UI
  login: () => {
    const loginUrl = `https://${COGNITO_DOMAIN}/login?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=email+openid+profile`;
    window.location.href = loginUrl;
  },

  // Handle the callback with authorization code
  handleCallback: async (code: string) => {
    try {
      const params = {
        ClientId: CLIENT_ID!,
        Code: code,
        GrantType: 'authorization_code',
        RedirectUri: REDIRECT_URI!,
      };

      const response = await cognitoClient.initiateAuth(params);
      
      if (response.AuthenticationResult) {
        const { AccessToken, IdToken, RefreshToken } = response.AuthenticationResult;
        
        // Store tokens securely
        sessionStorage.setItem('accessToken', AccessToken);
        sessionStorage.setItem('idToken', IdToken);
        localStorage.setItem('refreshToken', RefreshToken);
        
        return true;
      }
      
      throw new Error('Authentication failed');
    } catch (error) {
      console.error('Auth callback error:', error);
      throw error;
    }
  },

  // Verify token and get user info
  getUser: async () => {
    try {
      const accessToken = sessionStorage.getItem('accessToken');
      if (!accessToken) return null;

      const payload = await verifier.verify(accessToken);
      return payload;
    } catch (error) {
      console.error('Token verification error:', error);
      return null;
    }
  },

  // Refresh access token
  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('No refresh token available');

      const params = {
        ClientId: CLIENT_ID!,
        RefreshToken: refreshToken,
        GrantType: 'refresh_token',
      };

      const response = await cognitoClient.initiateAuth(params);
      
      if (response.AuthenticationResult) {
        const { AccessToken, IdToken } = response.AuthenticationResult;
        sessionStorage.setItem('accessToken', AccessToken);
        sessionStorage.setItem('idToken', IdToken);
        return true;
      }
      
      throw new Error('Token refresh failed');
    } catch (error) {
      console.error('Token refresh error:', error);
      auth.logout();
      throw error;
    }
  },

  // Logout user
  logout: () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
    window.location.href = `https://${COGNITO_DOMAIN}/logout?client_id=${CLIENT_ID}&logout_uri=${REDIRECT_URI}`;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!sessionStorage.getItem('accessToken');
  }
};