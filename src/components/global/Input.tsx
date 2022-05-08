import React from 'react';

interface props {
    placeholder: string;
    value: string | number;
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    customClass?: string;
    type?: string;
}

const Input = (props: props) => {
    return (
        <>
        <input
            type={props.type || 'text'}
            placeholder={props.placeholder}
            value={props.value}
            name={props.name}
            onChange={props.onChange}
            className={`${props.customClass}`}
        />
        </>
    );
};

export default Input;
