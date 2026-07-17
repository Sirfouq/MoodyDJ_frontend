const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:5000/api'
const SPOTIFY_PLAYER_BASE = 'https://api.spotify.com'

export const API_ENDPOINTS = {
  AUTH_STATUS: `${API_BASE_URL}/auth/status`,
  LOGIN: `${API_BASE_URL}/login`,
  LOGOUT : `${API_BASE_URL}/logout`,
  GENERATE: `${API_BASE_URL}/generate`,
  ME : `${API_BASE_URL}/me`

 
  
}

export const SPOTIFY_PLAYER_ENDPOINTS = {
  PLAYER : `${SPOTIFY_PLAYER_BASE}/v1/me/player/play`
}