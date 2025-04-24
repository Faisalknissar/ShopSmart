-- Add phone field to users table if it doesn't exist
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS phone TEXT;

-- Add user_type field to users table if it doesn't exist
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS user_type TEXT DEFAULT 'user';

-- Enable row level security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own data
DROP POLICY IF EXISTS "Users can view own data" ON public.users;
CREATE POLICY "Users can view own data" 
ON public.users 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create policy for users to update their own data
DROP POLICY IF EXISTS "Users can update own data" ON public.users;
CREATE POLICY "Users can update own data" 
ON public.users 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Add the table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.users;
