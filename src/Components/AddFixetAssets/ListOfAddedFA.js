import {useSelector,useDispatch} from "react-redux";
import {Get_ID_Overhead} from "../../stores/getDatas";
import {useEffect, useState} from "react";




function ListOfAddedFA() {
    const [FixedAssets,SetFixedAssets] = useState()
    const mystle = 'flex-1 border-2 border-solid border-gray-400 outline-0 pl-1'
    const datas = useSelector(state=>state.getDatas.AddedFA);
    const dispatch = useDispatch()
    const chosen = useSelector(state=>state.getDatas.OverheadChosenID);

    useEffect(()=>{
        SetFixedAssets(datas)
    },[datas])

    const SearchInputs = (e)=>{
        const column = e.target.name
        const searchValue =e.target.value.toLowerCase()
        if (column==="status") {
            SetFixedAssets(datas.filter(data => data.status.toLowerCase().includes(searchValue)))
        }else if(column==="registrid"){
            SetFixedAssets(datas.filter(data=>data.registrid.toLowerCase().includes(searchValue)))
        }else if(column==="subsidiary"){
            SetFixedAssets(datas.filter(data=>data.subsidiary.toLowerCase().includes(searchValue)))
        }else if(column==="currentdate"){
            SetFixedAssets(datas.filter(data=>data.currentdate.toLowerCase().includes(searchValue)))
        }else if(column==="seller"){
            SetFixedAssets(datas.filter(data=>data.seller.toLowerCase().includes(searchValue)))
        }else if(column==="amounts"){
            SetFixedAssets(datas.filter(data=>data.amount.toString().includes(searchValue)))
        }else if(column==="document"){
            SetFixedAssets(datas.filter(data=>data.document.toLowerCase().includes(searchValue)))
        }
    }
    return (
        <div className='someClass w-full'>
            <div className="headers flex w-full">
                <input name="status" onChange={(e)=>SearchInputs(e)} className={mystle} placeholder="status" type="text"/>
                <input name="registrid" onChange={(e)=>SearchInputs(e)} className={mystle} placeholder="ID" type="text"/>
                <input name="currentdate" onChange={(e)=>SearchInputs(e)} className={mystle} placeholder="Date" type="text"/>
                <input name="subsidiary" onChange={(e)=>SearchInputs(e)} className={mystle} placeholder="Subsidiary" type="text"/>
                <input name="seller" onChange={(e)=>SearchInputs(e)} className={mystle} placeholder="Seller" type="text"/>
                <input name="amounts" onChange={(e)=>SearchInputs(e)} className={mystle} placeholder="Amount" type="text"/>
                <input name="document" onChange={(e)=>SearchInputs(e)} className={mystle} placeholder="Documents" type="text"/>
            </div>
            <div className="list">
                {FixedAssets && FixedAssets.map((items,i)=>(
                    <div key={items.id} onClick={()=> {
                        dispatch(Get_ID_Overhead(items.registrid))

                    }} className={`${i%2===1 ? "flex bg-blue-100" : "flex"} ${items.status === "written" ? "checkDocument" : ""} text-sm ${chosen===items.registrid ? "text-red-600" : ""}`}>
                        <div className="status flex-1 border-2 border-solid border-gray-300 pl-0.5">{items.status}</div>
                        <div className="identical flex-1 border-2 border-solid border-gray-300 pl-0.5">{items.registrid}</div>
                        <div className="names flex-1 border-2 border-solid border-gray-300 pl-0.5">{items.currentdate.slice(0,10).split("-").reverse().join("-")}</div>
                        <div className="group flex-1 flex-1 border-2 border-solid border-gray-300 pl-0.5">{items.subsidiary}</div>
                        <div className="unit flex-1 flex-1 border-2 border-solid border-gray-300 pl-0.5">{items.seller}</div>
                        <div className="productCountry flex-1 flex-1 border-2 border-solid border-gray-300 pl-0.5">{items.amount}</div>
                        <div className="serialNumber flex-1 flex-1 border-2 border-solid border-gray-300 pl-0.5">{items.document}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListOfAddedFA;