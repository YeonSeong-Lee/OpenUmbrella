import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 테스트 우산 생성
  const umbrella1 = await prisma.umbrella.create({
    data: {
      number: '001',
      status: 'AVAILABLE',
      location: '도서관'
    }
  })

  console.log('Created test umbrella:', umbrella1)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 