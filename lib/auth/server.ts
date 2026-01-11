import { NextRequest } from 'next/server';

const COOKIE_NAME = 'p2b_admin';
const TOKEN_VERSION = 'v1';
const encoder = new TextEncoder();

type SessionPayload = {
  role: 'admin';
  issuedAt: number;
  version: typeof TOKEN_VERSION;
};

const getSecret = () => {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET is not set');
  }
  return secret;
};

const getKey = async () =>
  crypto.subtle.importKey(
    'raw',
    encoder.encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );

const encodeBase64 = (bytes: Uint8Array) => {
  if (typeof btoa === 'function') {
    let binary = '';
    bytes.forEach((b) => {
      binary += String.fromCharCode(b);
    });
    return btoa(binary);
  }
  // Node.js fallback
  // eslint-disable-next-line no-undef
  return Buffer.from(bytes).toString('base64');
};

const decodeBase64 = (value: string) => {
  if (typeof atob === 'function') {
    const binary = atob(value);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }
  // Node.js fallback
  // eslint-disable-next-line no-undef
  return new Uint8Array(Buffer.from(value, 'base64'));
};

const toBase64Url = (buffer: ArrayBuffer | Uint8Array): string =>
  encodeBase64(buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

const fromBase64Url = (value: string) =>
  decodeBase64(value.replace(/-/g, '+').replace(/_/g, '/'));

const sign = async (payload: SessionPayload) => {
  const body = toBase64Url(encoder.encode(JSON.stringify(payload)));
  const key = await getKey();
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(body)) as ArrayBuffer;
  const signature = toBase64Url(signatureBuffer);
  return `${body}.${signature}`;
};

const verify = async (token?: string): Promise<SessionPayload | null> => {
  if (!token) return null;
  const [body, signature] = token.split('.');
  if (!body || !signature) return null;

  try {
    const key = await getKey();
    const isValid = await crypto.subtle.verify('HMAC', key, fromBase64Url(signature), encoder.encode(body));

    if (!isValid) return null;

    const decodedBody = new TextDecoder().decode(fromBase64Url(body));
    const parsed = JSON.parse(decodedBody) as SessionPayload;
    if (parsed.version !== TOKEN_VERSION || parsed.role !== 'admin') return null;
    return parsed;
  } catch {
    return null;
  }
};

export const authSession = {
  cookieName: COOKIE_NAME,
  create: async () =>
    sign({
      role: 'admin',
      issuedAt: Date.now(),
      version: TOKEN_VERSION,
    }),
  verify,
  fromRequest: async (request: NextRequest) => {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    return verify(token);
  },
};
