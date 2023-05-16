import clsx from 'clsx'

export function Prose({ as: Component = 'div', className, children, ...props }) {
  return (
    <Component
      className={clsx(className, 'prose dark:prose-invert')}
      {...props}
    >
        {children}
    </Component>
  )
}
