import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon
} from "@heroicons/react/20/solid";
import clsx from "clsx";

export default function VariantIcon({ variant }) {
    let classes = 'w-6'

    switch (variant) {
        case 'success':
            return <CheckCircleIcon className={clsx('text-emerald-700', classes)} />
        case 'error':
            return <ExclamationCircleIcon className={clsx('text-red-700', classes)} />
        case 'info':
            return (
                <InformationCircleIcon className={clsx('text-cyan-700', classes)} />
            )
        case 'warning':
            return (
                <ExclamationTriangleIcon className={clsx('text-orange-600', classes)} />
            )
        default:
            return <></>
    }
}