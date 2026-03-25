import { ClientLayout } from '@/components/layout/ClientLayout'

export const dynamic = 'force-dynamic'

export default function ClientGroupLayout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>
}
