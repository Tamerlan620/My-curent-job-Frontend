import React, {useState} from 'react';
import {IoAddCircleSharp,IoClose,IoRemoveCircleSharp} from "react-icons/io5";
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




function EditFa() {

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

    let subtitle1;

    const {
        modalIsOpenforEditNewFA, setIsOpenforEditNewFA,
        secondmodalIsOpenforEditNewFA, setsecondsetIsOpenforEditNewFA,
        ThirdmodalIsOpenforEditNewFA, setThirdmodalIsOpenforEditNewFA,
        FAdatasforEditNewFA, setFadatasforEditNewFA,
        currentIDdataforEditNewFA, setcurrentIDdataforEditNewFA,
        CheckBeforeSend, setCheckBeforeSend,
        CheckApproveBeforeSendforEditNewFA, setCheckApproveBeforeSendforEditNewFA,
        photoforEditNewFA, setPhotoforEditNewFA,
        fileforEditNewFA, setFileforEditNewFA,
        approvedforEditNewFA, setApprovedforEditNewFA,
        isDisabledforEditNewFA,setDisabledforEditNewFA
    } = useContext(MainContext)


    function afterOpenModal() {subtitle1.style.color = '#f00';}
    function closeModal() {setIsOpenforEditNewFA(false);window.location.reload()}
    function closeModal2() {setsecondsetIsOpenforEditNewFA(false);}
    function closeModal3() {setThirdmodalIsOpenforEditNewFA(false);}


    const EditID = useSelector(state=>state.getDatas.OverheadChosenID);
    const AddedFA = useSelector(state=>state.getDatas.AddedFA);
    const Boughted_data = useSelector(state=>state.getDatas.FA_in_Overhead);
    const namesofFA = useSelector(state=>state.getDatas.nameofFA);
    const currentState = useSelector((state)=>state.getDatas.getSubsidiary)

    function EditOverhead() {
        AddedFA.map(data=>{
            if (data.registrid===EditID){
                setPhotoforEditNewFA(data.document_name)
                if (data.status==="approved") setApprovedforEditNewFA(true)
                data.document_name &&  setDisabledforEditNewFA(true)
            }
        })
        if (EditID.length>0){
            setIsOpenforEditNewFA(true);

            const filteredID = AddedFA.filter(

                (FAid) => FAid.registrid === EditID
            );
            setcurrentIDdataforEditNewFA(filteredID[0])

            Boughted_data.map(data=>{
                if (EditID===data.regitr_numb) {
                    return setFadatasforEditNewFA(current =>[...current,data])
                }
            })
        }
    }

    const HandleAddFile = (e)=>{
        e.target.files[0] && setFileforEditNewFA(e.target.files[0])
        e.target.files[0] && setcurrentIDdataforEditNewFA((prev)=>({...prev, document_name: e.target.files[0].name}))
    }

    const HandleChangeObject = (index,invnum)=>{
        const newdata = FAdatasforEditNewFA.map((data,i)=>{
            let newNameData = ""
            const newName = namesofFA.map(item=>{
                if (item.inventar_number===invnum){
                    newNameData = item.name
                }
            })
        if(i===index){
            return {
                ...data,
                name:newNameData
            }
        }
        return data
        })
        setFadatasforEditNewFA(newdata)
    }

    const HandleChangePrice = (e,index)=>{
        const newprice = e.target.value
        const newdata = FAdatasforEditNewFA.map((data,i)=>{
            if(i===index){
                let newAmount = (newprice*1)*data.VAT*1/100+(newprice*1)
                return {
                    ...data,
                    price:newprice,
                    amount:newAmount
                }
            }
            return data
        })
        setFadatasforEditNewFA(newdata)

        const yoxlama = ()=> {

            let sum = 0
            for (let i = 0; i < FAdatasforEditNewFA.length; i += 1) {
                sum += FAdatasforEditNewFA[i].amount
            }
            return sum;
        }
        setcurrentIDdataforEditNewFA((prev)=> ({...prev,amount:yoxlama()}))

    }

    const HandleChangeVAT = (e,index)=>{
        const newVAT = e.target.value
        const newdata = FAdatasforEditNewFA.map((data,i)=>{
            if(i===index){
                let newAmount = (newVAT*1)*(data.price*1)/100+(data.price*1)
                return {
                    ...data,
                    VAT:newVAT,
                    amount:newAmount
                }
            }
            return data
        })
        setFadatasforEditNewFA(newdata)


    }

    const HandleSum = ()=>{
        const yoxlama = ()=> {

            let sum = 0
            for (let i = 0; i < FAdatasforEditNewFA.length; i += 1) {
                sum += FAdatasforEditNewFA[i].amount
            }
            return sum;
        }
        setcurrentIDdataforEditNewFA((prev)=> ({...prev,amount:yoxlama()}))
    }

    const FillInputs = (e)=>{
        setcurrentIDdataforEditNewFA((prev)=>({...prev,[e.target.name]:e.target.value}))
    }


    const HandleSaveFile =async()=>{

        if (fileforEditNewFA){
            try {

                let formData = new FormData();
                formData.append("screenshot", fileforEditNewFA);
                await axios.post("http://localhost:4444/addFixedAssetsPhoto", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }).then((res) => {
                    console.log("Success ", res);
                }).catch(function (error) {
                    console.log("error",error);
                });

                setDisabledforEditNewFA(true)


                console.log("salam")
            }catch(err){
                console.log(err)
            }
        }
    }

    const HandleUpdateFileName =async()=>{

        if (fileforEditNewFA){
            try {
                await axios.put("http://localhost:4444/addFixedAssetsPhotoName", [currentIDdataforEditNewFA.registrid,fileforEditNewFA.name])
                console.log("salam")
            }catch(err){
                console.log(err)
            }
        }
    }

    const HandleUpdateData = (e) =>{
        if (!approvedforEditNewFA){
        let checkDataEmpty = true
          FAdatasforEditNewFA.map(data=>{
              if (data.amount*1<=0 || data.date.length<=0 || data.inventer_number.length<=0 || data.name.length<=0 || data.price<=0 || data.quantity!==1 || data.regitr_numb<=16 || data.seller.length<=0 || data.subsidiary.length<=0){
                  checkDataEmpty = false
              }
          })
          if(currentIDdataforEditNewFA.amount<=0 || currentIDdataforEditNewFA.currentdate.length<=0 || currentIDdataforEditNewFA.registrid.length<=16 || currentIDdataforEditNewFA.seller.length<=0 || currentIDdataforEditNewFA.subsidiary.length<=0 || currentIDdataforEditNewFA.status === 1) {
              checkDataEmpty = false
          }
        const checkdata = ()=>{

            if(checkDataEmpty===false){
                e.preventDefault()
                setCheckBeforeSend(false)

                setTimeout(function()  {
                  setCheckBeforeSend(true)
              }, 1500);
          }else{
              const sentDatas = async(e)=>{

                  try {
                      await axios.put(`http://localhost:4444/addFixedAssets/${EditID}`,currentIDdataforEditNewFA);
                      await axios.put(`http://localhost:4444/addFixedAssets2/${EditID}`,[FAdatasforEditNewFA,currentIDdataforEditNewFA]);

                      window.location.reload();
                  }catch(err){
                      console.log(err)
                  }
              }
              sentDatas()
          }
        }
        checkdata()
        }else console.log("Approved data")
    }

    const HandleAproveData = async (e)=>{
        if(!approvedforEditNewFA){
            let checkPrice = true
            FAdatasforEditNewFA.map(data=>{
                if (data.price<=0){
                    e.preventDefault()
                    setCheckApproveBeforeSendforEditNewFA("Price")
                    checkPrice = false
                }
            })
            if(currentIDdataforEditNewFA.currentdate.length<=0) {
            e.preventDefault()
            setCheckApproveBeforeSendforEditNewFA("Date")
            setTimeout(function()  {
                setCheckApproveBeforeSendforEditNewFA(null)
            }, 1500);
            return
        }else if(currentIDdataforEditNewFA.seller.length<=0) {
            e.preventDefault()
            setCheckApproveBeforeSendforEditNewFA("Seller")
            setTimeout(function()  {
                setCheckApproveBeforeSendforEditNewFA(null)
            }, 1500);
            return
        }else if(currentIDdataforEditNewFA.subsidiary.length<=0) {
            e.preventDefault()
            setCheckApproveBeforeSendforEditNewFA("Subsidiary")
            setTimeout(function()  {
                setCheckApproveBeforeSendforEditNewFA(null)
            }, 1500);
            return
        }else if(currentIDdataforEditNewFA.document_name.length<=0) {
            e.preventDefault()
            setCheckApproveBeforeSendforEditNewFA("File")
            setTimeout(function()  {
                setCheckApproveBeforeSendforEditNewFA(null)
            }, 1500);
            return
        }else if(!checkPrice) {
            e.preventDefault()
            setCheckApproveBeforeSendforEditNewFA("Price")
            setTimeout(function()  {
                setCheckApproveBeforeSendforEditNewFA(null)
            }, 1500);
            return
        }else{

            try {
                    axios.post("http://localhost:4444/approveReport",[FAdatasforEditNewFA])
                    .then(function (response) {
                        console.log("response",response);
                    })
                    .catch(function (error) {
                        console.log("error",error);
                    });

                    await axios.put(`http://localhost:4444/approveFixedAssets/${EditID}`,[currentIDdataforEditNewFA,FAdatasforEditNewFA])
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                    window.location.reload()
            }catch(err){
                console.log(err)
            }
        }
        }else console.log("approved data")
    }




    return (

        <div className="EditNewFA text-6xl text-blue-400 p-2 w-12">
            <button className="" onClick={EditOverhead}><FaEdit /></button>
            <Modal
                isOpen={modalIsOpenforEditNewFA}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example AddModal"
                ariaHideApp={false}
            >
                <div onDoubleClick={()=>setSquares(!squares)} className="windowsTop">
                    <button className="text-xl border-2 border-black rounded-sm absolute right-1 top-1 bg-red-400" onClick={closeModal}><IoClose /></button>
                    <button className="text-xl border-2 border-black rounded-sm absolute right-9 top-1 bg-red-400" onClick={()=>setSquares(!squares)}>{
                        squares ? <BsSquare/> : <TbSquaresDiagonal/>
                    }</button>
                </div>
                <form className="w-full">
                <h1 className="font-bold mb-3" ref={(_subtitle) => (subtitle1 = _subtitle)}>Add new Fixed Asset</h1>
                    <div className="topside flex w-full relative">
                        <div className="leftside flex-1">
                            <div className="registrNumber flex mr-6 mb-3">
                                <label className="bg-blue-100">Regitration No:</label>
                                <div className="registrNumb border-b-2 border-b-black pl-1">{currentIDdataforEditNewFA && currentIDdataforEditNewFA.registrid}</div>
                            </div>
                            <div className="currentDate mb-3">
                                <label className="bg-blue-100 my-2 p-1">Date:</label>
                                <input name="currentdate" onChange={(e)=>FillInputs(e)} defaultValue={currentIDdataforEditNewFA && currentIDdataforEditNewFA.currentdate.slice(0,10)} className="border-2 border-black ml-1 pl-0.5" type='date' />
                            </div>
                            <div>
                                <label className="w-1/4 bg-blue-100 my-2 p-1">Subsidiary:</label>
                                <select name="subsidiary" onChange={(e)=>FillInputs(e)} defaultValue={currentIDdataforEditNewFA && currentIDdataforEditNewFA.subsidiary} className="border-b-2 border-b-black ml-1 w-3/4">
                                    <option value="Bilgeh">Bilgəh</option>
                                    <option value="Buzovna">Buzovna</option>
                                    <option value="Aghdam">Ağdam</option>
                                </select>
                            </div>
                            <div className="seller w-full mt-3">
                                <label className="bg-blue-100 my-2 p-1 w-1/4 mr-10">Seller:</label>
                                <input name="seller" onChange={(e)=>FillInputs(e)} defaultValue={currentIDdataforEditNewFA && currentIDdataforEditNewFA.seller} placeholder="Enter Seller" className="border-b-2 border-b-black w-3/4" />
                            </div>
                        </div>

                        <div className="rightside flex flex-1 flex-col">
                             <div className="donloadFilediv mb-3">
                                <input  onChange={(e) => HandleAddFile(e)} id="downloadFile" className="mb-2 hidden" name='Download file'
                                       placeholder="Download file" type="file" accept="image/aces"/>
                                <label className="downloadFileclass" htmlFor="downloadFile">{currentIDdataforEditNewFA && currentIDdataforEditNewFA.document_name ? "Change file" : "Download file"}</label>
                             </div>

                            <div className="showFilediv mb-3">
                                <i className="downloadFileclass" onClick={()=>setsecondsetIsOpenforEditNewFA(true)}>Show file</i>
                                <Modal
                                    isOpen={secondmodalIsOpenforEditNewFA}
                                    onRequestClose={closeModal2}
                                    style={customStyles2}
                                    contentLabel="Example AddModal"
                                    ariaHideApp={false}
                                >
                                    <div className="w-11/12 h-full p-2 m-auto">{
                                        !photoforEditNewFA ?
                                        <center className="text-9xl">Sənəd yoxdur</center>
                                            :
                                        <img className="w-full h-full" src={"./uploads/" + photoforEditNewFA} alt=""/>}
                                    </div>
                                    <button className="text-xl border-2 border-black rounded-sm absolute right-1 top-1" onClick={closeModal2}><IoClose /></button>
                                </Modal>
                            </div>
                            <div className="donloadFilediv mb-3">
                                <input onClick={()=> {
                                    HandleSaveFile()
                                    HandleUpdateFileName()
                                }
                                } id="SaveFile" className="mb-2 hidden relative" type="button" />
                                <label className="downloadFileclass" htmlFor="SaveFile">Save file</label><span className="absolute top-0 right-1/4">{isDisabledforEditNewFA ? "Fayl yüklənib" : "No file"}</span>
                            </div>
                        </div>
                    </div>
                    <div className="centerside w-full mt-4 overflow-auto">
                        <div className="icons bg-blue-100 flex">
                            <div className="text-6xl text-blue-400 p-2 w-12 mr-8 cursor-pointer">
                                <IoAddCircleSharp />
                            </div>
                            <div className="text-6xl text-blue-400 p-2 w-12 mr-8 cursor-pointer">
                                <IoRemoveCircleSharp />
                            </div>
                        </div>
                        <div className="w-full headers flex">
                            <div className="w-1/12 pl-1">ID</div>
                            <div className="w-2/12 pl-1">Name</div>
                            <div className="w-1/12 pl-1">Unit</div>
                            <div className="w-1/12 pl-1">Currency</div>
                            <div className="w-1/12 pl-1">Quantity</div>
                            <div className="w-1/12 pl-1">Price</div>
                            <div className="w-1/12 pl-1">VAT percent</div>
                            <div className="w-1/12 pl-1">VAT amount</div>
                            <div className="w-2/12 pl-1">VAT-less amount</div>
                            <div className="w-1/12 pl-1">Amount</div>
                        </div>
                        {
                        FAdatasforEditNewFA.map((data,i)=>(
                        <div key={data.id} className="addremoveline flex">
                            <div className="nameofFA w-1/12 pl-0.5">
                                <select onChange={(e)=>HandleChangeObject(i,e.target.value)} defaultValue={data.inventer_number} className="w-full" name="inventer_number" id="">
                                    {namesofFA.map(item=>(
                                        <option value={item.inventar_number}>{item.inventar_number}</option>
                                    ))}

                                </select>
                            </div>
                            <div className="idofFA w-2/12 pl-0.5">{data.name}</div>
                            <div className="unitofFA w-1/12 pl-0.5">unit</div>
                            <div className="currency w-1/12 pl-0.5"><select defaultValue={data.currency} className="w-full" name="" id="">
                                <option value={1}>AZN</option>
                                <option value={1.7}>USD</option>
                                <option value={1.9}>EURO</option>
                                <option value={0.1}>Turk Lira</option>
                                <option value={0.01}>Rubl</option>
                            </select></div>
                            <div className="quantity w-1/12 pl-0.5"><input disabled={true} className="w-full" type="text"/>1</div>
                            <div onKeyUp={HandleSum} className="price w-1/12 pl-0.5"><input onChange={
                                (e)=> {
                                    HandleChangePrice(e, i)
                                }

                            } defaultValue={data.price} className="w-full" type="text"/></div>
                            <div  onKeyUp={HandleSum} className="EDVpercent w-1/12 pl-0.5"><input  onChange={(e)=>HandleChangeVAT(e,i)} defaultValue={data.VAT} className="w-full" type="text" name="" id=""/></div>
                            <div className="EDVamount w-1/12 pl-0.5">{data.amount-data.price}</div>
                            <div className="EDVsizamount w-2/12 pl-0.5">{data.price}</div>
                            <div className="amount w-1/12 pl-0.5">{data.amount}</div>

                        </div>
                        ))
                        }

                    </div>
                    <div className="resultamount bg-gray-400 w-full h-14 absolute bottom-0.5 left-0 flex justify-between">
                        <div className="totalAMount pt-4 pl-2 text-xl font-bold">Total amount:<span>{currentIDdataforEditNewFA && currentIDdataforEditNewFA.amount} AZN</span></div>
                        <div className="buttons">
                            <button type="button" onClick={()=>setThirdmodalIsOpenforEditNewFA(true)} className="text-blue-800 text-5xl pt-1 mr-3"><BsFillPrinterFill />
                            </button>
                                <Modal
                                    isOpen={ThirdmodalIsOpenforEditNewFA}
                                    onRequestClose={closeModal3}
                                    style={customStyles3}
                                    contentLabel="Example AddModal"
                                    ariaHideApp={false}

                                >
                                    <button className="text-xl border-2 border-black rounded-sm absolute right-1 top-1" onClick={closeModal3}><IoClose /></button>
                                <div id="PageBreakAfter" className="PageBreakAfter w-full h-full p-4">
                                    <div className="dateprint leading-relaxed">
                                        <span><b>Regist ID : </b></span>
                                        <span> {currentIDdataforEditNewFA && currentIDdataforEditNewFA.registrid}</span>
                                    </div>
                                    <div className="dateprint leading-relaxed">
                                        <span><b>Date : </b></span>
                                        <span> {currentIDdataforEditNewFA && currentIDdataforEditNewFA.currentdate.slice(0,10).split("-").reverse().join("-")}</span>
                                    </div>
                                    <div className="subsidiaryprint leading-loose">
                                        <span><b>Subsidiary: </b></span>
                                        <span> {currentIDdataforEditNewFA && currentIDdataforEditNewFA.subsidiary}</span>
                                    </div>
                                    <div className="subsidiaryprint leading-loose">
                                        <span><b>Seller: </b></span>
                                        <span> {currentIDdataforEditNewFA && currentIDdataforEditNewFA.seller}</span>
                                    </div>
                                    <div className="datasprint leading-loose">
                                        <table className="w-full mt-5">
                                            <tr className="text-sm align-middle">
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Unit</th>
                                                <th>Currency</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>VAT percent</th>
                                                <th>VAT amount</th>
                                                <th>VAT-less amount</th>
                                                <th>Amount</th>
                                            </tr>
                                            {FAdatasforEditNewFA && FAdatasforEditNewFA.map((data, i) => (
                                                <tr className="text-sm align-middle">
                                                    <td>{data.inventer_number}</td>
                                                    <td>{data.name}</td>
                                                    <td>unit</td>
                                                    <td>AZN</td>
                                                    <td>{data.quantity}</td>
                                                    <td>{data.price}</td>
                                                    <td>{data.VAT}</td>
                                                    <td>{data.amount-data.price}</td>
                                                    <td>{data.price}</td>
                                                    <td>{data.amount}</td>
                                                </tr>
                                            ))}

                                        </table>
                                        <div className="flex mt-4">
                                            <div ><b>SUM: </b></div>
                                            <div><b>{currentIDdataforEditNewFA && currentIDdataforEditNewFA.amount}</b></div>
                                        </div>
                                        <div className="TO_Over w-full">
                                            <div className="take_over flex w-full"><div className="w-1/12">Take over:</div><div className="w-11/12 border-b-black border-solid border-b-2"></div></div>
                                            <div className="hand_over flex w-full mt-3"><div className="w-fit">Hand over:</div><div className="flex-1 border-b-black border-solid border-b-2"></div></div>
                                            <div className="hand_over"></div>
                                        </div>
                                    </div>
                                </div>
                                </Modal>

                            <button onClick={(e)=>HandleAproveData(e)} className="text-red-600 text-5xl pt-1 mr-2"><GiConfirmed /></button>
                            <button onClick={(e)=>HandleUpdateData(e)} className="text-green-600 text-5xl pt-1 mr-2"><RiSave3Fill /></button>
                        </div>
                    </div>
                <div className={`${CheckBeforeSend ? 'hidden' : ''} w-1/3 h-32 bg-gray-300 text-red-500 text-2xl text-center pt-10 font-bold absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4`}>Empty cells</div>
                <div className={`${CheckApproveBeforeSendforEditNewFA===null ? 'hidden' : ''} w-1/3 h-32 bg-gray-300 text-red-500 text-2xl text-center pt-10 font-bold absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4`}>{CheckApproveBeforeSendforEditNewFA} has not chosen</div>

                </form>
            </Modal>
        </div>

    );
}

export default EditFa;