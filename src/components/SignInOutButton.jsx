import { Button } from '@/components/Button';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function SignInOutButton({ className }) {
    const { data: session } = useSession();

    return (
        <>
            {!!session?.user ? (
                <Button onClick={() => signOut()} className={className}>
                    Sign out
                </Button>
            ) : (
                <Button onClick={() => signIn('iwdr', { redirect: true, callbackUrl: '/' })} className={className}>
                    Sign In with IWDR
                </Button>
            )}
        </>
    );
}
