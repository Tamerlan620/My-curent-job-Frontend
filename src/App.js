import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import {MainContext} from "./context";
import AddFixedAssetName from "./Components/FixedAssetNames/AddFixedAssetName";
import AddFixedAssets from "./Components/AddFixetAssets/AddFixedAssets";
import Consolidation from "./Components/Consolidations/Consolidation";
import Home from "./Components/Home";
import Report from "./Components/Reports/Report";
import {Get_Added_Fixed_Asset,Get_CONSALLIDATION,Get_Fixed_Asset_Name,Get_Bought_FA,Get_Subs} from "./stores/getDatas";

import './App.css';
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";



function App() {
    // ------------------------Add New Fixed Asset-------------------------------
    const [secondmodalIsOpenforAddNewFA, setsecondmodalIsOpenforAddNewFA] = useState(false);
    const [addnNewLine, setaddnNewLine] = useState([]);
    const [sentData,setSentData] = useState([]);
    const [sum,setSum] = useState(0);
    const [Registr_numberforAddNewFA,setRegistr_numberforAddNewFA]=useState(null)
    const [subsidiary,setSubsidiary]=useState(null)
    const [seller,setSeller]=useState(null)
    const [new_DateforAddNewFA,setnew_DateforAddNewFA]=useState(null)
    const [isDisabledforAddNewFA,setisDisabledforAddNewFA]= useState(false)
    const [fileforAddNewFA, setFileforAddNewFA] = useState(null);

    // ------------------------Edit New Fixed Asset-------------------------------

    const [modalIsOpenforEditNewFA, setIsOpenforEditNewFA] = React.useState(false);
    const [secondmodalIsOpenforEditNewFA, setsecondsetIsOpenforEditNewFA] = React.useState(false);
    const [ThirdmodalIsOpenforEditNewFA, setThirdmodalIsOpenforEditNewFA] = React.useState(false);
    const [FAdatasforEditNewFA, setFadatasforEditNewFA] = React.useState([]);
    const [currentIDdataforEditNewFA, setcurrentIDdataforEditNewFA] = React.useState(null);
    const [CheckBeforeSend, setCheckBeforeSend] = React.useState(true);
    const [CheckApproveBeforeSendforEditNewFA, setCheckApproveBeforeSendforEditNewFA] = React.useState(null);
    const [photoforEditNewFA, setPhotoforEditNewFA] = React.useState(null);
    const [fileforEditNewFA, setFileforEditNewFA] = React.useState(null);
    const [approvedforEditNewFA, setApprovedforEditNewFA] = React.useState(false);
    const [isDisabledforEditNewFA,setDisabledforEditNewFA]= useState(false)

    // ------------------------ADD CONSOLIDATION-------------------------------

    const [modalIsOpenforAdddConsolidation, setIsOpenAdddConsolidation] = useState(false);
    const [secondmodalIsOpenAdddConsolidation, setsecondsetIsOpenAdddConsolidation] = useState(false);
    const [ThirdmodalIsOpenAdddConsolidation, setThirdmodalIsOpenAdddConsolidation] = React.useState(false);
    const [Registr_number,setRegistr_number]=useState(null)
    const [new_Date,setNew_Date]=useState(null)
    const [fileforAddConsolidation, setFileforAddConsolidation] = useState(null);
    const [subsidiariesAdddConsolidation, setSubsidiariesAdddConsolidation] = useState(null);
    const [selectedSubsidiarie, setSelectedSubsidiarie] = useState(null);
    const [selectedFA, setSelectedFA] = useState(null);
    const [dataForPrint, setdataForPrint] = useState(null);
    const [HandedTime, SetHandedTime] = useState(null);
    const [edittedworkerdata, setEdittedworkerdata] = useState({
        date:null,
        workers:null,
        department:null,
        notes:null
    });

    // ------------------------Edit CONSOLIDATION-------------------------------

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [secondmodalIsOpen, setsecondsetIsOpen] = React.useState(false);
    const [ThirdmodalIsOpen, setThirdmodalIsOpen] = React.useState(false);
    const [currentIDdata, setcurrentIDdata] = React.useState(null);
    const [CheckApproveBeforeSend, setCheckApproveBeforeSend] = React.useState(null);
    const [photo, setPhoto] = React.useState(null);
    const [file, setFile] = React.useState(null);
    const [subsidiaries, setSubsidiaries] = useState(null);
    const [approved, setApproved] = React.useState(false);
    const [isDisabled,setDisabled]= useState(false)
    const [CheckBeforeSendforEditConsolidation,setCheckBeforeSendforEditConsolidation]= useState(true)
    const [selectSubsidiary,setSelectSubsidiary] = useState();
    const [report,setReport] = useState();
    const [subsidiariesforReport, setSubsidiariesReport] = useState(null);









    const data = {
        // ----------------Add New FA---------------

        secondmodalIsOpenforAddNewFA,setsecondmodalIsOpenforAddNewFA,
        addnNewLine,setaddnNewLine,
        sentData,setSentData,
        sum,setSum,
        Registr_numberforAddNewFA,setRegistr_numberforAddNewFA,
        subsidiary,setSubsidiary,
        seller,setSeller,
        new_DateforAddNewFA,setnew_DateforAddNewFA,
        isDisabledforAddNewFA,setisDisabledforAddNewFA,
        fileforAddNewFA, setFileforAddNewFA,

        // ----------------Edit New FA---------------

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
        isDisabledforEditNewFA,setDisabledforEditNewFA,

        // ----------------Add new consolidation---------------

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
        edittedworkerdata, setEdittedworkerdata,

        // ----------------Edit new consolidation---------------

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
        CheckBeforeSendforEditConsolidation,setCheckBeforeSendforEditConsolidation,

        // ----------------Report---------------

        selectSubsidiary,setSelectSubsidiary,
        report,setReport,
        subsidiariesforReport, setSubsidiariesReport,





    }

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(Get_Bought_FA())
        dispatch(Get_Fixed_Asset_Name())
        dispatch(Get_Added_Fixed_Asset())
        dispatch(Get_CONSALLIDATION())
        dispatch(Get_Subs())

    })

    // const currentState = useSelector((state)=>state.getData.getSubsidiary)
    // console.log(currentState)
    const HandleGetSubsidiary =(subs)=>{

    }


