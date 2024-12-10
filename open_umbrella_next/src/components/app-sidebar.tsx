'use client'

import { Home, Share, History, Users, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'

const navigationItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/share', icon: Share, label: 'Share' },
  { href: '/history', icon: History, label: 'History' },
  { href: '/contributor', icon: Users, label: 'Contributors' },
  { href: '/mypage', icon: User, label: 'My Page' }
]

const AppSidebar = () => {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-border bg-background/60 backdrop-blur-xl">
      <SidebarHeader className="border-b border-border/50 px-6 py-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-xl font-bold text-transparent">
            OpenUmbrella
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-sm font-medium text-muted-foreground">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map(({ href, icon: Icon, label }) => {
                const isActive = pathname === href
                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={href}
                        className={`group flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                          isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        <Icon className={`h-5 w-5 transition-colors ${
                          isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-accent-foreground'
                        }`} />
                        <span>{label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border/50 p-4">
        {/* Add footer content if needed */}
      </SidebarFooter>
    </Sidebar>
  )
}

export { AppSidebar }
