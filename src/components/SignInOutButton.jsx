import { Button } from '@/components/Button';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function SignInOutButton({ className }) {
    const { status } = useSession();

    // Custom logout function because next-auth
    // does not refresh page for some reason.
    const logout = async () => {
        await signOut({ redirect: true });
        window.location.reload();
    };

    return (
        <>
            {status === "authenticated" ? (
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
