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
INSERT INTO "Product" (id, name, price, description, category, image, images, rating, featured, "inStock") VALUES
('1', 'Sweet Lime', 24.99, 'Fresh, juicy sweet limes perfect for export', 'citrus', 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400&h=400&fit=crop&crop=center', ARRAY['https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=500&h=500&fit=crop&crop=center', 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=500&h=500&fit=crop&crop=faces', 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=500&h=500&fit=crop&crop=entropy'], 4.8, true, true),
('2', 'Premium Oranges', 19.99, 'Hand-picked Valencia oranges with exceptional sweetness', 'citrus', 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop&crop=center', ARRAY['https://images.unsplash.com/photo-1547514701-42782101795e?w=500&h=500&fit=crop&crop=center', 'https://images.unsplash.com/photo-1547514701-42782101795e?w=500&h=500&fit=crop&crop=faces', 'https://images.unsplash.com/photo-1547514701-42782101795e?w=500&h=500&fit=crop&crop=entropy'], 4.9, true, true),
('3', 'Tropical Mangoes', 34.99, 'Alphonso mangoes - the king of fruits', 'tropical', 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop&crop=center', ARRAY['https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=500&fit=crop&crop=center', 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=500&fit=crop&crop=faces', 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=500&fit=crop&crop=entropy'], 4.7, false, true),
('4', 'Fresh Pineapples', 29.99, 'Golden ripe pineapples with natural sweetness', 'tropical', 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=400&fit=crop&crop=center', ARRAY['https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&h=500&fit=crop&crop=center', 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&h=500&fit=crop&crop=faces', 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&h=500&fit=crop&crop=entropy'], 4.6, false, true),
('5', 'Seasonal Apples', 22.99, 'Crisp and fresh seasonal apples', 'seasonal', 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop&crop=center', ARRAY['https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&h=500&fit=crop&crop=center', 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&h=500&fit=crop&crop=faces', 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&h=500&fit=crop&crop=entropy'], 4.5, false, false),
('6', 'Dragon Fruit', 39.99, 'Exotic dragon fruit with unique flavor', 'tropical', 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=400&h=400&fit=crop&crop=center', ARRAY['https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=500&h=500&fit=crop&crop=center', 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=500&h=500&fit=crop&crop=faces', 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=500&h=500&fit=crop&crop=entropy'], 4.8, true, true)
ON CONFLICT (id) DO NOTHING;
