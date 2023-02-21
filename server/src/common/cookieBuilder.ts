export const buildCookie = (name: string, value: string, options?: CookieBuilderOptions): string => {
  let cookie = `${name}=${value}`;
  if (options?.path) cookie = `${cookie}; Path=${options.path}`;
  if (options?.secure) cookie = `${cookie}; Secure`;
  if (options?.httpOnly) cookie = `${cookie}; HttpOnly`;
  if (options?.sameSite) {
    let sameSite: string;
    switch (options.sameSite.toLowerCase()) {
      case 'lax':
        sameSite = 'Lax';
        break;
      case 'strict':
        sameSite = 'Strict';
        break;
      default:
        sameSite = 'None';
        break;
    }
    cookie = `${cookie}; SameSite=${sameSite}`;
  }
  return cookie;
};

interface CookieBuilderOptions {
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'lax' | 'strict' | 'none';
}
