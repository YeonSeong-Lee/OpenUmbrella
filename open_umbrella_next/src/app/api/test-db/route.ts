import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const umbrellaCount = await prisma.umbrella.count()
    return NextResponse.json({ 
      count: umbrellaCount,
      environment: process.env.NODE_ENV 
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to connect to database',
        environment: process.env.NODE_ENV 
      },
      { status: 500 }
    )
  }
} 