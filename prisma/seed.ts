import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('FruiTika@2024!Admin', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@fruitika.com' },
    update: {},
    create: {
      email: 'admin@fruitika.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin'
    }
  })

  // Create products
  const products = [
    {
      name: "Sweet Lime",
      category: "citrus",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400&h=400&fit=crop&crop=center",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=500&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=500&h=500&fit=crop&crop=faces",
        "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=500&h=500&fit=crop&crop=entropy"
      ]),
      description: "Fresh, juicy sweet limes perfect for export",
      rating: 4.8,
      inStock: true,
      featured: true,
    },
    {
      name: "Premium Oranges",
      category: "citrus",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop&crop=center",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1547514701-42782101795e?w=500&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1547514701-42782101795e?w=500&h=500&fit=crop&crop=faces",
        "https://images.unsplash.com/photo-1547514701-42782101795e?w=500&h=500&fit=crop&crop=entropy"
      ]),
      description: "Hand-picked Valencia oranges with exceptional sweetness",
      rating: 4.9,
      inStock: true,
      featured: true,
    },
    {
      name: "Tropical Mangoes",
      category: "tropical",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop&crop=center",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=500&fit=crop&crop=faces",
        "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=500&fit=crop&crop=entropy"
      ]),
      description: "Alphonso mangoes - the king of fruits",
      rating: 4.7,
      inStock: true,
      featured: false,
    },
    {
      name: "Fresh Pineapples",
      category: "tropical",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=400&fit=crop&crop=center",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&h=500&fit=crop&crop=faces",
        "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&h=500&fit=crop&crop=entropy"
      ]),
      description: "Golden ripe pineapples with natural sweetness",
      rating: 4.6,
      inStock: true,
      featured: false,
    },
    {
      name: "Seasonal Apples",
      category: "seasonal",
      price: 22.99,
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop&crop=center",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&h=500&fit=crop&crop=faces",
        "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&h=500&fit=crop&crop=entropy"
      ]),
      description: "Crisp and fresh seasonal apples",
      rating: 4.5,
      inStock: false,
      featured: false,
    },
    {
      name: "Dragon Fruit",
      category: "tropical",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=400&h=400&fit=crop&crop=center",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=500&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=500&h=500&fit=crop&crop=faces",
        "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=500&h=500&fit=crop&crop=entropy"
      ]),
      description: "Exotic dragon fruit with unique flavor",
      rating: 4.8,
      inStock: true,
      featured: true,
    },
  ]

  // Clear existing products first
  await prisma.product.deleteMany({})
  
  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }

  console.log('Database seeded successfully!')
  console.log('\n🔐 IMPORTANT SECURITY NOTICE:')
  console.log('Admin Login: admin@fruitika.com')
  console.log('Admin Password: FruiTika@2024!Admin')
  console.log('\n⚠️  CHANGE THIS PASSWORD IN PRODUCTION!')
  console.log('⚠️  UPDATE EMAIL CREDENTIALS IN .env FILE!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })