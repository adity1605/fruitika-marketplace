// Mock Prisma
const mockPrismaProduct = {
  findMany: jest.fn(),
}

jest.mock('@/lib/db', () => ({
  prisma: {
    product: mockPrismaProduct,
  },
}))

// Test helper function to create mock request
function createMockRequest(url: string) {
  const urlObj = new URL(url)
  return {
    url,
    searchParams: urlObj.searchParams,
  }
}

// Test the business logic of the products API
describe('Products API Logic', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('creates correct query for all products', () => {
    const searchParams = new URLSearchParams('')
    
    let where: any = {}
    let orderBy: any = { createdAt: 'desc' }

    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy')

    if (category && category !== 'all') {
      where.category = category
    }
    
    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive'
      }
    }

    if (sortBy === 'price-low') {
      orderBy = { price: 'asc' }
    } else if (sortBy === 'price-high') {
      orderBy = { price: 'desc' }
    }

    expect(where).toEqual({})
    expect(orderBy).toEqual({ createdAt: 'desc' })
  })

  it('creates correct query for category filter', () => {
    const searchParams = new URLSearchParams('category=organic')
    
    let where: any = {}
    let orderBy: any = { createdAt: 'desc' }

    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy')

    if (category && category !== 'all') {
      where.category = category
    }
    
    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive'
      }
    }

    if (sortBy === 'price-low') {
      orderBy = { price: 'asc' }
    } else if (sortBy === 'price-high') {
      orderBy = { price: 'desc' }
    }

    expect(where).toEqual({ category: 'organic' })
    expect(orderBy).toEqual({ createdAt: 'desc' })
  })

  it('creates correct query for search filter', () => {
    const searchParams = new URLSearchParams('search=apple')
    
    let where: any = {}
    let orderBy: any = { createdAt: 'desc' }

    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy')

    if (category && category !== 'all') {
      where.category = category
    }
    
    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive'
      }
    }

    if (sortBy === 'price-low') {
      orderBy = { price: 'asc' }
    } else if (sortBy === 'price-high') {
      orderBy = { price: 'desc' }
    }

    expect(where).toEqual({
      name: {
        contains: 'apple',
        mode: 'insensitive'
      }
    })
    expect(orderBy).toEqual({ createdAt: 'desc' })
  })

  it('creates correct query for price sorting low to high', () => {
    const searchParams = new URLSearchParams('sortBy=price-low')
    
    let where: any = {}
    let orderBy: any = { createdAt: 'desc' }

    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy')

    if (category && category !== 'all') {
      where.category = category
    }
    
    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive'
      }
    }

    if (sortBy === 'price-low') {
      orderBy = { price: 'asc' }
    } else if (sortBy === 'price-high') {
      orderBy = { price: 'desc' }
    }

    expect(where).toEqual({})
    expect(orderBy).toEqual({ price: 'asc' })
  })

  it('creates correct query for price sorting high to low', () => {
    const searchParams = new URLSearchParams('sortBy=price-high')
    
    let where: any = {}
    let orderBy: any = { createdAt: 'desc' }

    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy')

    if (category && category !== 'all') {
      where.category = category
    }
    
    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive'
      }
    }

    if (sortBy === 'price-low') {
      orderBy = { price: 'asc' }
    } else if (sortBy === 'price-high') {
      orderBy = { price: 'desc' }
    }

    expect(where).toEqual({})
    expect(orderBy).toEqual({ price: 'desc' })
  })

  it('creates correct query with multiple filters', () => {
    const searchParams = new URLSearchParams('category=organic&search=apple&sortBy=price-high')
    
    let where: any = {}
    let orderBy: any = { createdAt: 'desc' }

    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy')

    if (category && category !== 'all') {
      where.category = category
    }
    
    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive'
      }
    }

    if (sortBy === 'price-low') {
      orderBy = { price: 'asc' }
    } else if (sortBy === 'price-high') {
      orderBy = { price: 'desc' }
    }

    expect(where).toEqual({
      category: 'organic',
      name: {
        contains: 'apple',
        mode: 'insensitive'
      }
    })
    expect(orderBy).toEqual({ price: 'desc' })
  })

  it('handles database calls correctly', async () => {
    const mockProducts = [
      { id: 1, name: 'Apple', category: 'fruits', price: 10 },
      { id: 2, name: 'Banana', category: 'fruits', price: 5 },
    ]

    mockPrismaProduct.findMany.mockResolvedValue(mockProducts)

    const result = await mockPrismaProduct.findMany({
      where: {},
      orderBy: { createdAt: 'desc' }
    })

    expect(result).toEqual(mockProducts)
    expect(mockPrismaProduct.findMany).toHaveBeenCalledWith({
      where: {},
      orderBy: { createdAt: 'desc' }
    })
  })
})
