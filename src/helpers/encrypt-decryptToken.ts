import * as crypto from 'crypto-js';
import { ENCRYPTION_KEY } from 'src/utils/constants';

export function encrypt(data: string): string {
  const key = ENCRYPTION_KEY;
  const bytes = crypto.AES.encrypt(data, key);
  return bytes.toString(crypto.Utf8);
}

export function decrypt(data: string): string {
  const key = ENCRYPTION_KEY;
  const bytes = crypto.AES.decrypt(data, key);
  return bytes.toString(crypto.enc.Utf8);
}
