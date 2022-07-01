import React, { ChangeEvent } from "react";
import CharacterLimit from "./CharacterLimit";

interface props {
  placeholder: string;
  value: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  customClass?: string;
  limitValue?: number;
}

const TextArea = (props: props) => {
  return (
    <div className="textAreaWrap">
      <textarea
        placeholder={props.placeholder}
        value={props.value}
        maxLength={props.limitValue}
        name={props.name}
        onChange={props.onChange}
        className={`${props.customClass}`}
      />
      <CharacterLimit textValue={props.value.length} limitValue={600} />
    </div>
  );
};

export default TextArea;
