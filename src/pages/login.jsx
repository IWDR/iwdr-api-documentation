import { signIn } from 'next-auth/react';
import { Button } from '@/components/Button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!!session) {
        if (!!context.query?.callbackUrl) {
            const url = new URL(context.query.callbackUrl, process.env.NEXTAUTH_URL);

            return {
                redirect: {
                    permanent: false,
                    destination: url.pathname,
                },
            };
        }

        return {
            redirect: {
                permanent: false,
                destination: '/',
            },
        };
    }

    return {
        props: {
            title: 'Sign In',
        },
    };
}

export default function Login() {
    return (
        <div>
            <h1>Please Sign In to continue.</h1>
            <p>
                In order to fully utilize this API Documentation website you must first have an account in the International
                Working Dog Registry Database Interface. If you do not already have an account then you will need to{' '}
                <a href={'https://iwdr.org/iwdr/register.php'} target={'_blank'}>
                    register
                </a>{' '}
                and request that your organization&apos;s administrator activate your login.
            </p>
            <Button variant={'primary'} onClick={() => signIn('iwdr', { redirect: true })}>
                Sign In with IWDR
            </Button>
        </div>
    );
}
