-- Writes now happen exclusively through server functions using the service role.
DROP POLICY IF EXISTS "Anyone can submit an inscription" ON public.inscriptions;
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;

REVOKE ALL ON public.inscriptions FROM anon;
REVOKE ALL ON public.newsletter_subscribers FROM anon;

GRANT SELECT ON public.inscriptions TO authenticated;
GRANT SELECT ON public.newsletter_subscribers TO authenticated;
GRANT ALL ON public.inscriptions TO service_role;
GRANT ALL ON public.newsletter_subscribers TO service_role;