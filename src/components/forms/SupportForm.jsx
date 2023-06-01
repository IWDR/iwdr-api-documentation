import {useRef, useState} from "react";
import {Button} from "@/components/Button";
import {TextEditor} from "@/components/TextEditor";
import {SelectField} from "@/components/SelectField";
import useSWR from "swr";
import FileUpload from "@/components/FileUpload";

export function SupportForm() {
    const [reason, setReason] = useState([]);
    const detailsRef = useRef(null);
    const [attachments, setAttachments] = useState([]);

    const error_option = [{text: "No options found.", value: ''}];
    const {
        data,
        isLoading,
        error
    } = useSWR({resource: '/api/references/support-type-code'});
    const reasons = !isLoading && !error ? data.data.map((reason) => {
        return {text: reason.stc_Type, value: reason.stc_ID}
    }) : error_option;

    const submit = (e) => {
        e.preventDefault();

        // TODO: Write the API submission to support ticket system
        const form = {
            reason,
            details: detailsRef.current.getContent(),
            attachments
        }

        console.log(form);
    }

    return (
        <>
            <form>
                <div>
                    <SelectField id={"reason"}
                                 name={"reason"}
                                 label={"Reason"}
                                 placeholder={"Select a reason..."}
                                 options={reasons}
                                 value={reason}
                                 onChange={setReason}
                                 required
                    />
                </div>
                <div className="mt-2">
                    <TextEditor height={500}
                                ref={detailsRef}
                                label={"Ticket details"}
                                required id={"ticket-details"}
                    />
                </div>
                <div>
                    <FileUpload id={"file-upload"}
                                name={"file-upload"}
                                type={"file"}
                                placeholder={"Add attachments"}
                                label={"Attachments"}
                                onChange={(files) => setAttachments(files)}
                                accept={"image/*"}
                                multiple
                    />
                </div>
                <div className="flex justify-start mt-5">
                    <Button type="button" onClick={(e) => submit(e)}>Submit Ticket</Button>
                </div>
            </form>
        </>
    );
}
