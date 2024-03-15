import { SupportForm } from '@/components/forms/SupportForm';
import AuthChecker from '@/components/AuthChecker';

export function getServerSideProps() {
    return {
        props: {
            title: 'Support Ticket',
        },
    };
}

export default function Support() {
    return (
        <>
            <AuthChecker />
            <h1>Submit a support ticket</h1>
            <SupportForm />
        </>
    );
}
