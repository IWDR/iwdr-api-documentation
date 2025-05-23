/*
 * Application review page for admins only
 */

import { DataTable } from '@/components/DataTable';
import { CreateApplicationReviewDialog } from '@/components/dialogs/CreateApplicationReviewDialog';
import clsx from 'clsx';
import useSWR from 'swr';
import { useRef } from 'react';
import { useSession } from 'next-auth/react';
import AuthChecker from '@/components/AuthChecker';

function StatusIndicator({ app }) {
    const { data: session, status } = useSession();
    const error_option = [{ text: 'Nothing', value: '' }];

    const statuses = {
        accepted: 'text-green-400 bg-green-400/10',
        reviewing: 'text-rose-400 bg-rose-400/10',
        submitted: 'text-yellow-400 bg-yellow-400/10',
        rejected: 'text-gray-400 bg-gray-400/10',
    };

    const {
        data: appProgressData,
        error: appProgressError,
        isLoading: appProgressIsLoading,
    } = useSWR({
        resource: '/api/references/application-progress?api=1',
        options: { headers: { Authorization: 'Bearer ' + session?.user?.access_token } },
    });

    const application_progress_options =
        !appProgressIsLoading && !appProgressError
            ? appProgressData.data?.map((row) => {
                  return { text: row.apc_ProgressText, value: row.apc_AppProgressCode };
              })
            : error_option.map((row) => {
                  return { text: row.text, value: row.value };
              });

    const filter = (id) => application_progress_options.filter((option) => option.value === id);

    const mapIndicator = (id) => {
        if (id === 8) return statuses.submitted;
        if (id === 12) return statuses.accepted;
        if (id === 13) return statuses.rejected;
        return statuses.reviewing;
    };

    if (status === 'loading') return <p>Loading...</p>;

    return (
        <div className="flex items-center justify-end gap-x-2 sm:justify-start">
            <div className={clsx(mapIndicator(app.application_progress_id), 'flex-none rounded-full p-1')}>
                <div className="h-1.5 w-1.5 rounded-full bg-current" />
            </div>
            <div className="hidden sm:block">{filter(app.application_progress_id)[0]?.text}</div>
        </div>
    );
}

export default function TokenApplicationReview() {
    const { data: session, status } = useSession();
    const ref = useRef();

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (session?.user?.usr_GroupID !== -1) {
        return <p>You are not authorized to view this content.</p>;
    }

    const headers = [
        {
            text: 'Project Leader',
            key: 'name',
        },
        {
            text: 'Email',
            key: 'email',
        },
        {
            text: 'Ideal Start Date',
            key: 'desired_start_date',
        },
        {
            text: 'Status',
            component: (item) => <StatusIndicator app={item} />,
        },
        {
            text: 'Actions',
            component: (item) => <CreateApplicationReviewDialog app={item} onSave={() => ref.current.mutate()} />,
        },
    ];

    return (
        <>
            <AuthChecker />
            <h1>API Application Review</h1>
            <DataTable path="/admin/api-applications" headers={headers} ref={ref} />
        </>
    );
}
