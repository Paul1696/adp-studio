import { AppSidebar } from '@/components/layout/app-sidebar'
import { AppHeader } from '@/components/layout/app-header'
import { PageTransition } from '@/components/layout/page-transition'
import { ToastProvider } from '@/components/ui/toast'
import { syncUser } from '@/lib/sync-user'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  await syncUser()
  return (
    <ToastProvider>
      <div className="flex h-screen overflow-hidden bg-adp-surface">
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AppHeader />
          <main className="flex-1 overflow-y-auto scrollbar-thin">
            <PageTransition>{children}</PageTransition>
          </main>
        </div>
      </div>
    </ToastProvider>
  )
}
