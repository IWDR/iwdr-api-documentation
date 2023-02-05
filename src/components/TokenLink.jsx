import { TopLevelNavItem } from './TopLevelNavItem'
import clsx from 'clsx'
import { useAuthStore } from '@/lib/stores/authStore'

export default function TokenLink({ className, listClass }) {
  const user = useAuthStore((state) => state.user)

  return (
    <TopLevelNavItem
      className={clsx(className, user === null && 'hidden')}
      listClass={listClass}
      href="/tokens"
    >
      Tokens
    </TopLevelNavItem>
  )
}
