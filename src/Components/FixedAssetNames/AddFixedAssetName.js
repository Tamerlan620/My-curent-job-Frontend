import React from 'react';
import EditFAName from './EditFAName'
import {TfiReload} from "react-icons/tfi";

import ListOfFixedAssetNames from './ListofFixedAssetNames';
import AddNewFAName from './AddNewFAName';






function AddFixedAssetName() {

    return (
        <>
        <div className="bg-neutral-200 flex">
            <AddNewFAName />
            <EditFAName />
            <div onClick={()=>window.location.reload()} className="text-6xl text-blue-400 p-2 w-12 ml-8 font-bold cursor-pointer"><TfiReload /></div>
        </div>
        <div className="List w-full"><ListOfFixedAssetNames /></div>
        </>
    );
}

export default AddFixedAssetName;