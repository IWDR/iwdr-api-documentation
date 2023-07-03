import { useRef, useState } from 'react';
import { Button } from '@/components/Button';
import { TextEditor } from '@/components/TextEditor';
import { SelectField } from '@/components/SelectField';
import useSWR from 'swr';
import FileUpload from '@/components/FileUpload';
import { useAuth } from '@/hooks/auth';
import axios from '@/lib/axios';
import { useAlertStore } from '@/stores/alertStore';
import { useLoadingStore } from '@/stores/loadingStore';

export function SupportForm() {
    const [reason, setReason] = useState([]);
    const detailsRef = useRef(null);
    const [attachments, setAttachments] = useState([]);
    const { user } = useAuth();
    const { successAlert, errorAlert, serverErrorAlert } = useAlertStore();
    const { setLoading } = useLoadingStore();

    const error_option = [{ text: 'No options found.', value: '' }];
    const { data, isLoading, error } = useSWR({ resource: '/api/references/support-type-code' });

    const reasons =
        !isLoading && !error
            ? data.data.map((reason) => {
                  return { text: reason.stc_Type, value: reason.stc_ID };
              })
            : error_option;

    const reset = () => {
        setReason([]);
        setAttachments([]);
    };

    const submit = (e) => {
        e.preventDefault();

        // TODO: Write the API submission to support ticket system
        // const ticket = {
        //     reason,
        //     details: detailsRef.current.getContent(),
        //     attachments,
        // };

        const ticket = {
            email: user.email,
            name: user.name,
            subject: reason,
            message: detailsRef.current.getContent(),
            attachments: attachments,
            source: 'IWDR API Documentation',
        };

        setLoading(true);
        axios
            .post('api/tickets.json', ticket)
            .then((res) => {
                if (res.status !== 200) return;

                successAlert('Support ticket submitted', true, 6000);
                reset();
            })
            .catch((err) => {
                if (err?.response?.status !== 422) {
                    serverErrorAlert();
                }
            })
            .finally(() => setLoading(false));

        console.log(ticket);
    };

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
