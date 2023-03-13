import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Get_ID_Consolidation} from "../../stores/getDatas";


function ConsolidationList() {



    const mystle1 = 'border-2 border-solid border-gray-400 outline-0 pl-0.5';
    const dispatch = useDispatch()
    const chosen = useSelector(state=>state.getDatas.ConsolidationChosenID);
    const datas = useSelector(state=>state.getDatas.Consolidation);
    const [ConsolidationData,setConsolidationData] = useState(datas)

    useEffect(()=>{
        setConsolidationData(datas)
    },[datas])

    const SearchInputs = (e)=>{
        const column = e.target.name
        const searchValue =e.target.value.toLowerCase()
        if (column==="registrnumber") {
            setConsolidationData(datas.filter(data => data.registrnumber.toLowerCase().includes(searchValue)))
        }else if(column==="currentdate"){
            setConsolidationData(datas.filter(data=>data.currentdate.toLowerCase().includes(searchValue)))
        }else if(column==="subsidiary"){
            setConsolidationData(datas.filter(data=>data.subsidiary.toLowerCase().includes(searchValue)))
        }else if(column==="faidnumber"){
            setConsolidationData(datas.filter(data=>data.faidnumber.toLowerCase().includes(searchValue)))
        }else if(column==="notes"){
            setConsolidationData(datas.filter(data=>data.notes.toLowerCase().includes(searchValue)))
        }else if(column==="worker"){
            setConsolidationData(datas.filter(data=>data.worker.toLowerCase().includes(searchValue)))
        }else if(column==="department"){
            setConsolidationData(datas.filter(data=>data.department.toLowerCase().includes(searchValue)))
        }else if(column==="document"){
            setConsolidationData(datas.filter(data=>data.document.toLowerCase().includes(searchValue)))
        }else if(column==="fixed_asset"){
            setConsolidationData(datas.filter(data=>data.fixed_asset.toLowerCase().includes(searchValue)))
        }
    }


    return (
        <div className='w-full'>
            <div className="w-full flex">
                <div className="w-1/12">
                    <input name="registrnumber" onChange={(e)=>SearchInputs(e)} className={`${mystle1} w-full`} placeholder="Registration No" type="text"/>
                </div>
                <div className="w-1/12">
                    <input name="currentdate" onChange={(e)=>SearchInputs(e)} className={`${mystle1} w-full`} placeholder="Date" type="text"/>
                </div>
                <div className="w-1/12">
                    <input name="subsidiary" onChange={(e)=>SearchInputs(e)} className={`${mystle1} w-full`} placeholder="Subsidiary" type="text"/>
                </div>
                <div className="w-2/12">
                    <input name="fixed_asset" onChange={(e)=>SearchInputs(e)} className={`${mystle1} w-full`} placeholder="Fixed Asset" type="text"/>
                </div>
                <div className="w-1/12">
                    <input name="faidnumber" onChange={(e)=>SearchInputs(e)} className={`${mystle1} w-full`} placeholder="FA ID number" type="text"/>
                </div>
                <div className="w-2/12">
                    <input name="notes" onChange={(e)=>SearchInputs(e)} className={`${mystle1} w-full`} placeholder="Notes" type="text"/>
                </div>
                <div className="w-2/12">
                    <input name="worker" onChange={(e)=>SearchInputs(e)} className={`${mystle1} w-full`}  placeholder="Workers" type="text"/>

                </div>
                <div className="w-1/12">
                    <input name="department" onChange={(e)=>SearchInputs(e)} className={`${mystle1} w-full`} placeholder="Department" type="text"/>
                </div>
                <div className="w-1/12">
                    <input name="document" onChange={(e)=>SearchInputs(e)} className={`${mystle1} w-full`} placeholder="Documents" type="text"/>
                </div>
            </div>
            <div className="list">
                {ConsolidationData && ConsolidationData.map((items,i)=>(
                    <div key={items.id} onClick={()=> {
                        dispatch(Get_ID_Consolidation(items.registrnumber))

                    }} className={`${i%2===1 ? "flex bg-blue-100" : "flex"}  ${items.status === "written" ? "checkDocument" : ""} text-sm ${chosen===items.registrnumber ? "text-red-600" : ""}`}>
                        <div className="identical border-2 border-solid border-gray-300 pl-0.5 w-1/12 overflow-hidden">{items.registrnumber}</div>
                        <div className="names border-2 border-solid border-gray-300 pl-0.5 w-1/12">{items.currentdate}</div>
                        <div className="group border-2 border-solid border-gray-300 pl-0.5 w-1/12">{items.subsidiary}</div>
                        <div className="status border-2 border-solid border-gray-300 pl-0.5 w-2/12">{items.fixed_asset}</div>
                        <div className="unit border-2 border-solid border-gray-300 pl-0.5 w-1/12">{items.faidnumber}</div>
                        <div className="productCountry border-2 border-solid border-gray-300 pl-0.5 w-2/12">{items.notes}</div>
                        <div className="serialNumber border-2 border-solid border-gray-300 pl-0.5 w-2/12">{items.worker}</div>
                        <div className="serialNumber border-2 border-solid border-gray-300 pl-0.5 w-1/12">{items.department}</div>
                        <div className="w serialNumber border-2 border-solid border-gray-300 pl-0.5 w-1/12">{items.document}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ConsolidationList;