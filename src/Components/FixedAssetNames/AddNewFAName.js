import React from 'react';
import {IoAddCircleSharp,IoClose} from "react-icons/io5";
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
const AddNewFAName = () => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [isEmpty, setisEmpty] = React.useState(false);
    const [added_Data, setadded_Data] = React.useState({
        inventar_number:'',
        name:'',
        group:'',
        unit:'unit',
        producing_country:'',
        serial_number:''

    });


    function openModal() {setIsOpen(true);}
    function afterOpenModal() {subtitle.style.color = '#f00';}
    function closeModal() {setIsOpen(false);}


    const datas = useSelector(state=>state.getDatas.nameofFA);


    const NewID = ()=>{
        let biggest = 0;
        const t = datas.map(items=> {
            if(items.inventar_number.split(".")[2]>biggest){
                    biggest=items.inventar_number.split(".")[2]
            }
        })
        return biggest
    }

    const FillInputs = (e)=>{
        setadded_Data((prev)=>({...prev,[e.target.name]:e.target.value,inventar_number:`111.1.${(NewID()*1+1)}`}))
    }

    const AddNewFixedAssetName = ()=>{

        console.log(added_Data)

        if (!added_Data.name || !added_Data.inventar_number || !added_Data.group || !added_Data.unit || !added_Data.producing_country || !added_Data.serial_number){
            setisEmpty(true)
            return
        }else{
            const sentData = async(e)=>{
                // e.preventDefault()
                try {
                    await axios.post('http://localhost:4444/addFixedAssetName',added_Data);
                    window.location.reload();
                }catch(err){
                    console.log(err)
                }
            }
            sentData()
        }
    }

    return (
        <div className="AddNewFA text-6xl text-blue-400 p-2 w-12 mr-8">
            <button onClick={openModal}><IoAddCircleSharp /></button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example AddModal"
            >
                <h1 className="font-bold" ref={(_subtitle) => (subtitle = _subtitle)}>Add new Fixed Asset</h1>
                {isEmpty && <h1 className="font-bold text-red-600">Empty input</h1>}
                <button className="text-xl border-2 border-black rounded-sm absolute right-1 top-1" onClick={closeModal}><IoClose /></button>
                <form className="flex flex-col">
                    <label className="bg-blue-100 my-2 p-1">Name:</label>
                    <input onChange={(e)=>FillInputs(e)} name='name' placeholder="Enter name" className="outline-0 border-b-2 border-b-black" />
                    <label className=" bg-blue-100 my-2 p-1">Group:</label>
                    <input onChange={(e)=>FillInputs(e)} name='group' placeholder="Enter Group" className="outline-0 border-b-2 border-b-black" />
                    <label className="bg-blue-100 my-2 p-1">Unit:</label>
                    <select onChange={(e)=>FillInputs(e)} name='unit' className=" bg-blue-100 my-2 p-1">
                        <option value="unit">Unit</option>
                        <option value="kg">KG</option>
                        <option value="set">Set</option>
                        <option value="meter">Meter</option>
                    </select>
                    <label className="bg-blue-100 my-2 p-1">Producing country:</label>
                    <input onChange={(e)=>FillInputs(e)} name='producing_country' placeholder="Enter producing country" className="outline-0 border-b-2 border-b-black" />
                    <label className="bg-blue-100 my-2 p-1">Serial Number:</label>
                    <input onChange={(e)=>FillInputs(e)} name='serial_number' placeholder="Enter serial number" className="outline-0 border-b-2 border-b-black" />
                    <button type="button" onClick={(e)=>AddNewFixedAssetName(e)} className="px-2 py-2 border-2 border-black rounded-md bg-gray-300 text-green-600 font-bold mt-5">Save</button>
                </form>
            </Modal>
        </div>
    );
};

export default AddNewFAName;