import {SupportForm} from "@/components/forms/SupportForm";

export function getServerSideProps() {
    return {
        props: {
            title: 'Support'
        }
    }
}

export default function Support() {
    return (
        <>
            <h1>Support</h1>
            <div>
                <SupportForm />
            </div>
        </>
    );
}