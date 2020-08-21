import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

// return Cookies.get("Token")

export function getToken() {
return Cookies.get("Token")
}

export function setToken(token) {
return Cookies.set(TokenKey, token)
}

export function removeToken() {
return Cookies.remove(TokenKey)
}