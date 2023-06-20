import { SupportForm } from '@/components/forms/SupportForm';
import { Note } from '@/components/mdx';

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
            <Note alert>
                This page is currently a work in progress and is not fully functional. If you need to submit a support
                ticket please do so on the IWDR database interface at{' '}
                <a href="https://iwdr.org/iwdr" target="_blank" rel="noreferrer">
                    https://iwdr.org/iwdr
                </a>
            </Note>
            <h1>Submit a support ticket</h1>
            <SupportForm />
        </>
    );
}
