import { SelectField } from '@/components/SelectField';
import { TextField } from '@/components/TextField';
import axios from '@/lib/axios';
import { useLoadingStore } from '@/stores/loadingStore';
import { useState } from 'react';

export function CreateTokenForm({ onSubmit, id }) {
    const { setLoading } = useLoadingStore();

    const [token_name, setTokenName] = useState('');
    const [token_name_error, setTokenNameError] = useState('');
    const [token_abilities, setTokenAbilities] = useState([]);
    const [abilities_error, setAbilitiesError] = useState('');

    const abilities = [{ text: '*', value: '*' }];

    const reset = () => {
        setTokenName('');
        setTokenNameError('');
        setTokenAbilities([]);
        setAbilitiesError('');
    };

    const submit = async (e) => {
        e.preventDefault();

        setLoading(true);
        await axios
            .post(
                '/api/tokens',
                {
                    token_name,
                    abilities: token_abilities,
                },
                { headers: { Authorization: 'Bearer ' + session?.user?.access_token } }
            )
            .then((res) => {
                reset();
                onSubmit(res.data.token);
            })
            .catch((err) => {
                if (err.response.status === 422) {
                    let errors = err.response.data.errors;

                    setTokenNameError(errors.token_name ?? '');
                    setAbilitiesError(errors.abilities ?? '');
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <form id={id} onSubmit={(e) => submit(e)}>
            <div>
                <TextField
                    error={!!token_name_error}
                    error_message={token_name_error}
                    label="Token name"
                    name="token_name"
                    id="token_name"
                    placeholder="Enter the token name..."
                    value={token_name}
                    onChange={(e) => setTokenName(e.target.value)}
                    type="text"
                />
            </div>
            <div className="mt-4">
                <SelectField
                    label="Token abilities"
                    name="abilities"
                    id="abilities"
                    placeholder="Select any number of abilities..."
                    options={abilities}
                    value={token_abilities}
                    onChange={setTokenAbilities}
                    error={!!abilities_error}
                    error_message={abilities_error}
                    multiple
                />
            </div>
        </form>
    );
}
