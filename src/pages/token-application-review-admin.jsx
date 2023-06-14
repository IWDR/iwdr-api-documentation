/*
 * Application review page for admins only
 */

import { DataTable } from '@/components/DataTable';
import { CreateApplicationReviewDialog } from '@/components/dialogs/CreateApplicationReviewDialog';
import { useAuth } from '@/hooks/auth';
import LoadingOverlay from '@/components/LoadingOverlay';
import clsx from 'clsx';
import useSWR from 'swr';
import { useRef } from 'react';

export async function getServerSideProps() {
    return {
        props: {
            title: 'API Application Review',
            description: 'Admin review of applications for API access.',
        },
    };
}

function StatusIndicator({ app }) {
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
    } = useSWR({ resource: '/api/references/application-progress?api=1' });

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
    const { user } = useAuth();
    const ref = useRef();

    // TODO: make this a helper function since it is used multiple times on different pages
    if (!user) {
        return <LoadingOverlay />;
    }
    if (user.usr_GroupID !== -1) {
        console.log(user);
        return <p>You are not authorized to view this content.</p>;
    }

    const headers = [
        {
            text: 'Project Leader',
            key: 'project_leader_name',
        },
        {
            text: 'Email',
            key: 'project_leader_email',
        },
        {
            text: 'Ideal Start Date',
            key: 'project_desired_start_date',
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
            <h1>API Application Review</h1>
            <DataTable path="/api/access-application" headers={headers} ref={ref} />
        </>
    );
}
