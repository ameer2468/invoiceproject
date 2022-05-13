import React from 'react';
import {ClimbingBoxLoader, PulseLoader, SyncLoader} from "react-spinners";

const loadingTypes = {
    ClimbingBoxLoader: 'ClimbingBoxLoader',
    SyncLoader: 'SyncLoader',
    PulseLoader: 'PulseLoader'
}

interface props {
    color?: string;
    size?: number;
    style: keyof typeof loadingTypes
}

const Loading = ({color, size, style}: props) => {

    const LoadingComp = () => {
        switch (style) {
            case "ClimbingBoxLoader":
                return <ClimbingBoxLoader color={color ? color : 'white'} size={size ? size : 8}/>
            case "SyncLoader":
                return <SyncLoader color={color ? color : 'white'} size={size ? size : 8}/>
            case "PulseLoader":
                return <PulseLoader color={color ? color : 'white'} size={size ? size : 8}/>
        }
    }

    return (
       <>
           {LoadingComp()}
       </>
    );
};

export default Loading;
