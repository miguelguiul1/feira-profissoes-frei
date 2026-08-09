ALTER TABLE public.inscriptions
  ADD COLUMN IF NOT EXISTS credential_code uuid NOT NULL DEFAULT gen_random_uuid(),
  ADD COLUMN IF NOT EXISTS checked_in_at timestamptz;

CREATE UNIQUE INDEX IF NOT EXISTS inscriptions_credential_code_key ON public.inscriptions (credential_code);