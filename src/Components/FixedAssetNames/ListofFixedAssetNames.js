import {useDispatch, useSelector} from "react-redux";
import {Get_ID_FA} from "../../stores/getDatas";
import React, {useEffect, useState} from "react";


function ListOfFixedAssetNames() {



    const datas = useSelector(state=>state.getDatas.nameofFA);

    const dispatch = useDispatch()
    const chosen = useSelector(state=>state.getDatas.ChosenID);
    
    const [FixedAssetsName,setFixedAssetsName] = useState(datas)

    useEffect(()=>{
        setFixedAssetsName(datas)
    },[datas])
    const SearchInputs = (e)=>{
        const column = e.target.name
        const searchValue =e.target.value.toLowerCase()
        if (column==="group") {
            setFixedAssetsName(datas.filter(data => data.group.toLowerCase().includes(searchValue)))
        }else if(column==="inventar_number"){
            setFixedAssetsName(datas.filter(data=>data.inventar_number.toLowerCase().includes(searchValue)))
        }else if(column==="producing_country"){
            setFixedAssetsName(datas.filter(data=>data.producing_country.toLowerCase().includes(searchValue)))
        }else if(column==="serial_number"){
            setFixedAssetsName(datas.filter(data=>data.serial_number.toLowerCase().includes(searchValue)))
        }else if(column==="unit"){
            setFixedAssetsName(datas.filter(data=>data.unit.toLowerCase().includes(searchValue)))
        }else if(column==="name"){
            setFixedAssetsName(datas.filter(data=>data.name.toLowerCase().includes(searchValue)))
        }
    }

    return (
        <div>
            <div className="headers flex">
                <input name="name" onChange={(e)=>SearchInputs(e)} className="flex-1 border-2 border-solid border-gray-400 outline-0 pl-1" placeholder="name" type="text"/>
                <input name="inventar_number" onChange={(e)=>SearchInputs(e)} className="flex-1 border-2 border-solid border-gray-400 outline-0 pl-1" placeholder="ID" type="text"/>
                <input name="group" onChange={(e)=>SearchInputs(e)} className="flex-1 border-2 border-solid border-gray-400 outline-0 pl-1" placeholder="Group" type="text"/>
                <input name="unit" onChange={(e)=>SearchInputs(e)} className="flex-1 border-2 border-solid border-gray-400 outline-0 pl-1" placeholder="Unit" type="text"/>
                <input name="producing_country" onChange={(e)=>SearchInputs(e)} className="flex-1 border-2 border-solid border-gray-400 outline-0 pl-1" placeholder="Producing country" type="text"/>
                <input name="serial_number" onChange={(e)=>SearchInputs(e)} className="flex-1 border-2 border-solid border-gray-400 outline-0 pl-1" placeholder="Serial Number" type="text"/>
            </div>
            <div className="list">
                {FixedAssetsName && FixedAssetsName.map((items,i)=>(
                    <div key={items.id} onClick={()=> {
                        dispatch(Get_ID_FA(items.id));

                    }} className={`${i%2===1 ? "flex bg-blue-100" : "flex"} text-sm ${chosen===items.id ? "text-red-600" : ""}`}>
                        <div className="names flex-1 border-2 border-solid border-gray-300 pl-0.5">{items.name}</div>
                        <div className="identical flex-1 border-2 border-solid border-gray-300 pl-0.5">{items.inventar_number}</div>
                        <div className="group flex-1 flex-1 border-2 border-solid border-gray-300 pl-0.5">{items.group}</div>
                        <div className="unit flex-1 flex-1 border-2 border-solid border-gray-300 pl-0.5">{items.unit}</div>
                        <div className="productCountry flex-1 flex-1 border-2 border-solid border-gray-300 pl-0.5">{items.producing_country}</div>
                        <div className="serialNumber flex-1 flex-1 border-2 border-solid border-gray-300 pl-0.5">{items.serial_number}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListOfFixedAssetNames;