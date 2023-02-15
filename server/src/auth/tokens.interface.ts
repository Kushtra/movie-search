export interface AccessToken {
  accessToken: string;
}

export interface AccessAndRefreshToken extends AccessToken {
  refreshToken: string;
}
