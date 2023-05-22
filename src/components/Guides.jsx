import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'

const guides = [
  {
    href: '/quickstart',
    name: 'Quickstart',
    description: 'A quick intro for understanding who this API is designed for, and how to utilize it best.'
  },
  {
    href: '/mapping',
    name: 'Mapping',
    description:
      'Learn how to accurately describe data mappings used by the IWDR API to ensure data integrity.',
  },
  {
    href: '/authentication',
    name: 'Authentication',
    description: 'Learn how to authenticate your IWDR API requests.',
  },
  {
    href: '/errors',
    name: 'Errors',
    description:
      'Read about the different types of errors returned by the IWDR API, and how to accurately handle them in a production environment.',
  },
]

export function Guides() {
  return (
    <div className="my-16">
      <Heading level={2} id="guides">
        Guides
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-4">
        {guides.map((guide) => (
          <div key={guide.href}>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
              {guide.name}
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {guide.description}
            </p>
            <p className="mt-4">
              <Button href={guide.href} variant="text" arrow="right">
                Read more
              </Button>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
