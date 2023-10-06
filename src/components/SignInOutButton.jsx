import { Button } from '@/components/Button';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function SignInOutButton({ className }) {
    const { data: session } = useSession();
    const router = useRouter();

    // Custom logout function because next-auth
    // does not refresh page for some reason.
    const logout = async () => {
        await signOut();
        router.reload();
    };

    return (
        <>
            {!!session?.user ? (
                <Button onClick={() => logout()} className={className}>
                    Sign out
                </Button>
            ) : (
                <Button onClick={() => signIn('iwdr')} className={className}>
                    Sign In with IWDR
                </Button>
            )}
        </>
    );
}
