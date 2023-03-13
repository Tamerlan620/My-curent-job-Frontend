import React, {useState,useEffect} from 'react';
import {IoAddCircleSharp, IoClose} from "react-icons/io5";
import Modal from "react-modal";
import {GiConfirmed} from "react-icons/gi";
import {RiSave3Fill} from "react-icons/ri";
import {BsFillPrinterFill, BsSquare} from "react-icons/bs";
import {TbSquaresDiagonal} from "react-icons/tb";
import {useDispatch, useSelector} from "react-redux";
import {MainContext,useContext} from "../../context";
import axios from "axios";


function AddNewConsolidation() {
    const [squares,setSquares]= useState(true);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: squares ? '90%' : '100%',
            height:squares ? '90%' : '100%',
            border:'3px solid #000',

        },
    };

    const customStyles2 = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width:'65%',
            height:'100%',
            border:'3px solid #000'
        },
    };

    const customStyles3 = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            height:'90%',
            border:'3px solid #000'
        },
    };
    let subtitle;


    const {
        modalIsOpenforAdddConsolidation, setIsOpenAdddConsolidation,
        secondmodalIsOpenAdddConsolidation, setsecondsetIsOpenAdddConsolidation,
        ThirdmodalIsOpenAdddConsolidation, setThirdmodalIsOpenAdddConsolidation,
        Registr_number,setRegistr_number,
        new_Date,setNew_Date,
        fileforAddConsolidation, setFileforAddConsolidation,
        subsidiariesAdddConsolidation, setSubsidiariesAdddConsolidation,
        selectedSubsidiarie, setSelectedSubsidiarie,
        selectedFA, setSelectedFA,
        dataForPrint, setdataForPrint,
        HandedTime, SetHandedTime,
        edittedworkerdata, setEdittedworkerdata
    } = useContext(MainContext)



    const Boughted_data = useSelector(state=>state.getDatas.FA_in_Overhead);
    const Consolidation = useSelector(state=>state.getDatas.Consolidation);
    const datas = useSelector(state=>state.getDatas.FA_from_subsidiary);


    function openModal() {
        const New_date = new Date();
        const new_year = New_date.getFullYear();
        const new_month = New_date.getMonth();
        const new_today = New_date.getDate();
        const new_hour = New_date.getHours();
        const new_minute = New_date.getMinutes();
        const new_second = New_date.getSeconds();
        const new_milli_second = New_date.getMilliseconds();
        const registrNum = `11${new_year}${new_month}${new_today}${new_hour}${new_minute}${new_second}${new_milli_second}99`;
        setRegistr_number(registrNum)
        const today = `${(new_year>10 ? new_year : "0"+new_year)}-${(new_month>10 ? new_month+1 : "0"+(new_month+1))}-${(new_today>9 ? new_today : "0"+new_today)}`
        setNew_Date(today)
        setIsOpenAdddConsolidation(true)
        const uniquesubsidiaries = [...new Map(Boughted_data.map(v => [v.subsidiary, v])).values()]
        setSubsidiariesAdddConsolidation(uniquesubsidiaries.map(item => item.subsidiary))

    }



    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpenAdddConsolidation(false);
        window.location.reload()
    }

    function closeModal2() {setsecondsetIsOpenAdddConsolidation(false);}
    function closeModal3() {setThirdmodalIsOpenAdddConsolidation(false);}


    const HandleGetWorkerData = (e)=>{
        datas.map(data=>{
            if(data.fixed_asset_id_number===e.target.value && data.subsidiary===selectedSubsidiarie){
                return setSelectedFA(data)
            }
        })
    }

    const CheckRegistrNumber = ()=>{
        if (Consolidation.length > 0){
            Consolidation.map(data=>{
                if (data.registrnumber===Registr_number){
                    setdataForPrint(data)
                }
            })
        }else{

        }
    }


    const HandleSaveData =async(e)=>{
        if (Registr_number && new_Date && selectedSubsidiarie && selectedFA && edittedworkerdata && HandedTime){
            try {
                if (fileforAddConsolidation){
                    let formData = new FormData();
                    formData.append("screenshot", fileforAddConsolidation);
                    await axios.post("http://localhost:4444/consolidationPhoto", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }).then((res) => {
                        console.log("Success ", res);
                    });
                }
                await axios.post("http://localhost:4444/consolidation",[
                    Registr_number,
                    new_Date,
                    selectedSubsidiarie,
                    selectedFA,
                    edittedworkerdata,
                    fileforAddConsolidation ? fileforAddConsolidation.name : "",
                    HandedTime
                ])
            }catch (err){
                console.log(err)
            }
        }else {
            e.preventDefault();
        }
    }




