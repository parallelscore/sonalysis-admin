import React, { useState, useEffect } from 'react';
import "./index.scss"
import UploadIcon from "../../../assets/icons/upload-icon.svg"
import SearchIcon from "../../../assets/icons/search-icon.svg"
import EmptyFile from "../../../assets/icons/empty-file.svg"
import UploadProgressModal from "../../../components/UploadProgressModal"
import { useDispatch, useSelector } from "react-redux"
import { fetchUploadRequest, deleteRequest } from "../../../store/upload/actions"
import moment from "moment"
import { LoopingRhombusesSpinner } from 'react-epic-spinners'
import swal from 'sweetalert';

const Analytics = () => {
  const { profile, upload }: any = useSelector((state) => state);
  const { allUploadData, getLoading, getError } = upload

  const dispatch = useDispatch()
  const [tab, setTab] = useState(1)
  const [openDragNdropModal, setOpenDragNdropModal] = useState(false)
  const [openProgressModal, setOpenProgressModal] = useState(false)
  const [showProgressOnly, setShowProgressOnly] = useState(false)
  const [singleData, setSingleData] = useState({})

  useEffect(() => {
    const userId = profile._id;
    handleFetchData({ userId, page: 1, analyzed: true })
  }, [])

  const handleFetchData = ({ userId, page = 1, analyzed }) => {
    dispatch(fetchUploadRequest(userId, page, analyzed))
  }

  const handleVideoDelete = ({id, name})=>{
    swal({
      title: `You are about deleting ${name}`,
      text: "Once deleted, you will not be able to recover this video",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    })
    .then(async(willDelete) => {
      if (willDelete) {
        await dispatch(deleteRequest(id))
        setOpenProgressModal(false)
        swal("Video deleted successfully", {
          icon: "success",
        });
        const userId = profile._id;
        handleFetchData({ userId, page: 1, analyzed: "all" })
      } 
      // else {
      //   swal("Your imaginary file is safe!");
      // }
    });
  }

  const handleChangeTab = (tab, analyzed) => {
    console.log({ tab, analyzed })
    const userId = profile._id;
    setTab(tab)
    handleFetchData({ userId, page: 1, analyzed })
  }

  const handleOpenModal = (progress) => {
    setShowProgressOnly(progress)
    !progress &&setOpenDragNdropModal(true)
    progress&&setOpenProgressModal(true)
  }
  const handleRedirect = (isRedirect, state) => {
    setSingleData(state)
    isRedirect? window.location.replace(`/app/analytics/match/${state._id}`):setOpenProgressModal(true)
  }
  
  return (
    <div className="all-video">

<h3 className="mb-4 mt-5">HeghtLight Reels </h3>
      <div className="all-files">
        <div className="search-section">
          <input type="text" placeholder="Search for  your uploads" /> <img src={SearchIcon} alt="search icon" />
        </div>
        <div className="video-tab">
          <h4 className="mb-4">All Video Uploads</h4>

          <div className="table-head d-flex mt-5">
            <div className="col-5 pl-5">
              File
            </div>
            <div className="col-2">
              Status
            </div>
            <div className="col-2">
              Date
            </div>
          </div>
          {getLoading ? <div className="d-flex align-items-center justify-content-center mt-5"><LoopingRhombusesSpinner color="#811aff" /></div> :
            <div>
              {
                allUploadData?.data && allUploadData?.data?.map((item, id) => (

                  <div className="table-row d-flex align-items-center p-3 mt-4">
                    <div className="col-5 d-flex align-items-center">
                      <div className="mr-2 ml-3"><img src={EmptyFile} alt="empty-file" /></div> <div className="pl-5 ml-5">{item.filename}</div>
                    </div>
                    <div className={`col-2 ${item.analyzed ? "success" : "pending"} status`}>
                      {item.analyzed ? "Success" : "Pending"}
                    </div>
                    <div className="col-2">
                      {moment(item.createdAt).startOf('minutes').fromNow()}
                    </div>
                    <div className="col-2">
                      <button className={item.analyzed ? "view" : "analyzing"} onClick={() => window.location.replace(`/app/highlight-reels/actions/${item._id}`)}>{item.analyzed ? "View Actions" :  "Analyzing"}</button>
                    </div>
                    <div className="col-2 delete" onClick={()=>handleVideoDelete({id:item._id, name:item.filename})}>
                      Delete
                    </div>
                  </div>
                ))
              }

              {
                !allUploadData?.data?.length &&
                <div className="no-file col-8 mx-auto mt-5">
                  <img src={EmptyFile} alt="empty-file" className="mx-auto mt-4 mb-4" />
                  <h3>
                    No Files Found
                  </h3>
                  <div className="text mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor, nullam id aliquam.</div>
                </div>}

            </div>}

        </div>

      </div>
      {openProgressModal && <UploadProgressModal setOpenProgressModal={setOpenProgressModal} singleData={singleData}  handleChangeTab={handleChangeTab} handleVideoDelete={handleVideoDelete}/>}
     
    </div>

  );
};

export default Analytics