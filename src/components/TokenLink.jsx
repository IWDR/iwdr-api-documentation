import { TopLevelNavItem } from './TopLevelNavItem'
import clsx from 'clsx'
import { useAuth } from '@/hooks/auth'

export default function TokenLink({ className, listClass }) {
  const { user } = useAuth()

  return (
    <TopLevelNavItem
      className={clsx(className, !user && 'hidden')}
      listClass={listClass}
      href="/tokens"
    >
      Tokens
    </TopLevelNavItem>
  )
}
