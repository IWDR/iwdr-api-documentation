import { forwardRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export const TextEditor = forwardRef(function TextEditor(
    {
        height,
        menubar,
        placeholder,
        name,
        id,
        onChange,
        className,
        label,
        help,
        disabled = false,
        required = false,
        horizontal = false,
    },
    ref
) {
    const mce_plugins =
        'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount';
    const mce_toolbar =
        'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | spellcheckdialog typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat';

    return (
        <div className="my-4">
            <div>
                <label
                    htmlFor={name}
                    className="my-2 block text-sm font-semibold leading-6 text-zinc-900 dark:text-white"
                >
                    {label}
                    {required && <span className="ml-0.5 text-red-600">*</span>}
                    {help && <p className="my-0.5 max-w-sm text-sm font-medium">{help}</p>}
                </label>
                <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                    onInit={(evt, editor) => (ref.current = editor)}
                    initialValue={placeholder}
                    init={{
                        height: height,
                        menubar: menubar,
                        plugins: mce_plugins,
                        toolbar: mce_toolbar,
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        content_css: 'default',
                        skin: 'oxide',
                    }}
                    disabled={disabled}
                    id={id}
                />
            </div>
        </div>
    );
});
