import { useRef, useState } from 'react';
import { Button } from '@/components/Button';
import { TextEditor } from '@/components/TextEditor';
import { SelectField } from '@/components/SelectField';
import useSWR from 'swr';
import { FileUpload } from '@/components/FileUpload';
import axios from '@/lib/axios';
import { useAlertStore } from '@/stores/alertStore';
import { useLoadingStore } from '@/stores/loadingStore';
import { useSession } from 'next-auth/react';

export function SupportForm() {
    const { data: session, status } = useSession();
    const [reason, setReason] = useState([]);
    const detailsRef = useRef(null);
    const [attachments, setAttachments] = useState([]);
    const attachmentRef = useRef();
    const { successAlert, serverErrorAlert } = useAlertStore();
    const { setLoading } = useLoadingStore();
    const error_option = [{ text: 'No options found.', value: '' }];
    const { data, isLoading, error } = useSWR({
        resource: '/api/public/v1/references/support-type-code',
        options: { headers: { Authorization: 'Bearer ' + session?.user?.access_token } },
    });

    const reasons =
        !isLoading && !error
            ? data.data.map((reason) => {
                return { text: reason.stc_Type, value: reason.stc_ID };
            })
            : error_option;

    const reset = () => {
        setReason([]);
        setAttachments([]);
        attachmentRef.current.reset();
        detailsRef.current.setContent('');
    };

    const submit = (e) => {
        e.preventDefault();

        const ticket = {
            email: session?.user.email,
            name: session?.user.name,
            subject: reason,
            message: detailsRef.current.getContent(),
            attachments: attachments,
        };

        setLoading(true);
        axios
            .post('/api/public/v1/support', {...ticket}, { headers: { Authorization: 'Bearer ' + session?.user?.access_token } })
            .then((res) => {
                if (res.status !== 204) return;

                successAlert('Support ticket submitted successfully', true, 6000);
                reset();
            })
            .catch((err) => {
                if (err?.response?.status !== 422) {
                    serverErrorAlert();
                }
            })
            .finally(() => setLoading(false));
    };

    if (status === 'loading') return <p>Loading...</p>;

    return (
        <>
            <form>
                <div>
                    <SelectField
                        id={'reason'}
                        name={'reason'}
                        label={'Reason'}
                        placeholder={'Select a reason...'}
                        options={reasons}
                        value={reason}
                        onChange={setReason}
                        required
                    />
                </div>
                <div className="mt-2">
                    <TextEditor
                        height={500}
                        ref={detailsRef}
                        label={'Ticket details'}
                        required
                        id={'ticket-details'}
                        menubar={'false'}
                    />
                </div>
                <div>
                    <FileUpload
                        id={'file-upload'}
                        name={'file-upload'}
                        type={'file'}
                        placeholder={'Add attachments'}
                        ref={attachmentRef}
                        label={'Attachments'}
                        onChange={(files) => setAttachments(files)}
                        accept={'image/*'}
                        multiple
                    />
                </div>
                <div className="mt-5 flex justify-start">
                    <Button type="button" onClick={(e) => submit(e)}>
                        Submit Ticket
                    </Button>
                </div>
            </form>
        </>
    );
}
