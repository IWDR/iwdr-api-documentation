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
        <>
            <h1>Sign In</h1>
            <p>Access user restricted pages and content.</p>
            <div className="not-prose m-0 mx-auto max-w-2xl space-y-10 pb-16 lg:max-w-5xl">
                <LoginForm redirect={redirect}/>
            </div>
        </>
    )
}
