-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for admin access
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS policy for user_roles - users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

-- Create gallery_images table
CREATE TABLE public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on gallery_images
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Everyone can view gallery images
CREATE POLICY "Anyone can view gallery images"
ON public.gallery_images FOR SELECT
USING (true);

-- Only admins can insert gallery images
CREATE POLICY "Admins can insert gallery images"
ON public.gallery_images FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete gallery images
CREATE POLICY "Admins can delete gallery images"
ON public.gallery_images FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);

-- Storage policies for gallery bucket
CREATE POLICY "Anyone can view gallery images"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery');

CREATE POLICY "Admins can upload gallery images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete gallery images"
ON storage.objects FOR DELETE
USING (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));

-- Function to clean up gallery images (called weekly)
CREATE OR REPLACE FUNCTION public.cleanup_gallery_images()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Delete all gallery images from storage
  DELETE FROM storage.objects WHERE bucket_id = 'gallery';
  -- Delete all records from gallery_images table
  DELETE FROM public.gallery_images;
END;
$$;