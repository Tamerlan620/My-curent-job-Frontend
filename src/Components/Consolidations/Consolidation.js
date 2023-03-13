import React from 'react';
import AddNewConsolidation from "./AddNewConsolidation";
import EditConsolidation from "./EditConsolidation";
import ConsolidationList from "./ConsolidationList";
import {TfiReload} from "react-icons/tfi";




function Consolidation() {
    return (
        <div>
            <>
                <div className="bg-neutral-200 flex">
                    <AddNewConsolidation />
                    <EditConsolidation />
                    <div onClick={()=>window.location.reload()} className="text-6xl text-blue-400 p-2 w-12 ml-8 font-bold cursor-pointer"><TfiReload /></div>
                </div>
                <div className="List w-full"><ConsolidationList /></div>
            </>
        </div>
    );
}

export default Consolidation;