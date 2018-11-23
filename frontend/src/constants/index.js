export const API_BASE_URL = window.location.origin === 'http://localhost:3000' ? 'http://localhost:8080' : '';
export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = '/oauth2/redirect'

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorization/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorization/facebook?redirect_uri=' + "www.google.com";
export const GITHUB_AUTH_URL = API_BASE_URL + '/oauth2/authorization/github?redirect_uri=' + OAUTH2_REDIRECT_URI;
