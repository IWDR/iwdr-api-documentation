import clsx from 'clsx';
import VariantIcon from '@/components/icons/VariantIcon';
import CloseIcon from '@/components/icons/CloseIcon';
import { useBannerStore } from '@/stores/bannerStore';

export default function Banner({ className }) {
    const variantStyles = {
        success: 'bg-emerald-300/90',
        error: 'bg-red-300/90',
        warning: 'bg-orange-300/90',
        info: 'bg-cyan-300/90',
        plain: 'bg-gray-300/90 dark:bg-zinc-600/90',
    };

    const { open, message, isClosable, variant, clearBanner } = useBannerStore();

    return (
        <div
            className={clsx(
                !open && 'hidden',
                variantStyles[variant],
                'top-18 fixed inset-x-0 z-10 flex h-14 items-center gap-x-6 rounded-b-md px-4 transition sm:px-6 lg:left-72 lg:z-10 lg:px-8 xl:left-80',
                className
            )}
        >
            <VariantIcon variant={variant} />
            <p className={clsx('text-sm leading-6', variant === 'plain' && 'dark:text-gray-200')}>{message}</p>
            <div className="flex flex-1 justify-end">
                {isClosable && (
                    <button
                        type="button"
                        onClick={() => clearBanner()}
                        className="rounded-full bg-zinc-400/50 p-1 shadow hover:opacity-90"
                    >
                        <span className="sr-only">Close</span>
                        <CloseIcon className="w-4 fill-zinc-900 dark:fill-zinc-900" />
                    </button>
                )}
            </div>
        </div>
    );
}