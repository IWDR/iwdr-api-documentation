import TokensDataTable from "@/components/data-tables/TokensDataTable";
import {useAuth} from "@/hooks/auth";
import {useRouter} from "next/router";

export function getServerSideProps(){
    return {
        props: {
            title: 'Tokens',
            description: 'List and manage api tokens.'
        }
    }
}
export default function Tokens() {
    const user = useAuth();
    if(user.usr_GroupID !== -1){
        return (
            <p>You are not authorized to view this content.</p>
        )
    }

    return (
        <>
            <h1>Tokens</h1>
            <TokensDataTable />
        </>
    )
}