'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToast } from '@/components/ui/use-toast'
import { ImageIcon } from 'lucide-react'

interface EditProfileDialogProps {
  userProfile: {
    name: string
    email: string
    avatarUrl: string
  }
  onUpdate: (data: { name: string, email: string, avatarUrl: string, file?: File }) => void
}

const EditProfileDialog = ({ userProfile, onUpdate }: EditProfileDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    avatarUrl: userProfile.avatarUrl
  })
  const { toast } = useToast()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState(userProfile.avatarUrl)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast({
        title: '이미지 파일만 업로드 가능합니다.',
        variant: 'destructive'
      })
      return
    }

    setSelectedFile(file)
    const fileUrl = URL.createObjectURL(file)
    setPreviewUrl(fileUrl)
    setFormData(prev => ({ ...prev, avatarUrl: fileUrl }))
  }

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl !== userProfile.avatarUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl, userProfile.avatarUrl])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await onUpdate({ ...formData, file: selectedFile || undefined })
      setIsOpen(false)
      toast({
        title: '프로필이 업데이트되었습니다.',
        duration: 3000
      })
    } catch (error) {
      toast({
        title: '프로필 업데이트 실패',
        description: '다시 시도해주세요.',
        variant: 'destructive'
      })
      console.error(error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">프로필 수정</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>프로필 수정</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={previewUrl} />
              <AvatarFallback>{formData.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                id="avatar-upload"
                onChange={handleFileChange}
              />
              <Label
                htmlFor="avatar-upload"
                className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 cursor-pointer"
              >
                <ImageIcon className="w-4 h-4" />
                이미지 업로드
              </Label>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">닉네임</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              취소
            </Button>
            <Button type="submit">저장</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { EditProfileDialog }
