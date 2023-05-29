import {forwardRef, useEffect, useState} from "react";
import {Editor} from "@tinymce/tinymce-react";

export const TextEditor = forwardRef(function TextEditor({
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
                                                             horizontal = false
                                                         }, ref) {
    const mce_plugins = 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tableofcontents footnotes mergetags autocorrect typography inlinecss';
    const mce_toolbar = 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat'
    const [dark, setDark] = useState(false);

    useEffect(() => {
        if (window.localStorage.isDarkMode === "true" || (!('isDarkMode' in window.localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setDark(true);
        } else {
            setDark(false);
        }
    }, []);

    return (
        <div className="my-4">
            <div>
                <label
                    htmlFor={name}
                    className="block text-sm font-semibold leading-6 text-zinc-900 dark:text-white my-2"
                >
                    {label}
                    {required && <span className="text-red-600 ml-0.5">*</span>}
                    {help && <p className="text-sm font-medium max-w-sm my-0.5">{help}</p>}
                </label>
            </div>
            <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                onInit={(evt, editor) => ref.current = editor}
                initialValue={placeholder}
                init={{
                    height: height,
                    menubar: menubar,
                    plugins: mce_plugins,
                    toolbar: mce_toolbar,
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    content_css: dark ? 'dark' : '',
                    skin: dark ? "oxide-dark" : 'oxide'
                }}
                disabled={disabled}
                id={id}
            />
        </div>
    )
});