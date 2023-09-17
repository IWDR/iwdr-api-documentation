import TokensDataTable from '@/components/data-tables/TokensDataTable';
import { useContext } from 'react';
import { AuthContext } from '@/lib/contexts/AuthProvider';

export default function Tokens() {
    const { user } = useContext(AuthContext);

    if (user?.usr_GroupID !== -1) {
        return <p>You are not authorized to view this content.</p>;
    }

    return (
        <>
            <h1>Tokens</h1>
            <TokensDataTable />
        </>
    );
}
