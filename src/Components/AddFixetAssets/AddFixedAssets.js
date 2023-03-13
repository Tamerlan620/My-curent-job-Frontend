import React from 'react';
import EditFA from "../AddFixetAssets/EditFA.js";
import AddNewFA from "../AddFixetAssets/AddNewFA";
import {TfiReload} from "react-icons/tfi";
import ListOfAddedFA from "./ListOfAddedFA";

function AddFixedAssets() {
    return (
        <div>
            <>
                <div className="bg-neutral-200 flex">
                    <AddNewFA />
                    <EditFA />
                    <div onClick={()=>window.location.reload()} className="text-6xl text-blue-400 p-2 w-12 ml-8 font-bold cursor-pointer"><TfiReload /></div>
                </div>
                <div className="List w-full"><ListOfAddedFA /></div>
            </>
        </div>
    );
}

export default AddFixedAssets;