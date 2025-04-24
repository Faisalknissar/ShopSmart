-- Add user_type column to users table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'user_type') THEN
        ALTER TABLE users ADD COLUMN user_type VARCHAR(20) DEFAULT 'user' NOT NULL;
        
        -- Create an index on the user_type column for faster queries
        CREATE INDEX idx_users_user_type ON users(user_type);
    END IF;
END $$;
