-- Supabase Setup SQL
-- Run this in your Supabase SQL Editor

-- Create User table
CREATE TABLE IF NOT EXISTS "User" (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    password TEXT,
    role TEXT DEFAULT 'user',
    image TEXT,
    "emailVerified" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Create Account table (for OAuth)
CREATE TABLE IF NOT EXISTS "Account" (
    id TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL,
    type TEXT NOT NULL,
    provider TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at INTEGER,
    token_type TEXT,
    scope TEXT,
    id_token TEXT,
    session_state TEXT,
    FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE,
    UNIQUE(provider, "providerAccountId")
);

-- Create Session table (for NextAuth)
CREATE TABLE IF NOT EXISTS "Session" (
    id TEXT PRIMARY KEY,
    "sessionToken" TEXT UNIQUE NOT NULL,
    "userId" TEXT NOT NULL,
    expires TIMESTAMP NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

-- Create VerificationToken table (for NextAuth)
CREATE TABLE IF NOT EXISTS "VerificationToken" (
    identifier TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires TIMESTAMP NOT NULL,
    PRIMARY KEY (identifier, token)
);

-- Create Product table
CREATE TABLE IF NOT EXISTS "Product" (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    category TEXT,
    image TEXT,
    images TEXT[],
    rating DECIMAL(3,2),
    featured BOOLEAN DEFAULT FALSE,
    "inStock" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Create Order table
CREATE TABLE IF NOT EXISTS "Order" (
    id TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'pending',
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

-- Create OrderItem table
CREATE TABLE IF NOT EXISTS "OrderItem" (
    id TEXT PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY ("orderId") REFERENCES "Order"(id) ON DELETE CASCADE,
    FOREIGN KEY ("productId") REFERENCES "Product"(id) ON DELETE CASCADE
);

-- Create CartItem table
CREATE TABLE IF NOT EXISTS "CartItem" (
    id TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE,
    FOREIGN KEY ("productId") REFERENCES "Product"(id) ON DELETE CASCADE
);

-- Insert sample products
INSERT INTO "Product" (id, name, price, description, category, image, rating, featured, "inStock") VALUES
('1', 'Fresh Apples', 4.99, 'Crisp and juicy red apples, perfect for snacking or baking.', 'fruits', '/placeholder.jpg', 4.5, true, true),
('2', 'Organic Bananas', 2.99, 'Sweet organic bananas, rich in potassium and perfect for smoothies.', 'fruits', '/placeholder.jpg', 4.2, true, true),
('3', 'Fresh Carrots', 3.49, 'Crunchy orange carrots, great for cooking or raw snacking.', 'vegetables', '/placeholder.jpg', 4.3, false, true),
('4', 'Spinach Leaves', 5.99, 'Fresh green spinach leaves, packed with iron and vitamins.', 'vegetables', '/placeholder.jpg', 4.1, false, true),
('5', 'Orange Juice', 6.99, 'Freshly squeezed orange juice, 100% natural with no added sugar.', 'beverages', '/images/hero-oranges.avif', 4.6, true, true),
('6', 'Mixed Berries', 8.99, 'Fresh mixed berries including strawberries, blueberries, and raspberries.', 'fruits', '/placeholder.jpg', 4.8, true, true)
ON CONFLICT (id) DO NOTHING;
