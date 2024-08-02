import * as crypto from 'crypto-js';

export function encrypt(data: string): string {
  const key = process.env.ENCRYPTION_KEY;
  const bytes = crypto.AES.encrypt(data, key);
  return bytes.toString(crypto.Utf8);
}

export function decrypt(data: string): string {
  const key = process.env.ENCRYPTION_KEY;
  const bytes = crypto.AES.decrypt(data, key);
  return bytes.toString(crypto.Utf8);
}
