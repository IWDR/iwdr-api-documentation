import { Button } from '@/components/Button';
import axios from '@/lib/axios';
import { useAlertStore } from '@/stores/alertStore';
import { useLoadingStore } from '@/stores/loadingStore';
import { useRouter } from 'next/router';

export function getServerSideProps() {
    return {
        props: {
            title: 'Verify Email',
        },
    };
}

export default function VerifyEmail() {
    const router = useRouter();
    const { successAlert, errorAlert } = useAlertStore();
    const { setLoading } = useLoadingStore();
    const sendVerificationEmail = async () => {
        setLoading(true);
        await axios
            .post('/email/verification-notification')
            .then((res) => {
                if (res.status === 202)
                    successAlert('The verification email has been sent to the email address on file.', true, 6000);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const check_status = async () => {
        setLoading(true);
        await axios
            .get('/user-info')
            .then(() => {
                successAlert('You have successfully verified your email.', true, 6000);
                router.push('/');
            })
            .catch((err) => {
                if (err?.response?.status === 409) {
                    errorAlert(
                        'We have not detected that your email address has been verified yet. Please try again.',
                        true,
                        6000
                    );
                }
            })
            .finally(() => setLoading(false));
    };

    return (
        <>
            <h1>Verify Account Email Address</h1>
            <p>
                To ensure the security of your account, please click the button below to verify your IWDR account&apos;s
                email address.
            </p>
            <div className={'flex w-full justify-between'}>
                <Button variant={'text'} onClick={() => sendVerificationEmail()}>
                    Send email verification link
                </Button>
                <Button variant={'text'} onClick={() => check_status()}>
                    Check verification status
                </Button>
            </div>
        </>
    );
}
