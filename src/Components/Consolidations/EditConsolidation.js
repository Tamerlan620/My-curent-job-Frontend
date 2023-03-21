import React, {useState} from 'react';
import {IoClose} from "react-icons/io5";
import {RiSave3Fill} from "react-icons/ri";
import {GiConfirmed} from "react-icons/gi";
import {BsFillPrinterFill} from "react-icons/bs";
import {FaEdit} from "react-icons/fa";
import Modal from 'react-modal';
import {useSelector} from "react-redux";
import {BsSquare} from "react-icons/bs";
import {TbSquaresDiagonal} from "react-icons/tb";
import axios from "axios";
import {MainContext, useContext} from "../../context";


function EditConsolidation() {


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
            border:'3px solid #000'
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
        modalIsOpen, setIsOpen,
        secondmodalIsOpen, setsecondsetIsOpen,
        ThirdmodalIsOpen, setThirdmodalIsOpen,
        currentIDdata, setcurrentIDdata,
        CheckApproveBeforeSend, setCheckApproveBeforeSend,
        photo, setPhoto,
        file, setFile,
        subsidiaries, setSubsidiaries,
        approved, setApproved,
        isDisabled,setDisabled,
        CheckBeforeSendforEditConsolidation,setCheckBeforeSendforEditConsolidation

    } = useContext(MainContext)




    const ChosenID = useSelector(state=>state.getDatas.ConsolidationChosenID);
    const Consolidation = useSelector(state=>state.getDatas.Consolidation);
    const Boughted_data = useSelector(state=>state.getDatas.FA_in_Overhead);



    function afterOpenModal() {subtitle.style.color = '#f00';}
    function closeModal() {setIsOpen(false);window.location.reload()}
    function closeModal2() {setsecondsetIsOpen(false);}
    function closeModal3() {setThirdmodalIsOpen(false);}


    function EditOverhead() {
        Consolidation.map(data=>{
            if (data.registrnumber===ChosenID){
                setPhoto(data.document_name)
                if (data.status ==="approved") setApproved(true)
                data.document_name &&  setDisabled(true)
            }
        })
        if (ChosenID.length>0){
            setIsOpen(true);
            const filteredID = Consolidation.filter(
                (FAid) => FAid.registrnumber === ChosenID
            );
            setcurrentIDdata(filteredID[0])
            const uniquesubsidiaries = [...new Map(Boughted_data.map(v => [v.subsidiary, v])).values()]
            setSubsidiaries(uniquesubsidiaries.map(item => item.subsidiary))
        }
    }


    const HandleAddFile = (e)=>{
        e.target.files[0] && setFile(e.target.files[0])
        setcurrentIDdata((prev)=>({...prev, document_name: e.target.files[0].name}))
    }


    const HandleSaveFile =async(e)=>{
        e.preventDefault()
        if (file){
            try {
                e.preventDefault()
                let formData = new FormData();
                formData.append("screenshot", file);
                await axios.post("https://my-curent-job-backend.onrender.com/consolidationPhoto", formData, {
                // await axios.post("http://localhost:4444/consolidationPhoto", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }).then((res) => {
                    console.log("Success ", res);
                }).catch(function (error) {
                    console.log("error",error);
                });
                setDisabled(true)
                e.preventDefault()

                await axios.put("https://my-curent-job-backend.onrender.com/consolidationPhoto", [currentIDdata.registrnumber,file.name])
                // await axios.put("http://localhost:4444/consolidationPhoto", [currentIDdata.registrnumber,file.name])
                e.preventDefault()

            }catch(err){
                console.log(err)
            }
        }
    }

    const FillInputs = (e)=>{
        setcurrentIDdata((prev)=>({...prev,[e.target.name]:e.target.value}))
    }



    const HandleSaveData =async(e)=>{
        if (currentIDdata.registrnumber && currentIDdata.currentdate && currentIDdata.department && currentIDdata.faidnumber && currentIDdata.fixed_asset && currentIDdata.handedtime && currentIDdata.subsidiary && currentIDdata.worker){
            try {
                await axios.put("https://my-curent-job-backend.onrender.com/consolidationdata",[
                // await axios.put("http://localhost:4444/consolidationdata",[
                    currentIDdata.registrnumber,
                    currentIDdata.currentdate,
                    currentIDdata.worker,
                    currentIDdata.department,
                    currentIDdata.handedtime,
                    currentIDdata.notes,
                ])
            }catch (err){
                console.log(err)
            }
        }else {
            setCheckBeforeSendforEditConsolidation(false);
            e.preventDefault()
        }
    }


    const HandleAproveData = async (e)=>{
        if(!approved){
            if(currentIDdata.currentdate.length<=0) {
                e.preventDefault()
                setCheckApproveBeforeSend("Date")
                setTimeout(function()  {
                    setCheckApproveBeforeSend(null)
                }, 1500);
                return
            }else if(currentIDdata.registrnumber.length<=0) {
                e.preventDefault()
                setCheckApproveBeforeSend("Registration number")
                setTimeout(function()  {
                    setCheckApproveBeforeSend(null)
                }, 1500);
                return
            }else if(currentIDdata.subsidiary.length<=0) {
                e.preventDefault()
                setCheckApproveBeforeSend("Subsidiary")
                setTimeout(function()  {
                    setCheckApproveBeforeSend(null)
                }, 1500);
                return
            }else if(!currentIDdata.department) {
                e.preventDefault()
                setCheckApproveBeforeSend("Department")
                setTimeout(function()  {
                    setCheckApproveBeforeSend(null)
                }, 1500);
                return
            }else if(!currentIDdata.faidnumber) {
                e.preventDefault()
                setCheckApproveBeforeSend("Inventer number")
                setTimeout(function()  {
                    setCheckApproveBeforeSend(null)
                }, 1500);
                return
            }else if(!currentIDdata.fixed_asset) {
                e.preventDefault()
                setCheckApproveBeforeSend("Fixed asset")
                setTimeout(function()  {
                    setCheckApproveBeforeSend(null)
                }, 1500);
                return
            }else if(!currentIDdata.handedtime) {
                e.preventDefault()
                setCheckApproveBeforeSend("Handed time")
                setTimeout(function()  {
                    setCheckApproveBeforeSend(null)
                }, 1500);
                return
            }else if(!currentIDdata.worker) {
                e.preventDefault()
                setCheckApproveBeforeSend("Worker")
                setTimeout(function()  {
                    setCheckApproveBeforeSend(null)
                }, 1500);
                return
            }else{

                try {

                    await axios.put(`https://my-curent-job-backend.onrender.com/consolidation`,
                    // await axios.put(`http://localhost:4444/consolidation`,
                        [currentIDdata]);

                }catch(err){
                    console.log(err)
                }
            }
        }else console.log("approved data")
    }

    const sameStyle = 'w-1/4 bg-gray-400 flex justify-center pt-1';
    const sameSyle2 = 'w-1/2 flex justify-center py-1 border-black border-2';
    const sameSyle3 = 'flex mb-3 m-auto align-middle justify-center';
    return (

        <div className="EditNewFA text-6xl text-blue-400 p-2 w-12">
            <button className='pb-2' onClick={EditOverhead}><FaEdit /></button>
            <Modal
                isOpen={modalIsOpen}
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
                <h1 className="font-bold mb-3" ref={(_subtitle) => (subtitle = _subtitle)}>Edit Consolidation</h1>
                <button className="text-xl border-2 border-black rounded-sm absolute right-1 top-1" onClick={closeModal}><IoClose /></button>
                <form className="w-full">
                    <div className="topside flex w-full relative">
                        <div className="leftside flex-1">
                            <div className="flex">
                                <div className="registrNumber flex mr-6 mb-3">
                                    <label className="bg-blue-100">Regitration No:</label>
                                    <div className="registrNumb border-b-2 border-b-black pl-1">{currentIDdata && currentIDdata.registrnumber}</div>
                                </div>
                                <div className="currentDate mb-3">
                                    <label className="bg-blue-100 my-2 p-1">Date:</label>
                                    <input name="currentdate" onChange={(e)=>FillInputs(e)} defaultValue={currentIDdata && currentIDdata.currentdate.slice(0,10)} className="border-2 border-black ml-1 pl-0.5" type='date'/>
                                </div>
                            </div>
                            <div className="mt-7 seller w-full pr-2 flex">
                                <label className="w-1/4 bg-blue-100 p-1">Subsidiary:</label>
                                <div className="flex justify-center border-b-2 border-b-black ml-1 w-3/4">
                                    {currentIDdata && currentIDdata.subsidiary}
                                </div>
                            </div>

                        </div>

                        <div className="rightside flex-1">
                            <div className="flex">
                                <div className="donloadFilediv mb-3 mr-3">
                                    <input  onChange={(e) => HandleAddFile(e)} id="downloadFile" className="mb-2 hidden" name='Download file'
                                            placeholder="Download file" type="file" accept="image/aces"/>
                                    <label className="downloadFileclass" htmlFor="downloadFile">{currentIDdata && currentIDdata.document_name ? "Change file" : "Download file"}</label>
                                </div>
                                <div className="showFilediv mr-3">
                                    <i className={`downloadFileclass1 ${isDisabled ? "bg-green-400" : "bg-red-600"}`} onClick={()=>setsecondsetIsOpen(true)}>Show file</i>
                                    <Modal
                                        isOpen={secondmodalIsOpen}
                                        onRequestClose={closeModal2}
                                        style={customStyles2}
                                        contentLabel="Example AddModal"
                                        ariaHideApp={false}
                                    >
                                        <div className="w-11/12 h-full p-2 m-auto">{
                                            !photo ?
                                                <center className="text-9xl">Sənəd yoxdur</center>
                                                :
                                                <img className="w-full h-full" src={"./uploads/" + photo} alt=""/>}
                                        </div>
                                        <button className="text-xl border-2 border-black rounded-sm absolute right-1 top-1" onClick={closeModal2}><IoClose /></button>
                                    </Modal>
                                </div>
                                <div className="saveFilediv mb-3">
                                    <input onClick={(e)=>HandleSaveFile(e)} id="SaveFile" className="mb-2 hidden relative bg-emerald-500"/>
                                    <label className="downloadFileclass" htmlFor="SaveFile">Save file</label><span className="absolute right-1/4"></span>
                                </div>

                            </div>


                            <div className="seller w-full mt-7 pr-2 flex">
                                <label className="bg-blue-100 p-1 w-1/4">Fixed Asset:</label>

                                    <div className="flex justify-center border-b-2 border-b-black ml-1 w-3/4">
                                        {currentIDdata && currentIDdata.faidnumber}
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="centerside w-full mt-8 overflow-auto flex">
                            <div className="leftsiteInputs flex-1">
                                <div className="handed font-bold text-red-600 w-3/4 flex justify-center bg-blue-300 m-auto mb-3">Handed</div>
                                <div className={sameSyle3}>
                                    <span className={sameStyle}>Handed time: </span>
                                    <div className={sameSyle2}>{currentIDdata && currentIDdata.currentdate.slice(0,10).split("-").reverse().join("-")}</div>
                                </div>
                                <div className={sameSyle3}>
                                    <span className={sameStyle}>Handed name: </span>
                                    <div className={sameSyle2}>{currentIDdata && currentIDdata.exworker}</div>
                                </div>
                                <div className={sameSyle3}>
                                    <span className={sameStyle}>Department</span>
                                    <div className={sameSyle2}>{currentIDdata && currentIDdata.exworkerdepartment}</div>
                                </div>
                            </div>
                            <div className="rightsiteInputs flex-1 flex-col">
                                <div className="tookOver font-bold text-green-600 w-3/4 flex justify-center bg-blue-300 m-auto mb-3">Took Over</div>
                                <div className={sameSyle3}>
                                    <label className={sameStyle} htmlFor="">Tooking over time</label>
                                    <input name="handedtime" onChange={(e)=>FillInputs(e)} defaultValue={currentIDdata && currentIDdata.handedtime} className={`${sameSyle2} pl-1`} type="date"/></div>
                                <div>
                                    <div className={sameSyle3}>
                                        <label className={sameStyle} htmlFor="persons">Tooking over name</label>
                                        <select name="worker" onChange={(e)=>FillInputs(e)} defaultValue={currentIDdata && currentIDdata.worker} className={sameSyle2} id="persons">
                                            <option disabled value=""></option>
                                            <option value="Əli Əliyev">Əli Əliyev</option>
                                            <option value="Əli Əliyev1">Əli Əliyev1</option>
                                            <option value="Əli Əliyev2">Əli Əliyev2</option>
                                        </select>
                                    </div>

                                </div>
                                <div  className={sameSyle3}>
                                    <label className={sameStyle} htmlFor="">Department</label>
                                    <input  name="department" onChange={(e)=>FillInputs(e)} defaultValue={currentIDdata && currentIDdata.department} className={`${sameSyle2} pl-1`} type="text" /></div>
                            </div>
                        </div>
                        <div className="notes mt-10 flex">
                            <label className={`${sameStyle} py-1`} htmlFor="">Notes</label>
                            <input name="notes" onChange={(e)=>FillInputs(e)} defaultValue={currentIDdata && currentIDdata.notes} className='w-3/4 border-2 border-black pl-1.5' type="text"/>
                        </div>
                    </div>

                    <div className="resultamount bg-gray-400 w-full h-14 absolute bottom-0.5 left-0 flex justify-between">
                        <div className="buttons ml-auto">
                            <button type="button" onClick={
                                ()=> {
                                    setThirdmodalIsOpen(true)
                                    // CheckRegistrNumber()
                                }
                            } className="text-blue-800 text-5xl pt-1 mr-3"><BsFillPrinterFill />
                            </button>
                            <Modal
                                isOpen={ThirdmodalIsOpen}
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
                                            <span> {currentIDdata && currentIDdata.registrnumber}</span>
                                        </div>


                                    </div>
                                    <div className="dateprint leading-relaxed">
                                        <span><b>Date : </b></span>
                                        <span> {currentIDdata && currentIDdata.currentdate.slice(0,10).split("-").reverse().join("-")}</span>
                                    </div>
                                    <div className="subsidiaryprint leading-loose">
                                        <span><b>Subsidiary: </b></span>
                                        <span> {currentIDdata && currentIDdata.subsidiary}</span>
                                    </div><br/>

                                    <div className="subsidiaryprint leading-loose">
                                        <div>
                                            <span><b>Fixed Asset: </b></span>
                                            <span> {currentIDdata && currentIDdata.fixed_asset}</span>
                                        </div>
                                        <div className="text-center">
                                            <div><b>Fixed Asset Inventer number: </b></div>
                                            <div> {currentIDdata && currentIDdata.faidnumber}</div>
                                        </div>

                                    </div>

                                    <div className="subsidiaryprint leading-loose">
                                        <span><b>Notes: </b></span>
                                        <span className={!currentIDdata ? "border-b-black border-solid border-2 block w-full" : ""}> <u>{currentIDdata && currentIDdata.notes}</u></span>
                                    </div>
                                    <div className="take_get flex mt-5">
                                        <div className="leftsiteInputs w-1/2 mt-2 pr-2">
                                            <div className="font-bold text-red-600 w-full flex justify-center bg-blue-300 m-auto mb-3">Handed</div>
                                            <div className="flex mb-5 m-auto align-middle justify-center">
                                                <span className="w-1/4 bg-gray-400 flex justify-center pt-1">Name Surname: </span>
                                                <span className="w-3/4 py-1 block border-b-black border-solid border-b-2">{currentIDdata && currentIDdata.exworker}</span>
                                            </div>
                                            <div className="flex mb-5 m-auto align-middle justify-center">
                                                <span className="w-1/4 bg-gray-400 flex justify-center pt-1">Department: </span>
                                                <span className="w-3/4 py-1 block border-b-black border-solid border-b-2">{currentIDdata && currentIDdata.exworkerdepartment}</span>
                                            </div>
                                            <div className="flex mb-5 m-auto align-middle justify-center">
                                                <span className="w-1/4 bg-gray-400 flex justify-center pt-1">Signature: </span>
                                                <span className="w-3/4 py-1 block border-b-black border-solid border-b-2"></span>
                                            </div>
                                        </div>
                                        <div className="leftsiteInputs w-1/2 mt-2 pl-2">
                                            <div className="font-bold text-red-600 w-full flex justify-center bg-blue-300 m-auto mb-3">Took over</div>
                                            <div className="flex mb-5 m-auto align-middle justify-center">
                                                <span className="w-1/4 bg-gray-400 flex justify-center pt-1">Name Surname:  </span>
                                                <span className="w-3/4 py-1 block border-b-black border-solid border-b-2 text-center">{currentIDdata && currentIDdata.worker}</span>
                                            </div>
                                            <div className="flex mb-5 m-auto align-middle justify-center">
                                                <span className="w-1/4 bg-gray-400 flex justify-center pt-1">Department: </span>
                                                <span className="w-3/4 py-1 block border-b-black border-solid border-b-2 text-center">{currentIDdata && currentIDdata.department}</span>
                                            </div>
                                            <div className="flex mb-5 m-auto align-middle justify-center">
                                                <span className="w-1/4 bg-gray-400 flex justify-center pt-1">Signature: </span>
                                                <span className="w-3/4 py-1 block border-b-black border-solid border-b-2"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                            <button onClick={(e)=>HandleAproveData(e)} className="text-red-600 text-5xl pt-1 mr-2"><GiConfirmed /></button>
                            <button onClick={(e)=>HandleSaveData(e)} className="text-green-600 text-5xl pt-1 mr-2"><RiSave3Fill /></button>
                        </div>
                    </div>
                    <div className={`${CheckBeforeSendforEditConsolidation ? 'hidden' : ''} w-1/3 h-32 bg-gray-300 text-red-500 text-2xl text-center pt-10 font-bold absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4`}>Empty cells</div>
                    <div className={`${CheckApproveBeforeSend===null ? 'hidden' : ''} w-1/3 h-32 bg-gray-300 text-red-500 text-2xl text-center pt-10 font-bold absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4`}>{CheckApproveBeforeSend} has not chosen</div>

                </form>
            </Modal>
        </div>

    );
}


export default EditConsolidation;