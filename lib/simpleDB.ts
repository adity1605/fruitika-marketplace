// Simple in-memory database for stable operation
// This replaces complex Prisma/database setup that was causing issues

interface User {
  id: string
  email: string
  name: string
  password?: string
  role: string
  createdAt: string
}

interface Product {
  id: string
  name: string
  price: number
  description: string
  category: string
  image: string
  rating: number
  featured: boolean
  inStock: boolean
}

interface Order {
  id: string
  userId: string
  total: number
  subtotal: number
  shipping: number
  status: string
  items: any[]
  customerInfo: any
  createdAt: string
  paymentId?: string
}

interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  createdAt: string
}

interface Quote {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  product: string
  quantity: string
  deliveryLocation: string
  message?: string
  status: string
  createdAt: string
}

interface Career {
  id: string
  name: string
  email: string
  phone?: string
  position: string
  experience: string
  location?: string
  coverLetter?: string
  resumeUrl?: string
  status: string
  createdAt: string
}

// In-memory storage
let users: User[] = [
  {
    id: "1",
    email: "test@fruitika.com",
    name: "Test User",
    password: "password123", // In production, this would be hashed
    role: "user",
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    email: "admin@fruitika.com", 
    name: "Admin User",
    password: "admin123",
    role: "admin",
    createdAt: new Date().toISOString()
  }
]

let products: Product[] = [
  {
    id: "1",
    name: "Sweet Lime",
    price: 24.99,
    description: "Fresh sweet lime with perfect balance of sweet and tangy flavors",
    category: "citrus",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop&crop=center",
    rating: 4.5,
    featured: true,
    inStock: true
  },
  {
    id: "2", 
    name: "Premium Oranges",
    price: 19.99,
    description: "Juicy premium oranges packed with vitamin C and natural sweetness",
    category: "citrus",
    image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=300&h=300&fit=crop&crop=center",
    rating: 4.7,
    featured: true,
    inStock: true
  },
  {
    id: "3",
    name: "Tropical Mangoes", 
    price: 34.99,
    description: "Exotic tropical mangoes with rich, creamy texture and sweet flavor",
    category: "tropical",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=300&h=300&fit=crop&crop=center",
    rating: 4.8,
    featured: true,
    inStock: true
  },
  {
    id: "4",
    name: "Fresh Pineapples",
    price: 29.99, 
    description: "Sweet and tangy pineapples perfect for tropical fruit salads",
    category: "tropical",
    image: "https://images.unsplash.com/photo-1576068192509-dd5c2f99de7b?w=300&h=300&fit=crop&crop=center",
    rating: 4.6,
    featured: false,
    inStock: true
  },
  {
    id: "5",
    name: "Seasonal Apples",
    price: 22.99,
    description: "Crispy seasonal apples with perfect sweetness and crunch",
    category: "stone",
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=300&h=300&fit=crop&crop=center", 
    rating: 4.4,
    featured: false,
    inStock: true
  },
  {
    id: "6",
    name: "Dragon Fruit",
    price: 39.99,
    description: "Exotic dragon fruit with unique appearance and mild, sweet flavor",
    category: "tropical",
    image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=300&h=300&fit=crop&crop=center",
    rating: 4.3,
    featured: false,
    inStock: true
  }
]

let orders: Order[] = []
let contacts: Contact[] = []
let quotes: Quote[] = []
let careers: Career[] = []

// Database functions
export const simpleDB = {
  // Users
  users: {
    findByEmail: (email: string) => users.find(u => u.email === email),
    findById: (id: string) => users.find(u => u.id === id),
    create: (userData: Omit<User, 'id' | 'createdAt'>) => {
      const newUser: User = {
        ...userData,
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString()
      }
      users.push(newUser)
      return newUser
    },
    getAll: () => users
  },

  // Products  
  products: {
    getAll: () => products,
    findById: (id: string) => products.find(p => p.id === id),
    getFeatured: () => products.filter(p => p.featured),
    getByCategory: (category: string) => products.filter(p => p.category === category),
    search: (term: string) => products.filter(p => 
      p.name.toLowerCase().includes(term.toLowerCase()) ||
      p.description.toLowerCase().includes(term.toLowerCase())
    )
  },

  // Orders
  orders: {
    create: (orderData: Omit<Order, 'id' | 'createdAt'>) => {
      const newOrder: Order = {
        ...orderData,
        id: `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString()
      }
      orders.push(newOrder)
      return newOrder
    },
    findById: (id: string) => orders.find(o => o.id === id),
    getByUserId: (userId: string) => orders.filter(o => o.userId === userId),
    getAll: () => orders
  },

  // Contacts
  contacts: {
    create: (contactData: Omit<Contact, 'id' | 'createdAt'>) => {
      const newContact: Contact = {
        ...contactData,
        id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString()
      }
      contacts.push(newContact)
      return newContact
    },
    getAll: () => contacts,
    findById: (id: string) => contacts.find(c => c.id === id)
  },

  // Quotes
  quotes: {
    create: (quoteData: Omit<Quote, 'id' | 'createdAt' | 'status'>) => {
      const newQuote: Quote = {
        ...quoteData,
        id: `quote_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
      quotes.push(newQuote)
      return newQuote
    },
    getAll: () => quotes,
    findById: (id: string) => quotes.find(q => q.id === id)
  },

  // Careers
  careers: {
    create: (careerData: Omit<Career, 'id' | 'createdAt' | 'status'>) => {
      const newCareer: Career = {
        ...careerData,
        id: `career_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
      careers.push(newCareer)
      return newCareer
    },
    getAll: () => careers,
    findById: (id: string) => careers.find(c => c.id === id)
  }
}
