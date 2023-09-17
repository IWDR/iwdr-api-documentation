import { Button } from '@/components/Button';
import ServerDownIcon from '@/components/icons/ServerDownIcon';

export default function Custom500() {
    return (
        <>
            <div className="mx-auto grid min-h-full place-items-center">
                <div className="text-center">
                    <ServerDownIcon className="mb-10 w-full" />
                    <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                        Oops, looks like we couldn&apos;t complete your request.
                    </h1>
                    <p className="mt-6 text-base leading-7">
                        Something went wrong while attempting to load the page you had asked for. Please try your
                        request again later.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button href="/" variant="primary">
                            Go back to home
                        </Button>
                        <Button href="/support" variant="text" arrow="right">
                            Contact support
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
