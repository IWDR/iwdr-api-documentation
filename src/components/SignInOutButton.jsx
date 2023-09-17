import { Button } from '@/components/Button';
import { useAuth } from '@/hooks/auth';
import { useLoadingStore } from '@/stores/loadingStore';
import { AuthContext } from '@/lib/contexts/AuthProvider';
import { useContext } from 'react';

export default function SignInOutButton({ className }) {
    const { user } = useContext(AuthContext);
    const { logout } = useAuth();
    const { setLoading } = useLoadingStore();

    const do_logout = async () => {
        setLoading(true);
        await logout();
        setLoading(false);
    };

    return (
        <>
            {!!user ? (
                <Button onClick={() => do_logout()} className={className}>
                    Sign out
                </Button>
            ) : (
                <Button href="/login" className={className}>
                    Sign in
                </Button>
            )}
        </>
    );
}
