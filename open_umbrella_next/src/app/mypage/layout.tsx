'use client'

import { Toaster } from '@/components/ui/toaster'

const MyPageLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}

export default MyPageLayout