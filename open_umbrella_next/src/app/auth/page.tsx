'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

const AuthPage = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
  const [is42Loading, setIs42Loading] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const error = searchParams.get('error')

  // 에러 메시지 표시
  if (error) {
    toast({
      title: '로그인 오류',
      description: '로그인 중 문제가 발생했습니다. 다시 시도해주세요.',
      variant: 'destructive',
    })
  }

  const handleGoogleAuth = async () => {
    setIsGoogleLoading(true)
    try {
      const result = await signIn('google', {
        callbackUrl,
        redirect: true,
      })
      
      if (result?.error) {
        toast({
          title: '로그인 실패',
          description: 'Google 로그인 중 오류가 발생했습니다.',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Google 인증 중 오류가 발생했습니다:', error)
      toast({
        title: '로그인 실패',
        description: '알 수 없는 오류가 발생했습니다.',
        variant: 'destructive',
      })
    } finally {
      setIsGoogleLoading(false)
    }
  }

  const handle42Auth = async () => {
    setIs42Loading(true)
    try {
      await signIn('42-school', { callbackUrl })
    } catch (error) {
      console.error('42 인증 중 오류가 발생했습니다:', error)
    } finally {
      setIs42Loading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">공유우산 시작하기</CardTitle>
          <CardDescription className="text-center">
            42서울의 공유우산 서비스를 이용하기 위해 로그인해주세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={handleGoogleAuth}
              disabled={isGoogleLoading || is42Loading}
              className="w-full h-11"
            >
              {isGoogleLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary" />
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Image src="/google-logo.svg" alt="Google" width={20} height={20} />
                  <span>Google로 계속하기</span>
                </div>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={handle42Auth}
              disabled={isGoogleLoading || is42Loading}
              className="w-full h-11"
            >
              {is42Loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary" />
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Image src="/42-logo.svg" alt="42" width={20} height={20} />
                  <span>42 Intra로 계속하기</span>
                </div>
              )}
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <a href="/terms" className="text-primary hover:underline">
              이용약관
            </a>
            에 동의하는 것으로 간주됩니다
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthPage