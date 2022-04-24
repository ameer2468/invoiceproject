import React from 'react';
import SyncLoader from "react-spinners/SyncLoader";

interface props {
    color?: string;
    size?: number;
}

const Loading = ({color, size}: props) => {
    return (
        <SyncLoader color={color ? color : 'white'} size={size ? size : 8}/>
    );
};

export default Loading;
