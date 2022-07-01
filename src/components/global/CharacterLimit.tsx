import React, { useEffect, useState } from "react";

interface props {
  textValue: number;
  limitValue: number;
}

const CharacterLimit = ({ textValue, limitValue }: props) => {
  return (
    <p className="charLimit">
      Characters: {textValue}/{limitValue}
    </p>
  );
};

export default CharacterLimit;
