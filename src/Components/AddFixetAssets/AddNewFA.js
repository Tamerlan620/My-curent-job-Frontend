import React, {useState, useEffect} from 'react';
import {IoAddCircleSharp,IoClose,IoRemoveCircleSharp} from "react-icons/io5";
import {RiSave3Fill} from "react-icons/ri";
import {GiConfirmed} from "react-icons/gi";
import {BsSquare} from "react-icons/bs";
import {TbSquaresDiagonal} from "react-icons/tb";
import Modal from 'react-modal';
import {Modalopen} from "../../stores/openModal";
import {useDispatch, useSelector} from "react-redux";
import Axios from "axios";
import {MainContext,useContext} from "../../context";

function AddNewFa() {
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
    let subtitle1;

    const {
        secondmodalIsOpenforAddNewFA,setsecondmodalIsOpenforAddNewFA,
        addnNewLine,setaddnNewLine,
        sentData,setSentData,
        sum,setSum,
        Registr_numberforAddNewFA,setRegistr_numberforAddNewFA,
        subsidiary,setSubsidiary,
        seller,setSeller,
        new_DateforAddNewFA,setnew_DateforAddNewFA,
        isDisabledforAddNewFA,setisDisabledforAddNewFA,
        fileforAddNewFA, setFileforAddNewFA
    } = useContext(MainContext)

    function openModal() {
        const New_date = new Date();
        const new_year = New_date.getFullYear();
        const new_month = New_date.getMonth();
        const new_today = New_date.getDate();
        const new_hour = New_date.getHours();
        const new_minute = New_date.getMinutes();
        const new_second = New_date.getSeconds();
        const new_milli_second = New_date.getMilliseconds();
        const registrNum = `22${new_year}${new_month}${new_today}${new_hour}${new_minute}${new_second}${new_milli_second}00`;
        setRegistr_numberforAddNewFA(registrNum)
        const today = `${(new_year>10 ? new_year : "0"+new_year)}-${(new_month>10 ? new_month+1 : "0"+(new_month+1))}-${(new_today>9 ? new_today : "0"+new_today)}`
        setnew_DateforAddNewFA(today)
        dispatch(Modalopen(true))
    }

    function afterOpenModal() {subtitle1.style.color = '#f00';}
    function closeModal() {dispatch(
        Modalopen(false),
        window.location.reload()
    )}
    function closeModal2() {setsecondmodalIsOpenforAddNewFA(false);}


    const currentState=useSelector((state)=>state.openModal.modalIsOpen)
    const dispatch = useDispatch()
    const datas = useSelector(state=>state.getDatas.nameofFA);

    const HandleGetdata = (e,indexof) => {

        const filteredID = datas.filter(
            (FAid) => FAid.inventar_number === e.target.value
        );

        const newData = sentData.map(data => {
            if (data.newIndex === indexof) {

                return {
                    ...data,
                    id: filteredID[0].id,
                    inventar_number: filteredID[0].inventar_number,
                    name: filteredID[0].name,
                    unit: filteredID[0].unit,
                    group: filteredID[0].group
                }
            }
         return data


        })
      setSentData(newData);
    }

    const HandleAddLine = (i)=>{
        setaddnNewLine([...addnNewLine,[]])
        const newIndex = addnNewLine.length
        setSentData([...sentData,{
            newIndex,
            amount:0,
            VAT:0,
            currency:1
        }])
    }

    useEffect(()=>{
        const yoxlama = ()=>{
            let elements = document.getElementsByClassName('amount');
            const amount = Object.keys(elements).map(element=>{
                return elements[element].innerText*1
            })
            const sums = amount.reduce((accumulator, object) => {
                return accumulator*1 + object*1;
            }, 0);
            setSum(sums)
        }

        yoxlama()
    })


    const HandleDeleteLine = ()=>{
        const deletVal=[...addnNewLine]
        deletVal.splice(addnNewLine.length-1,1)
        setaddnNewLine(deletVal)

        const deletVal1=[...sentData]
        deletVal1.splice(sentData.length-1,1)
        setSentData(deletVal1)

    }

    const HandleChangeVAT = (e,indexof)=>{
        const V_A_T = e.target.value
        const newData = sentData.map(data => {
            // const a = data.price
            // let b = data.VAT
            // let c = (a*b/100*1 + a*1)*1
            // let d = 0;
            // data.currency===1 ? d=c : data.currency===1.8 ? d = c*1.8 : data.currency===1.7 ? d = c*1.7 : data.currency===0.1 ? d = c/10 : d=c/100;
            if (data.newIndex === indexof) {
                let newAmount = (V_A_T*1)*(data.price*1)/100+(data.price*1)
                return {
                    ...data,
                    VAT:V_A_T,
                    amount:newAmount

                }
            }
            return data
        })

        setSentData(newData);
    }

    const HandleChangePrice = (e,indexof)=>{
        const newPrice = e.target.value
        const newData = sentData.map(data => {
            // const a = data.price
            // let b = data.VAT
            // let c = (a*b/100*1 + a*1)*1
            // let d = 0;
            // data.currency==="AZ" ? d=c : data.currency==="EU" ? d = c*1.8 : data.currency==="USD" ? d = c*1.7 : data.currency==="TR" ? d = c/10 : d=c/100;
            if (data.newIndex === indexof) {
                let newAmount = (newPrice*1)*data.VAT*1/100+(newPrice*1)

                return {
                    ...data,
                    price:newPrice,
                    amount:newAmount
                }
            }
            return data
        })
        setSentData(newData);
    }

    const HandleChangeCurrency = (e,indexof)=>{
        const newData = sentData.map(data => {
            if (data.newIndex === indexof) {
                return {
                    ...data,
                    currency:e.target.value
                }
            }
            return data
        })
        setSentData(newData);
    }


    const HandleAddFile = (e)=>{
        e.target.files[0] && setFileforAddNewFA(e.target.files[0])
    }


    const SaveAllDataToServer = async (e)=>{
        if (sentData){
            try {
                await Axios.post("http://localhost:4444/addFixedAssets",[
                    sentData,
                    Registr_numberforAddNewFA,
                    subsidiary,
                    seller,
                    new_DateforAddNewFA,
                    sum,
                    fileforAddNewFA ? fileforAddNewFA.name : ""

                ])
                if (fileforAddNewFA){
                    let formData = new FormData();
                    formData.append("screenshot", fileforAddNewFA);
                    await Axios.post("http://localhost:4444/addFixedAssetsPhoto", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }).then((res) => {
                        console.log("Success ", res);
                    });
                }


                console.log("gonderildi")

                window.location.reload()
            }catch (err){
                console.log(err)
            }
        }else {
            e.preventDefault();
        }


    }


    return (

        <div className="AddNewFA text-6xl text-blue-400 p-2 w-12 mr-8">
            <button onClick={openModal}><IoAddCircleSharp /></button>
            <Modal
                isOpen={currentState}
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
                    <h1 className="font-bold mb-3 text-red-500 ml-2" ref={(_subtitle) => (subtitle1 = _subtitle)}>Add new Fixed Asset</h1>
                <form className="w-full p-2">
                    <div className="topside flex w-full relative">
                        <div className="leftside flex-1">
                            <div className="flex">
                                <div className="registrNumber flex mr-6 mb-3">
                                    <label className="bg-blue-100">Regitration No:</label>
                                    <div className="registrNumb border-b-2 border-b-black pl-1">{Registr_numberforAddNewFA}</div>
                                </div>
                                <div className="currentDate mb-3">
                                    <label className="bg-blue-100 my-2 p-1">Date:</label>
                                    <input onChange={(e)=>setnew_DateforAddNewFA(e.target.value)} defaultValue={new_DateforAddNewFA} className="border-2 border-black ml-1 pl-0.5" type='date' />
                                </div>
                            </div>
                            <div>
                                <label className="w-1/4 bg-blue-100 my-2 p-1">Subsidiary:</label>
                                <select defaultValue="" onChange={(e)=>setSubsidiary(e.target.value)} placeholder="Enter Group" className="border-b-2 border-b-black ml-1 w-3/4">
                                    <option disabled value=""></option>
                                    <option value="Bilgeh">Bilgəh</option>
                                    <option value="Buzovna">Buzovna</option>
                                    <option value="Aghdam">Ağdam</option>
                                </select>
                            </div>
                            <div className="seller w-full mt-3">
                                <label className="bg-blue-100 my-2 p-1 w-1/4 mr-10">Seller:</label>
                                <input onChange={(e)=>setSeller(e.target.value)} placeholder="Enter Seller" className="border-b-2 border-b-black w-3/4" />
                            </div>
                        </div>

                        <div className="rightside flex flex-1 flex-col">
                            <div className="donloadFilediv mb-3">
                                <input onChange={(e)=> HandleAddFile(e)} id="downloadFile" className="mb-2 hidden relative" name='screenshot' placeholder="Download file" type="file" accept="image/aces" />
                                <label className="downloadFileclass" htmlFor="downloadFile">Download file</label><span className="absolute top-0 right-1/4">{isDisabledforAddNewFA ? "Fayl yüklənib" : ""}</span>
                            </div>

                            <div className="showFilediv mb-3">
                                <i className="downloadFileclass" onClick={()=>setsecondmodalIsOpenforAddNewFA(true)}>Show file</i>
                                <Modal
                                    isOpen={secondmodalIsOpenforAddNewFA}
                                    onRequestClose={closeModal2}
                                    style={customStyles2}
                                    contentLabel="Example AddModal"
                                    ariaHideApp={false}
                                >
                                    <div className="w-11/12 m-auto">
                                        <img className="w-full h-3/4" src={fileforAddNewFA ? "./uploads/"+ fileforAddNewFA.name : "file.jpg"} alt=""/>
                                    </div>
                                    <button className="text-xl border-2 border-black rounded-sm absolute right-1 top-1" onClick={closeModal2}><IoClose /></button>
                                </Modal>
                            </div>

                       </div>
                    </div>
                    <div className="centerside w-full mt-4 overflow-auto">
                        <div className="icons bg-blue-100 flex">
                            <div onClick={(i)=>HandleAddLine(i)} className="text-6xl text-blue-400 p-2 w-12 mr-8 cursor-pointer">
                                <IoAddCircleSharp />
                            </div>
                            <div onClick={()=>HandleDeleteLine()} className="text-6xl text-blue-400 p-2 w-12 mr-8 cursor-pointer">
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
                            addnNewLine && addnNewLine.map((items,i)=>(


                            <div key={i} className="addremoveline flex">
                                <div className="nameofFA w-1/12 pl-0.5">
                                    <select defaultValue=""  onChange={(e)=>HandleGetdata(e,i)} className="w-full" name="inventar_number" id="">
                                            <option value=""></option>
                                    {datas && datas.map((items,index)=>(
                                            <option key={index} value={items.inventar_number}>
                                                {items.inventar_number}
                                            </option>

                                    ))}
                                    </select>
                                </div>
                                <div className="nameofFA w-2/12 pl-0.5">{sentData[i].name}</div>
                                <div className="unitofFA w-1/12 pl-0.5">{sentData[i].unit}</div>
                                <div className="currency w-1/12 pl-0.5"><select  onChange={(e)=>HandleChangeCurrency(e,i)} className="w-full" name="currency" id="">
                                    <option value={1}>AZN</option>
                                    <option value={1.7}>USD</option>
                                    <option value={1.9}>EURO</option>
                                    <option value={0.1}>Turk Lira</option>
                                    <option value={0.01}>Rubl</option>
                                </select></div>
                                <div className="quantity w-1/12 pl-0.5"><input disabled="disabled" value="1" className="w-full" type="number"/></div>
                                <div className="price w-1/12 pl-0.5"><input onChange={(e)=>HandleChangePrice(e,i)} name="price" className="w-full" type="number"/></div>
                                <div className="EDVpercent w-1/12 pl-0.5"><input onChange={(e)=>HandleChangeVAT(e,i)} className="w-full" type="number" name="EDVpercent" id=""/></div>
                                <div className="EDVamount w-1/12 pl-0.5">{sentData[i].price>0 && sentData[i].VAT>0 ? sentData[i].price*sentData[i].VAT/100 : ""}</div>
                                <div className="EDVsizamount w-2/12 pl-0.5">{sentData[i].price>0 ? sentData[i].price : ""}</div>
                                <div id='amount' className="amount w-1/12 pl-0.5">{
                                    sentData[i].price>0 && sentData[i].VAT>=0 ?
                                    (sentData[i].VAT*sentData[i].price/100*1 + sentData[i].price*1)*1*sentData[i].currency :
                                    sentData[i].price>0 && !sentData[i].VAT ?
                                    sentData[i].price*sentData[i].currency
                                    :
                                    ""}</div>

                            </div>
                            ))
                        }



                    </div>
                    <div className="resultamount bg-gray-400 w-full h-14 absolute bottom-0.5 left-0 flex justify-between">
                        <div className="totalAMount pt-4 pl-2 text-xl font-bold">Total amount:{sum ? sum : 0}<span>
                            {



                            }
                            AZN</span></div>
                        <div className="buttons">
                            <button className="text-red-600 text-5xl pt-1 mr-2"><GiConfirmed /></button>
                            <button
                                onClick={(e)=>SaveAllDataToServer(e)}
                                className="text-green-600 text-5xl pt-1 mr-2"><RiSave3Fill /></button>
                        </div>
                    </div>

                </form>
            </Modal>
        </div>

    );
}

export default AddNewFa;