import { Guides } from '@/components/Guides'
import { HeroPattern } from '@/components/HeroPattern'
import { Button } from '@/components/Button'
import { Resources } from '@/components/Resources'

export function getServerSideProps() {
  return {
    props: {
      sections: [
        { title: 'Guides', id: 'guides' },
        { title: 'Resources', id: 'resources' },
      ],
      description:
        'Learn everything there is to know about the Protocol API and integrate Protocol into your product.',
    },
  }
}

export default function Index() {
  return (
    <>
      <HeroPattern />
      <h1>API Documentation</h1>
      <p className="lead">
        Use the Protocol API to access contacts, conversations, group messages,
        and more and seamlessly integrate your product into the workflows of
        dozens of devoted Protocol users.
      </p>
      <div className="not-prose mb-16 mt-6 flex gap-3">
        <Button href="/quickstart" arrow="right">
          Get Started Now
        </Button>
      </div>
      <h2>Getting Started</h2>
      <p className="lead">
        To get started, create a new token using the &quot;Create Token&quot;
        button on the Tokens page. Remember to set the proper scopes for your
        token! You can read more about scopes <a href="/scopes">here</a>. Then
        visit the <a href="/authentication">Authentication</a> page for more in
        depth information about using your newly created API token.
      </p>
      <div className="not-prose">
        <Button href="/tokens" variant="text" arrow="right">
          Visit Tokens Page
        </Button>
      </div>
      <Guides />
      <Resources />
    </>
  )
}
