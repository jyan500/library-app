export const API_VERSION = "api"
export const BACKEND_BASE_URL = "http://localhost:8000"
export const LOGIN_URL = `/${API_VERSION}/user/login`
export const REGISTER_URL = `/${API_VERSION}/user/register`
export const USER_PROFILE_URL = `/${API_VERSION}/user-profile`
export const USER_ROLE_URL = `/${API_VERSION}/user-role`
export const BOOK_URL = `/${API_VERSION}/book`
export const BOOK_STATUS_URL = `/${API_VERSION}/book-status`
export const NEWS_POST_URL = `/${API_VERSION}/news-post`
export const GENRE_URL = `/${API_VERSION}/genre`
export const NEWS_POST_GENRE_URL = `/${API_VERSION}/news-post-genre`
export const LIBRARY_URL = `/${API_VERSION}/library`
export const LIBRARY_BOOK_URL = (bookId: number) => `/${API_VERSION}/book/${bookId}/library`
export const CHECKOUT_URL = `/${API_VERSION}/checkout`
export const CHECKOUT_VALIDATE_URL = `/${API_VERSION}/checkout/validate`
export const CHECKOUT_CANCEL_URL = `/${API_VERSION}/checkout/cancel`
export const CHECKOUT_SUBMIT_URL = `/${API_VERSION}/checkout/submit`
export const USER_BORROW_HISTORY_URL = `/${API_VERSION}/user-borrow-history`
