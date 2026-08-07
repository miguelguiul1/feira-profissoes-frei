-- Browser clients must not write PII tables directly. Writes now go through
-- validated, CSRF-protected server functions using the service-role secret.
REVOKE INSERT ON public.inscriptions FROM anon, authenticated;
REVOKE INSERT ON public.newsletter_subscribers FROM anon, authenticated;

DROP POLICY IF EXISTS "Anyone can submit an inscription" ON public.inscriptions;
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;
