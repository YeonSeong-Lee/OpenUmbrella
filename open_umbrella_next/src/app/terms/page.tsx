'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const TermsPage = () => {
  const router = useRouter()

  return (
    <div className="container mx-auto p-4 min-h-[calc(100vh-4rem)]">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">이용약관</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">제 1 조 (목적)</h2>
            <p className="text-sm text-muted-foreground">
              본 약관은 42서울의 공유우산 서비스(이하 &quot;서비스&quot;)의 이용조건 및 절차, 이용자와 서비스 제공자의 권리, 의무, 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">제 2 조 (서비스 이용)</h2>
            <p className="text-sm text-muted-foreground">
              1. 서비스는 이노베이션 아카데미 산하 소속(42서울, Codeysey) 인원에 한하여 이용할 수 있습니다.<br />
              2. 우산 대여 시 지정된 장소에서만 대여 및 반납이 가능합니다.<br />
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">제 3 조 (이용자의 의무)</h2>
            <p className="text-sm text-muted-foreground">
              1. 이용자는 우산을 소중히 다루어야 하며, 파손 또는 분실 시 책임을 져야 합니다.<br />
              2. 대여한 우산을 타인에게 양도할 수 없습니다.<br />
              3. 반납 시 우산은 건조된 상태로 반납해야 합니다.<br />
              4. 대여자는 최대한 빠른 시일 내에 우산을 반납해야 합니다.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">제 4 조 (제재 조치)</h2>
            <p className="text-sm text-muted-foreground">
              1. 우산 미반납 또는 파손 시 서비스 이용이 제한될 수 있습니다.<br />
              2. 고의적인 파손 또는 도난의 경우 법적 조치가 취해질 수 있습니다.<br />
              3. 반복적인 규칙 위반 시 서비스 이용이 영구적으로 제한될 수 있습니다.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">제 5 조 (면책조항)</h2>
            <p className="text-sm text-muted-foreground">
              서비스 제공자는 천재지변, 시스템 장애 등 불가항력적인 사유로 인한 서비스 중단에 대해 책임을 지지 않습니다.
            </p>
          </section>
        </CardContent>
      </Card>
      <div className="mt-4 flex justify-center">
        <Button 
          variant="outline"
          onClick={() => router.back()}
          className="w-full sm:w-auto"
        >
          뒤로 가기
        </Button>
      </div>
    </div>
  )
}

export default TermsPage
