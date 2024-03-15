import TokensDataTable from '@/components/data-tables/TokensDataTable';
import { useSession } from 'next-auth/react';
import AuthChecker from '@/components/AuthChecker';

export default function Tokens() {
    const { data: session } = useSession({ required: true });

    if (session?.user?.usr_GroupID !== -1) {
        return <p>You are not authorized to view this content.</p>;
    }

    return (
        <>
            <AuthChecker />
            <h1>Tokens</h1>
            <TokensDataTable />
        </>
    );
}
