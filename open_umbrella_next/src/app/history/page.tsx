'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'

// 임시 타입 정의
type HistoryItem = {
  id: string
  umbrellaId: string
  action: 'borrow' | 'return'
  timestamp: string
  location: string
  userId: string
}

// 임시 데이터
const mockHistory: HistoryItem[] = [
  {
    id: '1',
    umbrellaId: '0001',
    action: 'borrow',
    timestamp: '2024-03-15T10:30:00',
    location: '도서관',
    userId: 'user123'
  },
  {
    id: '2',
    umbrellaId: '0001',
    action: 'return',
    timestamp: '2024-03-15T17:30:00',
    location: '학생회관',
    userId: 'user123'
  },
  // ... 더 많은 mock 데이터 추가 가능
]

function HistoryItem({ item }: { item: HistoryItem }) {
  const formattedDate = new Date(item.timestamp).toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold">우산 #{item.umbrellaId}</p>
            <p className="text-sm text-muted-foreground">{formattedDate}</p>
          </div>
          <div className="text-right">
            <span className={`inline-block px-2 py-1 rounded-full text-sm ${
              item.action === 'borrow' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {item.action === 'borrow' ? '대출' : '반납'}
            </span>
            <p className="text-sm text-muted-foreground mt-1">{item.location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function HistoryPage() {
  const [searchUmbrellaId, setSearchUmbrellaId] = useState('')
  const filteredHistory = mockHistory.filter(item => 
    searchUmbrellaId ? item.umbrellaId === searchUmbrellaId : true
  )

  return (
    <div className="min-h-screen p-4 md:p-8 container max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">대출/반납 이력</h1>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">전체 이력</TabsTrigger>
          <TabsTrigger value="by-umbrella">우산별 이력</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>실시간 대출/반납 이력</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                {mockHistory.map(item => (
                  <HistoryItem key={item.id} item={item} />
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-umbrella">
          <Card>
            <CardHeader>
              <CardTitle>우산별 이력 조회</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="umbrella-search">우산 번호</Label>
                <Input
                  id="umbrella-search"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="우산 번호를 입력하세요"
                  value={searchUmbrellaId}
                  onChange={(e) => setSearchUmbrellaId(e.target.value)}
                  maxLength={4}
                />
              </div>
              
              <ScrollArea className="h-[500px] pr-4">
                {filteredHistory.length > 0 ? (
                  filteredHistory.map(item => (
                    <HistoryItem key={item.id} item={item} />
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    {searchUmbrellaId 
                      ? '해당 우산의 이력이 없습니다.' 
                      : '우산 번호를 입력해주세요.'}
                  </p>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default HistoryPage