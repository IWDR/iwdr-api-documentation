import { Guides } from '@/components/Guides';
import { HeroPattern } from '@/components/HeroPattern';
import { Resources } from '@/components/Resources';
import { Note } from '@/components/mdx';

export async function getServerSideProps() {
    const props = {
        sections: [
            { title: 'Guides', id: 'guides' },
            { title: 'Resources', id: 'resources' },
        ],
        description:
            'Learn everything there is to know about the IWDR API and how to integrate the IWDR API into your product.',
    };
    return { props };
}

export default function Index() {
    return (
        <>
            <HeroPattern />
            <h1>IWDR API Documentation</h1>
            <p className="lead">
                Use the IWDR API to access your organizations data stored within the IWDR database. There are many data
                models retrievable from the IWDR API such as, dogs, litters, health data, status histories, and much
                more.
            </p>
            <h2>Getting Started</h2>
            <Note>
                In order to use the IWDR API you must first acquire an authentication token. You can apply for an
                authentication token <a href="#">here, </a>
                if you do not already have one.
            </Note>
            <p className="lead">
                To get started, or, for an overview of the setup process, we highly recommend reading the{' '}
                <a href="/quickstart">Quickstart</a> page. You can also visit the{' '}
                <a href="/authentication">Authentication</a> page for information about using your IWDR API token to
                make authenticated HTTP requests.
            </p>
            <Guides />
            <Resources />
        </>
    );
}
