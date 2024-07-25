import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: './.env.development' });

//ACCESS PASSWORDS
export const CLIENT_PASS: string = process.env.ACCESS_CLIENT_PASS;
export const ADMIN_PASS: string = process.env.ACCESS_ADMIN_PASS;

//APPLICATION URLS
export const CLIENT_URL: string = process.env.CLIENT_BASE_URL;
export const API_URL: string = process.env.API_BASE_URL;
