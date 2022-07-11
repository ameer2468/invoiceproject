import React from 'react';

interface props {
  placeholder: string;
  value: string | number;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  customClass?: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  type?: string;
}

const Input = (props: props) => {
  return (
    <>
      <input
        maxLength={props.maxLength}
        minLength={props.minLength}
        type={props.type || 'text'}
        placeholder={props.placeholder}
        value={props.value}
        required={props.required}
        name={props.name}
        onChange={props.onChange}
        className={`${props.customClass}`}
      />
    </>
  );
};

export default Input;
