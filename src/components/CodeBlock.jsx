import React from 'react';

export function CodeBlock({ code }) {
    return (
        <div className="rounded-md bg-gray-900 p-4 text-white shadow-md">
            <pre>
                <code className="bg-transparent text-sm">{code}</code>
            </pre>
        </div>
    );
}
