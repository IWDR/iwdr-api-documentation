import {TextField} from "@/components/TextField";
import {useState} from "react";
import {Button} from "@/components/Button";

export function SupportForm() {
    const [reason, setReason] = useState('');
    const [details, setDetails] = useState('');

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
                <div>
                    <TextField
                        type={"text"}
                        label={"Details"}
                        placeholder={"Details..."}
                        name={"ticket_details"}
                        id={"ticket_details"}
                        className="mt-2"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        required
                    />
                </div>
                <div className="flex justify-start mt-3">
                    <Button type="submit">Submit Ticket</Button>
                </div>
            </form>
        </>
    );
}
