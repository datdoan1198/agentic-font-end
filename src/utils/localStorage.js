const AUTH_TOKEN_STORE_KEY = 'token';
const AUTH_TOKEN_ADMIN_STORE_KEY = 'token_admin';

export const removeAuthToken = () => {
    return localStorage.removeItem(AUTH_TOKEN_STORE_KEY);
}

export const setAuthToken = (token) => {
    return localStorage.setItem(AUTH_TOKEN_STORE_KEY, token);
}

export const getAuthToken = () => {
    return localStorage.getItem(AUTH_TOKEN_STORE_KEY)
}

export const hasAuthToken = () => {
    return !!getAuthToken();
}

export const removeAuthTokenAdmin = () => {
    return localStorage.removeItem(AUTH_TOKEN_ADMIN_STORE_KEY);
}

export const setAuthTokenAdmin = (token) => {
    return localStorage.setItem(AUTH_TOKEN_ADMIN_STORE_KEY, token);
}

export const getAuthTokenAdmin = () => {
    return localStorage.getItem(AUTH_TOKEN_ADMIN_STORE_KEY)
}

export const removeItem = (name) => {
    return localStorage.removeItem(name);
}
