import { useState } from 'react';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { Dialog } from '@headlessui/react';
import { CreateTokenForm } from '@/components/forms/CreateTokenForm';

export function CreateTokenDialog({onSubmit}) {
    const [open, setOpen] = useState(false)

    const submitted = (token_data) => {
        setOpen(false)
        onSubmit(token_data)
    }

    return (
        <>
            {/* Opening button */}
            <Button onClick={() => setOpen(true)}>Create token</Button>
            {/* Start model */}
            <Modal open={open} openModifier={setOpen}>
                <Dialog.Title
                    as="h2"
                    className="text-lg font-bold leading-7 dark:text-white"
                >
                    Create a new token
                </Dialog.Title>
                <CreateTokenForm
                    id="create-token"
                    onSubmit={(data) => submitted(data)}
                />
                <div className="mt-4 flex justify-between sm:mt-6">
                    <Button variant="primary" type="submit" form="create-token">
                        Submit
                    </Button>
                </div>
            </Modal>
        </>
    )
}
