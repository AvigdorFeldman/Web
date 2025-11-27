import { useEffect, useState } from 'react';

export default function Captcha({ length = 5, onValidate, name = 'captcha' }) {
    const [code, setCode] = useState('');
    const [value, setValue] = useState('');
    const [valid, setValid] = useState(false);

    useEffect(() => {
        setCode(generateCode(length));
    }, [length]);

    function generateCode(len) {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let s = '';
        for (let i = 0; i < len; i++) s += chars.charAt(Math.floor(Math.random() * chars.length));
        return s;
    }

    function refresh() {
        setCode(generateCode(length));
        setValue('');
        setValid(false);
        if (onValidate) onValidate(false);
    }

    function handleChange(e) {
        const v = e.target.value.toUpperCase();
        setValue(v);
        const ok = v === code;
        setValid(ok);
        if (onValidate) onValidate(ok);
    }

    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Verify</label>
            <div className="flex items-center gap-2 mb-2">
                <div className="select-none px-3 py-2 bg-gray-100 border border-gray-300 rounded font-mono tracking-wider text-lg">
                    {code}
                </div>
                <button type="button" onClick={refresh} className="text-sm text-blue-600 hover:underline">Refresh</button>
            </div>

            <input
                name={name}
                value={value}
                onChange={handleChange}
                placeholder="Enter characters shown above"
                className={`w-full p-2 border ${valid ? 'border-green-500' : 'border-gray-300'} rounded`}
            />
            <div aria-live="polite" className="text-sm mt-1">
                {value ? (valid ? <span className="text-green-600">Captcha correct</span> : <span className="text-red-600">Captcha does not match</span>) : null}
            </div>
        </div>
    );
}