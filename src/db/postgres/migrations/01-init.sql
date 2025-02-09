CREATE TABLE IF NOT EXISTS users (
    ID UUID PRIMARY KEY,
    fist_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

--create types
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'transaction_type') THEN
        CREATE TYPE transaction_type AS ENUM ('EARNING', 'EXPENSE', 'INVESTMENT');
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS transactions (
    ID UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(100),
    date DATE,
    amount NUMERIC(10,2),
    type transaction_type NOT NULL
);