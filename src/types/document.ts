// ─── Document Types ──────────────────────────────────────────
// Mirrors the `documents` table in Supabase.

export type DocType = 'passport' | 'selfie' | 'residence_card' | 'vaccination' | 'other';

export type ValidationStatus =
  | 'pending'
  | 'uploading'
  | 'scanning'
  | 'validated'
  | 'needs_retry'
  | 'in_review';

export interface UserDocument {
  id: string;
  user_id: string;
  booking_id?: string | null;
  doc_type: DocType;
  file_url: string;
  file_name?: string | null;
  file_size?: number | null;
  mime_type?: string | null;
  ocr_data?: Record<string, unknown> | null;
  validation_status: ValidationStatus;
  validation_errors: string[];
  uploaded_at: string;
  validated_at?: string | null;
  expires_at?: string | null;
}
