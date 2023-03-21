import React, {useEffect, useState} from 'react';
import axios from "axios";
import {getConsolidation} from "../../stores/getDatas";
import {useSelector} from "react-redux";
import {MainContext, useContext} from "../../context";

function Report() {
    const mystle1 = 'border-2 border-solid border-gray-400 outline-0 pl-0.5 w-full';
    const {
        selectSubsidiary,setSelectSubsidiary,
        report,setReport,
        subsidiariesforReport, setSubsidiariesReport
    } = useContext(MainContext)


    const Boughted_data = useSelector(state=>state.getDatas.FA_in_Overhead);


    useEffect(()=>{
        const uniquesubsidiaries = [...new Map(Boughted_data.map(v => [v.subsidiary, v])).values()]
        setSubsidiariesReport(uniquesubsidiaries.map(item => item.subsidiary))
    },[])

    const GetReport = ()=>{
        if (selectSubsidiary){
            const getConsalidation = async()=>{
                console.log(selectSubsidiary)
                try {
                    const {data} = await axios.get(`https://my-curent-job-backend.onrender.com/report/${selectSubsidiary}`);
                    // const {data} = await axios.get(`http://localhost:4444/report/${selectSubsidiary}`);
                    console.log(data)
                    setReport(data)

                }catch(err){
                    await console.log(err)
                }

            }
            getConsalidation()
        }
    }


    return (
        <div className="report mt-6 ">
            <div className="upside ">
                <div className=" flex justify-center">
                    <select onChange={(e)=> {
                        setSelectSubsidiary(e.target.value)
                    }} defaultValue="" placeholder="Enter Group" className="w-1/6 py-1 border-black border-2 mr-3">
                        <option disabled value=""></option>
                        {subsidiariesforReport && subsidiariesforReport.map((data,i)=>(
                            <option key={i} value={data}>{data}</option>
                        ))
                        }
                    </select>

                    <button onClick={GetReport} className="text-gray-500 border-2 border-blue-700 px-3 bg-blue-50 rounded">Göstər</button>
                </div>
            </div>
            <div className="upside mt-3">
                <div className=" flex">
                    <div className="w-1/12">
                        <input className={mystle1} placeholder="Group" type="text"/>
                    </div>
                    <div className="w-2/12">
                        <input className={mystle1} placeholder="Fixed Asset" type="text"/>
                    </div>
                    <div className="w-1/12">
                        <input className={mystle1} placeholder="FA ID number" type="text"/>
                    </div>
                    <div className="w-1/12">
                        <input className={mystle1} placeholder="Quantity" type="text"/>
                    </div>
                    <div className="w-1/12">
                        <input className={mystle1} placeholder="Subsidiary" type="text"/>
                    </div>
                    <div className="w-2/12">
                        <input className={mystle1} placeholder="Workers" type="text"/>
                    </div>
                    <div className="w-1/12">
                        <input className={mystle1} placeholder="Department" type="text"/>
                    </div>
                    <div className="w-3/12">
                        <input className={mystle1} placeholder="serial_number" type="text"/>
                    </div>
                </div>
            </div>
            <div className="reportside">
                {report && report.map((items,i)=>(
                    <div key={items.id} className={`${i%2===1 ? "flex bg-blue-100" : "flex"} text-sm`}>
                        <div className="identical border-2 border-solid border-gray-300 pl-0.5 w-1/12">{items.group}</div>
                        <div className="names border-2 border-solid border-gray-300 pl-0.5 w-2/12">{items.fixed_asset}</div>
                        <div className="group border-2 border-solid border-gray-300 pl-0.5 w-1/12">{items.fixed_asset_id_number}</div>
                        <div className="status border-2 border-solid border-gray-300 pl-0.5 w-1/12">{items.quantity}</div>
                        <div className="unit border-2 border-solid border-gray-300 pl-0.5 w-1/12">{items.subsidiary}</div>
                        <div className="productCountry border-2 border-solid border-gray-300 pl-0.5 w-2/12">{items.handed_status==="yes" ? items.workers : ""}</div>
                        <div className="serialNumber border-2 border-solid border-gray-300 pl-0.5 w-1/12">{items.handed_status==="yes" ? items.department : ""}</div>
                        <div className="serialNumber border-2 border-solid border-gray-300 pl-0.5 w-3/12">{items.serial_numbers}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Report;