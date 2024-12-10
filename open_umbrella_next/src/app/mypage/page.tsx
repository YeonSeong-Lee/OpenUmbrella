'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { CalendarDays, Settings, Umbrella, LogOut } from 'lucide-react'
import { EditProfileDialog } from '@/components/profile/edit-profile-dialog'

function MyPage() {
  const [userProfile, setUserProfile] = useState({
    name: '홍길동',
    email: 'hong@example.com',
    avatarUrl: '/avatars/default.png',
    joinDate: '2024년 1월'
  })

  const handleProfileUpdate = async (data: { name: string, email: string, avatarUrl: string }) => {
    // TODO: API 호출로 변경
    setUserProfile(prev => ({
      ...prev,
      ...data
    }))
  }

  const handleLogout = async () => {
    try {
      // TODO: 실제 로그아웃 API 호출
      window.location.href = '/auth'
    } catch (error) {
      console.error('로그아웃 중 오류가 발생했습니다:', error)
    }
  }

  // 우산 대여 기록 데이터 추가
  const umbrellaHistory = [
    {
      id: 1,
      location: '서울역 보관함',
      borrowedAt: '2024-03-15 14:30',
      returnedAt: '2024-03-15 18:45',
      status: '반납완료'
    },
    {
      id: 2,
      location: '강남역 보관함',
      borrowedAt: '2024-03-10 09:15',
      returnedAt: '2024-03-10 17:20',
      status: '반납완료'
    }
  ]

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">마이 페이지</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Button 
            variant="destructive" 
            size="icon" 
            onClick={handleLogout}
            title="로그아웃"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
                <AvatarFallback>{userProfile.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{userProfile.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{userProfile.email}</p>
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  가입일: {userProfile.joinDate}
                </div>
              </div>
            </div>
            <EditProfileDialog
              userProfile={userProfile}
              onUpdate={handleProfileUpdate}
            />
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Umbrella className="h-5 w-5" />
              우산 대여 기록
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {umbrellaHistory.map((record) => (
                <div
                  key={record.id}
                  className="flex flex-col space-y-2 p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{record.location}</span>
                    <span className="text-sm text-muted-foreground">{record.status}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div>대여: {record.borrowedAt}</div>
                    <div>반납: {record.returnedAt}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default MyPage