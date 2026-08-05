CREATE TABLE public.inscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  education_level TEXT NOT NULL,
  is_former_student BOOLEAN NOT NULL,
  course_interest TEXT NOT NULL,
  how_found_out TEXT,
  estimated_arrival TEXT
);

GRANT INSERT ON public.inscriptions TO anon;
GRANT SELECT, INSERT ON public.inscriptions TO authenticated;
GRANT ALL ON public.inscriptions TO service_role;

ALTER TABLE public.inscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an inscription"
  ON public.inscriptions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated staff can read inscriptions"
  ON public.inscriptions FOR SELECT
  TO authenticated
  USING (true);