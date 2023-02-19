import { TopLevelNavItem } from './TopLevelNavItem'
import clsx from 'clsx'
import { useContext } from 'react'
import { AuthContext } from './AuthProvider'

export default function TokenLink({ className, listClass }) {
  const user = useContext(AuthContext)

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
