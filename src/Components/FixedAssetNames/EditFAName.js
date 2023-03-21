import React from 'react';
import {IoClose} from "react-icons/io5";
import {FaEdit} from "react-icons/fa";
import Modal from 'react-modal';
import { useSelector} from "react-redux";
import axios from "axios";




const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width:'400px',
        border:'3px solid #000'
    },
};
const EditFAName = () => {

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [isEmpty, setisEmpty] = React.useState(false);
    const [currentIDdata, setcurrentIDdata] = React.useState(null);
    const [Edit_Data, setEdit_Data] = React.useState({
        name:!currentIDdata ? '' : currentIDdata.name ,
        group:!currentIDdata ? '' : currentIDdata.group,
        unit:!currentIDdata ? 'unit' : currentIDdata.unit  ,
        producing_country:!currentIDdata ? '' : currentIDdata.producing_country,
        serial_number:!currentIDdata ? '' : currentIDdata.serial_number

    });

    function EditModal() {
        if (EditID>0 && datas){
            setIsOpen(true);
            const filteredID = datas.filter(
                (FAid) => FAid.id === EditID
            );
            console.log(filteredID)
            setcurrentIDdata(filteredID[0])
            setEdit_Data({
                name:!filteredID[0] ? '' : filteredID[0].name ,
                group:!filteredID[0] ? '' : filteredID[0].group,
                unit:!filteredID[0] ? 'unit' : filteredID[0].unit  ,
                producing_country:!filteredID[0] ? '' : filteredID[0].producing_country,
                serial_number:!filteredID[0] ? '' : filteredID[0].serial_number

            })
        }
    }
    function afterOpenModal() {subtitle.style.color = '#f00';}
    function closeModal() {setIsOpen(false);}


    const EditID = useSelector(state=>state.getDatas.ChosenID);
    const datas = useSelector(state=>state.getDatas.nameofFA);

    const FillInputs = (e)=>{
        setEdit_Data((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

    const Edit_Fixed_Asset = ()=>{
        console.log(Edit_Data)

        if (!Edit_Data.name  || !Edit_Data.group || !Edit_Data.unit || !Edit_Data.producing_country || !Edit_Data.serial_number){
            setisEmpty(true)
            return
        }else{
            const sentData = async(e)=>{
                // e.preventDefault()
                try {
                    await axios.put(`https://my-curent-job-backend.onrender.com/addFixedAssetName/${EditID}`,Edit_Data);
                    // await axios.put(`http://localhost:4444/addFixedAssetName/${EditID}`,Edit_Data);
                    window.location.reload();
                }catch(err){
                    console.log(err)
                }
            }
            sentData()
        }
    }


    return (
        <div className="EditNewFA text-6xl text-blue-400 p-2 w-12">
            <button onClick={EditModal}><FaEdit /></button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example AddModal"
            >
                <h1 className="font-bold" ref={(_subtitle) => (subtitle = _subtitle)}>Edit Fixed Asset</h1>
                {isEmpty && <h1 className="font-bold text-red-600">Empty input</h1>}
                <button className="text-xl border-2 border-black rounded-sm absolute right-1 top-1" onClick={closeModal}><IoClose /></button>
                {
                    <form className="flex flex-col">
                        <div><label htmlFor="">Invenet No: <b>{currentIDdata && currentIDdata.inventar_number}</b></label></div>
                        <label className="bg-blue-100 my-2 p-1">Name:</label>
                        <input onChange={(e)=>FillInputs(e)} name="name" className="outline-0 border-b-2 border-b-black" defaultValue={currentIDdata && currentIDdata.name}/>
                        <label className=" bg-blue-100 my-2 p-1">Group:</label>
                        <input onChange={(e)=>FillInputs(e)} name="group" className="outline-0 border-b-2 border-b-black" defaultValue={currentIDdata && currentIDdata.group}/>
                        <label className="bg-blue-100 my-2 p-1">Unit:</label>
                        <select onChange={(e)=>FillInputs(e)} readOnly defaultValue={currentIDdata ? currentIDdata.unit : "kg"} className=" bg-blue-100 my-2 p-1" name="unit">
                            <option value="unit">Unit</option>
                            <option value="kg">KG</option>
                            <option value="set">Set</option>
                            <option value="meter">Meter</option>
                        </select>
                        <label className="bg-blue-100 my-2 p-1">Producing country:</label>
                        <input onChange={(e)=>FillInputs(e)} name="producing_country" className="outline-0 border-b-2 border-b-black" defaultValue={currentIDdata && currentIDdata.producing_country}/>
                        <label className="bg-blue-100 my-2 p-1">Serial Number:</label>
                        <input onChange={(e)=>FillInputs(e)} name="serial_number" className="outline-0 border-b-2 border-b-black" defaultValue={currentIDdata && currentIDdata.serial_number}/>
                        <button
                            onClick={Edit_Fixed_Asset}
                            type="button"
                            className="px-2 py-2 border-2 border-black rounded-md bg-gray-300 text-green-600 font-bold mt-5">Save
                        </button>
                    </form>}

            </Modal>
        </div>
    );
};

export default EditFAName;