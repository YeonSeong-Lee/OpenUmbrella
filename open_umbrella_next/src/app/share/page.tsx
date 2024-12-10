'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const SharePage = () => {
  const [umbrellaId, setUmbrellaId] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // 숫자만 허용
    if (value === '' || /^\d+$/.test(value)) {
      setUmbrellaId(value)
    }
  }

  const handleBorrow = () => {
    if (!umbrellaId) return
    // TODO: Implement borrowing logic
    console.log('Borrowing umbrella:', umbrellaId)
  }

  const handleReturn = () => {
    if (!umbrellaId) return
    // TODO: Implement returning logic
    console.log('Returning umbrella:', umbrellaId)
  }

  return (
    <div className="min-h-screen p-4 md:p-8 container max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">우산 대출/반납</h1>
      
      <Tabs defaultValue="borrow" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="borrow">대출하기</TabsTrigger>
          <TabsTrigger value="return">반납하기</TabsTrigger>
        </TabsList>

        <TabsContent value="borrow">
          <Card>
            <CardHeader>
              <CardTitle>우산 대출</CardTitle>
              <CardDescription>
                대출할 우산의 번호를 입력해주세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="umbrella-id">우산 번호</Label>
                <Input
                  id="umbrella-id"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="우산 번호를 입력하세요"
                  value={umbrellaId}
                  onChange={handleInputChange}
                  maxLength={4}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={handleBorrow}
                disabled={!umbrellaId}
              >
                대출하기
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="return">
          <Card>
            <CardHeader>
              <CardTitle>우산 반납</CardTitle>
              <CardDescription>
                반납할 우산의 번호를 입력하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="return-umbrella-id">우산 번호</Label>
                <Input
                  id="return-umbrella-id"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="우산 번호를 입력하세요"
                  value={umbrellaId}
                  onChange={handleInputChange}
                  maxLength={4}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={handleReturn}
                disabled={!umbrellaId}
              >
                반납하기
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Current Borrowing Status */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>현재 대출 상태</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">현재 대출한 우산이 없습니다.</p>
        </CardContent>
      </Card>
    </div>
  )
} 

export default SharePage