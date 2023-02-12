import { TopLevelNavItem } from './TopLevelNavItem'
import clsx from 'clsx'

export default function TokenLink({ className, listClass, user }) {
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
