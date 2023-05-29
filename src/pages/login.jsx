import LoginForm from '@/components/forms/LoginForm'

export async function getServerSideProps({query}) {
    return {
        props: {
            title: 'Sign In',
            redirect: query?.redirect ?? null,
        },
    }
}

export default function Login({redirect}) {
    return (
        <div className="max-w-2xl pb-16 mx-auto">
            <h1>Sign In</h1>
            <p>Access user restricted pages and content.</p>
            <div>
                <LoginForm redirect={redirect}/>
            </div>
        </div>
    )
}
