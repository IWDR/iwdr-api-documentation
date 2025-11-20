import { SupportForm } from '@/components/forms/SupportForm';
import { useSession } from 'next-auth/react';

export function getServerSideProps() {
    return {
        props: {
            title: 'Support Ticket',
        },
    };
}

export default function Support() {
    useSession({ required: true });

    return (
        <>
            <h1>Submit a support ticket</h1>
            <SupportForm />
        </>
    );
}
