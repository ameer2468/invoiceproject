import React, {ChangeEvent} from 'react';

interface props {
    placeholder: string;
    value: string;
    name: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    customClass?: string;
}

const TextArea = (props: props) => {
    return (
        <>
            <textarea
                placeholder={props.placeholder}
                value={props.value}
                name={props.name}
                onChange={props.onChange}
                className={`${props.customClass}`}
            />
        </>
    );
};

export default TextArea;