useEffect(()=>{

},[])
    // const datas = useSelector(state=>state.getDatas.Consolidation);





  return (
      <MainContext.Provider value={data}>

          <BrowserRouter>
         <div className="maindiv w-full bg-gray-300 px-3 p-3">
              <nav className="flex justify-between">
                  <ul><li>
                      <NavLink className="px-4 py-1.5 bg-cyan-50 rounded-3xl" to="/">MyCurrrentJob</NavLink>
                  </li></ul>
                  <ul className="flex justify-between px-2">
                    <li className="mx-5"><NavLink className="px-4 py-1.5 bg-cyan-50 rounded-3xl" to="/addFixedAssets">AddFixedAssets</NavLink></li>
                    <li className="mx-5"><NavLink className="px-4 py-1.5 bg-cyan-50 rounded-3xl" to="/addFixedAssetName">AddFixedAssetName</NavLink></li>
                    <li className="mx-5"><NavLink className="px-4 py-1.5 bg-cyan-50 rounded-3xl" to="/consolidation">Consolidation</NavLink></li>
                    <li className="mx-5"><NavLink className="px-4 py-1.5 bg-cyan-50 rounded-3xl" to="/report">Report</NavLink></li>
                  </ul>
              </nav>
         </div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/addFixedAssetName" element={<AddFixedAssetName />} />
                <Route path="/addFixedAssets" element={<AddFixedAssets />} />
                <Route path="/consolidation" element={<Consolidation />} />
                <Route path="/report" element={<Report />} />
              </Routes>
          </BrowserRouter>
    </MainContext.Provider>
  );
}

export default App;
