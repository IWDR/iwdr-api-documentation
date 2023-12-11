import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/Button';
import { Dialog } from '@headlessui/react';
import { Modal } from '@/components/Modal';
import { SelectField } from '@/components/SelectField';
import { TextField } from '@/components/TextField';
import bcl from '@/models/bcl.json';
import elbow from '@/models/elbow.json';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import { Pre } from '@/components/Code';
import { FileUpload } from '@/components/FileUpload';

// TODO: Copy button doesn't work for code block

export function ApiConnectorGeneratorDialog({ buttonText }) {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('');
    const [table, setTable] = useState('');
    const [tableObj, setTableObj] = useState();
    const [data, setData] = useState([]);
    const [generatedData, setGeneratedData] = useState('');
    const [codeHidden, setCodeHidden] = useState(true);
    const [fileUploadHidden, setFileUploadHidden] = useState(true);
    const [userUploadedFile, setUserUploadedFile] = useState([]);
    const userUploadedFileRef = useRef();

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
        setData([]);
        setGeneratedData('');
        setCodeHidden(true);
        setFileUploadHidden(true);
        setUserUploadedFile([]);
        userUploadedFileRef.current.reset();
    };

    const submit = (e) => {
        e.preventDefault();

        const column_map = {};

        data.forEach((k, i) => {
            column_map[k] = tableObj?.properties[i].name;
        });

        const output = {
            iwdr_key_name: 'iwdr_key_name',
            column_map: column_map,
            record_type: 'record_type',
            source: 'source',
            type: type ? typeOptions[type].text.toLowerCase() : typeOptions[0].text.toLowerCase(),
            target: 'target',
            our_key_name: 'our_key_name',
        };

        setGeneratedData(JSON.stringify(output, null, 2));
        setCodeHidden(false);
    };

    const fileWasUploaded = (files) => {
        setUserUploadedFile(files);
        const encoded_data = Object.values(files[0])[0].split(',')[1];
        const decoded_data = atob(encoded_data);
        const file_as_obj = JSON.parse(decoded_data);

        setGeneratedData(decoded_data);
        setCodeHidden(false);
    };

    const onClose = () => {
        setOpen(!open);
        reset();
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

    const code = Prism.highlight(testData, Prism.languages['json'], 'json');

    return (
        <>
            <Button onClick={() => setOpen(true)}>{buttonText ?? 'Generate Connector Map'}</Button>
            <Modal open={open} openModifier={onClose}>
                <Dialog.Title as="h1">API Connector Generator</Dialog.Title>
                <div hidden={codeHidden}>
                    <Pre>
                        <code
                            dangerouslySetInnerHTML={{
                                __html: Prism.highlight(generatedData, Prism.languages['json'], 'json'),
                            }}
                        />
                    </Pre>
                </div>
                <form
                    className="space-y-8"
                    onSubmit={(e) => {
                        submit(e);
                    }}
                >
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

                    <Button
                        type={'button'}
                        onClick={() => {
                            setFileUploadHidden(false);
                        }}
                    >
                        Upload Existing
                    </Button>

                    <div hidden={fileUploadHidden}>
                        <FileUpload
                            id={'file-upload'}
                            name={'file-upload'}
                            type={'file'}
                            placeholder={'Add File'}
                            onChange={(files) => fileWasUploaded(files)}
                            ref={userUploadedFileRef}
                            accept={'application/json'}
                        />
                    </div>

                    <div className="mt-3 flex justify-start">
                        <Button type={'submit'}>Generate</Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
