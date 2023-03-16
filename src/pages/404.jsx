import ServerDownIcon from "@/components/icons/ServerDownIcon";
import {Button} from "@/components/Button";
import PageNotFoundIcon from "@/components/icons/PageNotFoundIcon";

export default function Custom404() {
    return (
        <div className="grid min-h-full place-items-center mx-auto">
            <div className="text-center">
                <PageNotFoundIcon className="w-96 max-sm:w-1/2 mb-10 inline-flex"/>
                <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">We couldn&apos;t find the page you&apos;re
                    looking for.</h1>
                <p className="mt-6 text-base leading-7">It appears we don&apos;t have the page that you requested. Please try a different page.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Button href="/" variant="primary">Go back to home</Button>
                    <Button href="/support" variant="text" arrow='right'>Contact Support</Button>
                </div>
            </div>
        </div>
    )
}