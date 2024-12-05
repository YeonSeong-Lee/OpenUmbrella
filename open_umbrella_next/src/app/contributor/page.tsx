import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

y
    name: '홍길동',
    role: '프론트엔드 개발자',
    github: 'honggildong',
    avatar: 'https://github.com/honggildong.png'
  },
  // ... 더 많은 기여자
]

export default function ContributorPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-8">기여자 목록</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contributors.map((contributor) => (
          <Card key={contributor.github} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={contributor.avatar} alt={contributor.name} />
                <AvatarFallback>{contributor.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">{contributor.name}</h2>
                <p className="text-sm text-muted-foreground">{contributor.role}</p>
              </div>
            </CardHeader>
            <CardContent>
              <a 
                href={`https://github.com/${contributor.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline"
              >
                @{contributor.github}
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 