const sameStyle = 'w-1/4 bg-gray-400 flex justify-center pt-1';
const sameSyle2 = 'w-1/2 flex justify-center py-1 border-black border-2';
const sameSyle3 = 'flex mb-3 m-auto align-middle justify-center';
    return (

        <div className="AddNewFA text-6xl text-blue-400 p-2 w-12 mr-8">
            <button onClick={openModal}><IoAddCircleSharp /></button>
            <Modal
                isOpen={modalIsOpenforAdddConsolidation}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Example AddModal"
            >
                <div onDoubleClick={()=>setSquares(!squares)} className="windowsTop">
                    <button className="text-xl border-2 border-black rounded-sm absolute right-1 top-1 bg-red-400" onClick={closeModal}><IoClose /></button>
                    <button className="text-xl border-2 border-black rounded-sm absolute right-9 top-1 bg-red-400" onClick={()=>setSquares(!squares)}>{
                        squares ? <BsSquare/> : <TbSquaresDiagonal/>
                    }</button>
                </div>
                <h1 className="font-bold mb-3" ref={(_subtitle) => (subtitle = _subtitle)}>Consolidation</h1>
                <button className="text-xl border-2 border-black rounded-sm absolute right-1 top-1" onClick={closeModal}><IoClose /></button>
                <form className="w-full pl-2">
                    <div className="topside flex w-full relative">
                        <div className="leftside flex-1">
                            <div className="flex">
                                <div className="registrNumber flex mr-6 mb-3">
                                    <label className="bg-blue-100">Regitration No:</label>
                                    <div className="registrNumb border-b-2 border-b-black pl-1">{Registr_number}</div>
                                </div>
                                <div className="currentDate mb-3">
                                    <label className="bg-blue-100 my-2 p-1">Date:</label>
                                    <input onChange={(e)=>SetHandedTime(e.target.value)} defaultValue={HandedTime}  className="border-2 border-black ml-1 pl-0.5" type='date'/>
                                </div>
                            </div>
                            <div className="mt-5">
                                <label className="w-1/4 bg-blue-100 mt-2 p-1">Subsidiary:</label>
                                <select onChange={(e)=> {
                                    setSelectedSubsidiarie(e.target.value)
                                    setSelectedFA(null)
                                }} defaultValue="" placeholder="Enter Group" className="border-b-2 border-b-black ml-1 w-3/4">
                                    <option disabled value=""></option>
                                    {subsidiariesAdddConsolidation && subsidiariesAdddConsolidation.map((data,i)=>(
                                        <option key={i} value={data}>{data}</option>
                                    ))
                                    }
                                </select>
                            </div>

                        </div>

                        <div className="rightside flex-1">
                            <div className="flex">
                                <div className="donloadFilediv mb-3">
                                    <input onChange={(e)=> e.target.files[0] && setFileforAddConsolidation(e.target.files[0])} id="downloadFile" className="mb-2 hidden relative" name='screenshot' placeholder="Download file" type="file" accept="image/aces" />
                                    <label className="downloadFileclass" htmlFor="downloadFile">Download file</label>
                                </div>
                                <div className="showFilediv mb-3 ml-3">
                                    <i className="downloadFileclass" onClick={()=>setsecondsetIsOpenAdddConsolidation(true)}>Show file</i>
                                    <Modal
                                        isOpen={secondmodalIsOpenAdddConsolidation}
                                        onRequestClose={closeModal2}
                                        style={customStyles2}
                                        contentLabel="Example AddModal"
                                        ariaHideApp={false}
                                    >
                                        <div className="w-11/12 m-auto">
                                            <img className="w-full h-3/4" src={fileforAddConsolidation ? "./uploads/"+ fileforAddConsolidation.name : "file.jpg"} alt=""/>
                                        </div>
                                        <button className="text-xl border-2 border-black rounded-sm absolute right-1 top-1" onClick={closeModal2}><IoClose /></button>
                                    </Modal>
                                </div>

                            </div>


                            <div className="seller w-full mt-3 pr-2 flex">
                                <label className="bg-blue-100 mt-2 p-1 w-1/4">List of Fixed Assets:</label>
                                <select onChange={(e)=>HandleGetWorkerData(e)} defaultValue="" placeholder="Enter Group" className="border-b-2 border-b-black ml-1 w-3/4">
                                    <option value=""></option>
                                    {selectedSubsidiarie && datas.map(data=>{if(data.subsidiary===selectedSubsidiarie){

                                    return <option key={data.id} value={data.fixed_asset_id_number}>{data.fixed_asset_id_number+"-"+data.fixed_asset}</option>
                                    }
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="pr-2">
                        <div className="centerside w-full mt-8 overflow-auto flex">
                            <div className="leftsiteInputs flex-1">
                               <div className="handed font-bold text-red-600 w-3/4 flex justify-center bg-blue-300 m-auto mb-3">Handed</div>
                                <div className={sameSyle3}>
                                    <span className={sameStyle}>Handed time: </span>
                                    <div className={sameSyle2}>{selectedFA && selectedFA.handed_time }</div>
                                </div>
                                <div className={sameSyle3}>
                                    <span className={sameStyle}>Handed name: </span>
                                    <div className={sameSyle2}>{selectedFA && selectedFA.workers }</div>
                                </div>
                                <div className={sameSyle3}>
                                    <span className={sameStyle}>Department</span>
                                    <div className={sameSyle2}>{selectedFA && selectedFA.department}</div>
                                </div>
                            </div>
                            <div className="rightsiteInputs flex-1 flex-col">
                                  <div className="tookOver font-bold text-green-600 w-3/4 flex justify-center bg-blue-300 m-auto mb-3">Took Over</div>
                                  <div className={sameSyle3}>
                                      <label className={sameStyle} htmlFor="">Tooking over time</label>
                                      <input className={`${sameSyle2} pl-1`}
                                             onChange={(e)=> {
                                                  setEdittedworkerdata({...edittedworkerdata,date:e.target.value})
                                             }}
                                             type="date"/></div>
                                  <div>
                                      <div className={sameSyle3}>
                                          <label className={sameStyle} htmlFor="persons">Tooking over name</label>
                                          <select onChange={(e)=>setEdittedworkerdata({...edittedworkerdata,workers:e.target.value})} className={sameSyle2} name="persons" id="persons">
                                              <option defaultValue disabled value=""></option>
                                              <option value="Əli Əliyev">Əli Əliyev</option>
                                              <option value="Əli Əliyev1">Əli Əliyev1</option>
                                              <option value="Əli Əliyev2">Əli Əliyev2</option>
                                          </select>
                                      </div>

                                  </div>
                                  <div  className={sameSyle3}>
                                      <label className={sameStyle} htmlFor="">Department</label>
                                      <input onChange={(e)=>setEdittedworkerdata({...edittedworkerdata,department:e.target.value})} className={`${sameSyle2} pl-1`} type="text" /></div>
                            </div>
                        </div>
                        <div className="notes mt-10 flex">
                            <label className={`${sameStyle} py-1`} htmlFor="">Notes</label>
                            <input onChange={(e)=>setEdittedworkerdata({...edittedworkerdata,notes:e.target.value})} className='w-3/4 border-2 border-black pl-1.5' type="text"/>
                        </div>
                    </div>

                    <div className="resultamount bg-gray-400 w-full h-14 absolute bottom-0.5 left-0 flex justify-between">
                        <div className="buttons ml-auto">
                            <button type="button" onClick={
                                ()=> {
                                    setThirdmodalIsOpenAdddConsolidation(true)
                                    CheckRegistrNumber()
                                }
                            } className="text-blue-800 text-5xl pt-1 mr-3"><BsFillPrinterFill />
                            </button>
                            <Modal
                                isOpen={ThirdmodalIsOpenAdddConsolidation}
                                onRequestClose={closeModal3}
                                style={customStyles3}
                                contentLabel="Example AddModal"
                                ariaHideApp={false}
                            >
                                <button className="text-xl border-2 border-black rounded-sm absolute right-1 top-1" onClick={closeModal3}><IoClose /></button>
                                <div className="w-full h-full p-4">
                                    <div className="dateprint leading-relaxed">
                                        <div>
                                            <span><b>Regist ID : </b></span>
                                            <span> {dataForPrint && dataForPrint.registrnumber}</span>
                                        </div>


                                    </div>
                                    <div className="dateprint leading-relaxed">
                                        <span><b>Date : </b></span>
                                        <span> {dataForPrint && dataForPrint.currentdate.slice(0,10).split("-").reverse().join("-")}</span>
                                    </div>
                                    <div className="subsidiaryprint leading-loose">
                                        <span><b>Subsidiary: </b></span>
                                        <span> {dataForPrint && dataForPrint.subsidiary}</span>
                                    </div><br/>

                                    <div className="subsidiaryprint leading-loose">
                                        <div>
                                            <span><b>Fixed Asset: </b></span>
                                            <span> {dataForPrint && dataForPrint.fixed_asset}</span>
                                        </div>
                                        <div className="text-center">
                                            <div><b>Fixed Asset Inventer number: </b></div>
                                            <div> {dataForPrint && dataForPrint.faidnumber}</div>
                                        </div>

                                    </div>

                                    <div className="subsidiaryprint leading-loose">
                                        <span><b>Notes: </b></span>
                                        <span className={!dataForPrint ? "border-b-black border-solid border-2 block w-full" : ""}> <u>{dataForPrint && dataForPrint.notes}</u></span>
                                    </div>
                                    <div className="take_get flex mt-5">
                                        <div className="leftsiteInputs w-1/2 mt-2 pr-2">
                                            <div className="font-bold text-red-600 w-full flex justify-center bg-blue-300 m-auto mb-3">Handed</div>
                                            <div className="flex mb-5 m-auto align-middle justify-center">
                                                <span className="w-1/4 bg-gray-400 flex justify-center pt-1">Name Surname: </span>
                                                <span className="w-3/4 py-1 block border-b-black border-solid border-b-2">{dataForPrint && dataForPrint.exworker}</span>
                                            </div>
                                            <div className="flex mb-5 m-auto align-middle justify-center">
                                                <span className="w-1/4 bg-gray-400 flex justify-center pt-1">Department: </span>
                                                <span className="w-3/4 py-1 block border-b-black border-solid border-b-2">{dataForPrint && dataForPrint.exworkerdepartment}</span>
                                            </div>
                                            <div className="flex mb-5 m-auto align-middle justify-center">
                                                <span className="w-1/4 bg-gray-400 flex justify-center pt-1">Signature: </span>
                                                <span className="w-3/4 py-1 block border-b-black border-solid border-b-2"></span>
                                            </div>
                                        </div>
                                        <div className="leftsiteInputs w-1/2 mt-2 pl-2">
                                            <div className="font-bold text-red-600 w-full flex justify-center bg-blue-300 m-auto mb-3">Took over</div>
                                            <div className="flex mb-5 m-auto align-middle justify-center">
                                                <span className="w-1/4 bg-gray-400 flex justify-center pt-1">Name Surname: </span>
                                                <span className="w-3/4 py-1 block border-b-black border-solid border-b-2"></span>
                                            </div>
                                            <div className="flex mb-5 m-auto align-middle justify-center">
                                                <span className="w-1/4 bg-gray-400 flex justify-center pt-1">Department: </span>
                                                <span className="w-3/4 py-1 block border-b-black border-solid border-b-2"></span>
                                            </div>
                                            <div className="flex mb-5 m-auto align-middle justify-center">
                                                <span className="w-1/4 bg-gray-400 flex justify-center pt-1">Signature: </span>
                                                <span className="w-3/4 py-1 block border-b-black border-solid border-b-2"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                            <button className="text-red-600 text-5xl pt-1 mr-2"><GiConfirmed /></button>
                            <button onClick={(e)=> {
                                HandleSaveData(e)

                            }
                            } className="text-green-600 text-5xl pt-1 mr-2"><RiSave3Fill /></button>
                        </div>
                    </div>

                </form>
            </Modal>
        </div>

    );
}

export default AddNewConsolidation;