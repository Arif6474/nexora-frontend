export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + 'api/customerApp/public/'
export const PROTECTED_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + 'api/customerApp/protected/'

// User APIs
export const AUTH_API = API_BASE_URL + 'auth/'
export const LOGIN_API = AUTH_API + 'login/'
export const REGISTER_API = AUTH_API + 'register/'
export const FORGOT_PASSWORD_API = AUTH_API + 'forgotPassword/'
export const RESET_PASSWORD_API = AUTH_API + 'resetPassword/'
export const EMAIL_FROM_TOKEN_API = AUTH_API + 'getEmailFromToken/'
export const LOGIN_WITH_GOOGLE_API = AUTH_API + 'loginWithGoogle/'

// Protected APIs
export const UPDATE_PROFILE_API = PROTECTED_API_BASE_URL + 'updateProfile/'

// Public APIs
export const HOME_API = API_BASE_URL + 'getHomePageData'
export const GET_ALL_PRODUCTS_WITH_QUERY_API = API_BASE_URL + 'getAllProductsWithQuery'
export const CATEGORIES_API = API_BASE_URL + 'getAllProductCategories'
export const BRANDS_API = API_BASE_URL + 'getAllBrands'
export const SUBCATEGORIES_BY_CATEGORY_API = API_BASE_URL + 'getSubCategoriesByCategoryId/'
export const SINGLE_PRODUCT_API = API_BASE_URL + 'getSingleProductDetails/'
export const SINGLE_PRODUCT_BY_SLUG_API = API_BASE_URL + 'getSingleProductBySlug/'


