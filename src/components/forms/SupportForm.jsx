import {TextField} from "@/components/TextField";
import {useRef, useState} from "react";
import {Button} from "@/components/Button";
import {TextEditor} from "@/components/TextEditor";

export function SupportForm() {
    const [reason, setReason] = useState('');
    const detailsRef = useRef(null);

    const submit = (e) => {
        e.preventDefault();

        // TODO: Write the API submission to support ticket system
        const form = {
            reason,
            details: detailsRef.current.getContent()
        }

        console.log(form);
    }

    return (
        <>
            <form>
                <div>
                    <TextField
                        type={"text"}
                        label={"Reason"}
                        placeholder={"Enter reason for ticket..."}
                        name={"ticket_reason"}
                        id={"ticket_reason"}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                    />
                </div>
                <div className="mt-2">
                    <TextEditor height={500} ref={detailsRef} label={"Ticket details"} required id={"ticket-details"} />
                </div>
                <div className="flex justify-start mt-3">
                    <Button type="button" onClick={(e) => submit(e)}>Submit Ticket</Button>
                </div>
            </form>
        </>
    );
}
