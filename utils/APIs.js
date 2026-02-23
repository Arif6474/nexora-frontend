export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + 'api/customerApp/public/'

// User APIs
export const AUTH_API = API_BASE_URL + 'auth/'
export const LOGIN_API = AUTH_API + 'login/'
export const REGISTER_API = AUTH_API + 'register/'
export const FORGOT_PASSWORD_API = AUTH_API + 'forgotPassword/'
export const RESET_PASSWORD_API = AUTH_API + 'resetPassword/'
export const EMAIL_FROM_TOKEN_API = AUTH_API + 'getEmailFromToken/'
export const LOGIN_WITH_GOOGLE_API = AUTH_API + 'loginWithGoogle/'

