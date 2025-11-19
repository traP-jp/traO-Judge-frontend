export type OAuthProvider = 'google' | 'github' | 'traq'
export type OAuthAction = 'login' | 'signup' | 'bind'

export interface OAuthState {
  provider: OAuthProvider
  action: OAuthAction
  timestamp: number
  redirectTo?: string
}

export interface OAuthCallbackParams {
  code?: string
  state?: string
  error?: string
}