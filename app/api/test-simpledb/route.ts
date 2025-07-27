import { NextResponse } from 'next/server'
import { simpleDB } from '@/lib/simpleDB'

export async function GET() {
  try {
    console.log('Testing simpleDB availability...')
    
    // Test if simpleDB exists
    if (!simpleDB) {
      return NextResponse.json({ 
        error: 'simpleDB is undefined',
        type: typeof simpleDB
      }, { status: 500 })
    }
    
    console.log('simpleDB exists, type:', typeof simpleDB)
    console.log('simpleDB keys:', Object.keys(simpleDB))
    
    // Test if quotes exists
    if (!simpleDB.quotes) {
      return NextResponse.json({ 
        error: 'simpleDB.quotes is undefined',
        simpleDBKeys: Object.keys(simpleDB),
        quotesType: typeof simpleDB.quotes
      }, { status: 500 })
    }
    
    console.log('simpleDB.quotes exists, type:', typeof simpleDB.quotes)
    console.log('simpleDB.quotes keys:', Object.keys(simpleDB.quotes))
    
    // Test if create function exists
    if (typeof simpleDB.quotes.create !== 'function') {
      return NextResponse.json({ 
        error: 'simpleDB.quotes.create is not a function',
        quotesKeys: Object.keys(simpleDB.quotes),
        createType: typeof simpleDB.quotes.create
      }, { status: 500 })
    }
    
    console.log('simpleDB.quotes.create exists, type:', typeof simpleDB.quotes.create)
    
    // Try to get all quotes
    const allQuotes = simpleDB.quotes.getAll()
    console.log('All quotes retrieved successfully, count:', allQuotes.length)
    
    return NextResponse.json({ 
      success: true,
      message: 'simpleDB is working correctly',
      quotesCount: allQuotes.length,
      simpleDBKeys: Object.keys(simpleDB),
      quotesKeys: Object.keys(simpleDB.quotes)
    })
    
  } catch (error) {
    console.error('Error testing simpleDB:', error)
    return NextResponse.json({
      error: 'Failed to test simpleDB',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack'
    }, { status: 500 })
  }
}
