import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Umbrella, Clock, ScrollText, Users } from 'lucide-react'
import { RainEffect } from '@/components/rain-effect'

const features = [
  {
    title: '우산 대여',
    description: '필요한 우산을 쉽게 대여하세요',
    icon: Umbrella,
    color: 'text-blue-500'
  },
  {
    title: '누구나 이용',
    description: '이노베이션 아카데미 소속 구성원이라면 누구나 이용 가능합니다.',
    icon: Users,
    color: 'text-green-500'
  },
  {
    title: '24시간 이용',
    description: '언제든지 이용 가능합니다',
    icon: Clock,
    color: 'text-purple-500'
  },
  {
    title: '이력 관리',
    description: '우산의 대출/반납 기록을 추적',
    icon: ScrollText,
    color: 'text-orange-500'
  }
]

const Home = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400 text-white overflow-hidden">
        <RainEffect />
        <div className="container mx-auto px-4 z-10">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              언제 어디서나<br />필요할 때 우산을
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto">
              비가 올 때 걱정하지 마세요. 공유우산으로 편리하게 이용하세요.
            </p>
            <div>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700"
              >
                지금 시작하기 <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 h-[200px]">
                  <CardHeader>
                    <feature.icon className={`h-12 w-12 ${feature.color}`} />
                    <CardTitle className="text-xl mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              이용 방법
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              간단한 3단계로 시작하세요
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: '위치 확인', desc: '가까운 대여소를 찾아보세요' },
              { step: '02', title: 'QR 스캔', desc: '우산의 QR 코드를 스캔하세요' },
              { step: '03', title: '이용하기', desc: '필요한 만큼 자유롭게 이용하세요' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-block">
                  <span className="text-5xl font-bold text-blue-500 opacity-30">
                    {item.step}
                  </span>
                  <h3 className="text-2xl font-bold mt-4 mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
export default Home
