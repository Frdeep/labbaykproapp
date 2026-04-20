// ─── Resend Email Client ─────────────────────────────────────
// Transactional emails via Resend (booking confirmations, etc.)

import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const EMAIL_FROM = process.env.RESEND_FROM_EMAIL ?? 'noreply@labbayk.fr';
export const EMAIL_CONTACT = process.env.RESEND_TO_CONTACT ?? 'contact@labbayk.fr';
