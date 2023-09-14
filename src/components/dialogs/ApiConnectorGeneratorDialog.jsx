import { Button } from '@/components/Button';
import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Modal } from '@/components/Modal';
import { SelectField } from '@/components/SelectField';
import { TextField } from '@/components/TextField';
import bcl from '@/models/bcl.json';
import elbow from '@/models/elbow.json';
import { Code, CodeGroup } from '@/components/Code';
import { MDXContext, MDXProvider } from '@mdx-js/react';
import { TextArea } from '@/components/TextArea';
import { CodeBlock } from '@/components/CodeBlock';
import ReactMarkdown from 'react-markdown';

export function ApiConnectorGeneratorDialog({ buttonText }) {
    const [open, setOpen] = useState(false);

    const [type, setType] = useState('');
    const [table, setTable] = useState('');
    const [tableObj, setTableObj] = useState();

    const [data, setData] = useState([]);

    const [generatedData, setGeneratedData] = useState('');

    const typeOptions = [
        { text: 'Query', value: 0 },
        { text: 'File', value: 1 },
    ];

    const tableOptions = [
        { text: 'BCL', value: 0, data: bcl },
        { text: 'Elbows', value: 1, data: elbow },
    ];

    const reset = () => {
        setType('');
        setTable('');
        setTableObj(null);
    };

    const generate = () => {
        const column_map = {};
        data.forEach((k, i) => {
            column_map[k] = tableObj?.properties[i].name;
        });
        const output = {
            iwdr_key_name: 'iwdr_key_name',
            column_map: column_map,
            record_type: 'record_type',
            source: 'source',
            type: typeOptions[type].text.toLowerCase(),
            target: 'target',
            our_key_name: 'our_key_name',
        };
        setGeneratedData(JSON.stringify(output, null, 2));
    };

    const onClose = () => {
        setOpen(!open);
        setTimeout(reset, 1252);
    };

    const testData = JSON.stringify(
        {
            iwdr_key_name: 'iwdr_key_name',
            column_map: {
                item1: 'item1',
                item2: 'item2',
                item3: 'item3',
                item4: 'item4',
            },
            record_type: 'record_type',
            source: 'source',
            type: 'type',
            target: 'target',
            our_key_name: 'our_key_name',
        },
        null,
        2
    );

    return (
        <>
            <Button onClick={() => setOpen(true)}>{buttonText}</Button>
            <Modal open={open} openModifier={onClose}>
                <Dialog.Title as="h1">API Connector Generator</Dialog.Title>
                <ReactMarkdown>
                    <CodeGroup>{testData}</CodeGroup>
                </ReactMarkdown>
                <form className="space-y-8">
                    <SelectField
                        required
                        id="table"
                        label="Table"
                        value={table}
                        options={tableOptions}
                        onChange={(e) => {
                            setTable(e);
                            setTableObj(JSON.parse(JSON.stringify(tableOptions[e].data)));
                        }}
                    />
                    <SelectField
                        required
                        id="type_of_config"
                        label="Type of config"
                        value={type}
                        options={typeOptions}
                        onChange={setType}
                    />
                    {tableObj?.properties.map((column, index) => (
                        <TextField
                            name={column.name}
                            id={column.name}
                            key={`api_connector_${column.name}`}
                            label={column.name}
                            value={data[index] ?? ''}
                            onChange={(e) => {
                                data[index] = e.target.value;
                                setData([...data]);
                            }}
                            required={column.required}
                        />
                    ))}
                </form>
                <div className="mt-3 flex justify-start">
                    <Button onClick={generate}>Generate</Button>
                </div>
            </Modal>
        </>
    );
}
