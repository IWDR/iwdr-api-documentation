import { TopLevelNavItem } from './TopLevelNavItem'
import clsx from 'clsx'
import { useAuth } from '@/hooks/auth'

export default function TokenLink({ className, listClass }) {
  const { user } = useAuth({ middleware: 'guest' })

  return (
    <TopLevelNavItem
      className={clsx(className, !Object.keys(user).length > 0 && 'hidden')}
      listClass={listClass}
      href="/tokens"
    >
      Tokens
    </TopLevelNavItem>
  )
}
