import {SupportForm} from "@/components/forms/SupportForm";

export function getServerSideProps() {
    return {
        props: {
            title: 'Support Ticket'
        }
    }
}

export default function Support() {
    return (
        <>
            <h1>Submit a support ticket</h1>
            <SupportForm/>
        </>
    );
}