export const TOKEN_EXP_TIME = '10m' as const;

export const COOKIE_OPTIONS = {
  sameSite: 'strict',
  path: '/api/auth',
  httpOnly: true,
  secure: true
} as const;
