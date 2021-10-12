import React, { useState, useEffect } from 'react';
import "./index.scss"
import UploadIcon from "../../../../assets/icons/upload-icon.svg"
import SearchIcon from "../../../../assets/icons/search-icon.svg"
import EmptyFile from "../../../../assets/icons/empty-file.svg"
import NoClub from "../../../../assets/images/no-club.svg"

import UploadProgressModal from "../../../../components/UploadProgressModal"
import { useDispatch, useSelector } from "react-redux"
import { fetchUploadRequest, deleteRequest } from "../../../../store/upload/actions"
import moment from "moment"
import { LoopingRhombusesSpinner } from 'react-epic-spinners'
import swal from 'sweetalert';
import { Link } from "react-router-dom"

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
    handleFetchData({ userId, page: 1, analyzed: "all" })
  }, [])

  const handleFetchData = ({ userId, page = 1, analyzed }) => {
    dispatch(fetchUploadRequest(userId, page, analyzed))
  }

  const handleVideoDelete = ({ id, name }) => {
    swal({
      title: `You are about deleting ${name}`,
      text: "Once deleted, you will not be able to recover this video",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    })
      .then(async (willDelete) => {
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
    !progress && setOpenDragNdropModal(true)
    progress && setOpenProgressModal(true)
  }
  const handleRedirect = (isRedirect, state) => {
    setSingleData(state)
    isRedirect ? window.location.replace(`/app/analytics/match/${state._id}`) : setOpenProgressModal(true)
  }

  return (
    <div className="all-video">

      <div className="top-hero col-lg-8">
        <h2 className="col-lg-10 text-center mx-auto mb-4">
          Build your own football
          gaints
        </h2>
        <div className="text mb-4">
          Create your own football club and build yout team
        </div>
        <Link to="/app/player-library/create-club">

          <button >
            Create Your club
          </button>
        </Link>
      </div>
      <div className="all-files">
        <div className="search-container d-flex">

          <div className="search-section ">
            <input type="text" placeholder="Search for  your club" /> <img src={SearchIcon} alt="search icon" />
          </div>
          <button>Search</button>
        </div>
        <div className="video-tab">
          <h3 className="mb-4">Clubs Created</h3>
          <div className="tab-section">
            <div className={`tab ${tab === 1 && "active-tab"}`} onClick={() => handleChangeTab(1, "all")}>All</div>
            <div className={`tab ${tab === 2 && "active-tab"}`} onClick={() => handleChangeTab(2, true)}>Approved</div>
            <div className={`tab ${tab === 3 && "active-tab"}`} onClick={() => handleChangeTab(3, false)}>Pending</div>

          </div>

          <div className="col-10 table-head d-flex mt-5">
            <div className="col-5 pl-5">
              Club
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
                !allUploadData?.data && allUploadData?.data?.map((item, id) => (

                  <div className="col-lg-10 table-row d-flex align-items-center p-3 mt-4">
                    <div className="col-5 d-flex align-items-center">
                      <div className="mr-2 ml-3"><img src={EmptyFile} alt="empty-file" /></div> <div className="pl-5 ml-5">{item.filename}</div>
                    </div>
                    <div className={`col-2 ${item.analyzed ? "success" : "pending"} status`}>
                      {item.analyzed ? "Success" : "Pending"}
                    </div>
                    <div className="col-2">
                      {moment(item.createdAt).startOf('minutes').fromNow()}
                    </div>
                    {/* <div className="col-2">
                      <button className={item.analyzed ? "view" : "analyzing"} onClick={() => handleRedirect(item.analyzed, item)}>{item.analyzed ? "View analytics" : item.model_data.isFootballVideo? "Not a football" : "Analyzing"}</button>
                    </div> */}
                    <div className="col-2 delete" onClick={() => handleVideoDelete({ id: item._id, name: item.filename })}>
                      Delete
                    </div>
                  </div>
                ))
              }

              {
                allUploadData?.data?.length &&
                <div className="no-file col-lg-8  mt-5">
                  <img src={NoClub} alt="empty-file" className="mx-auto mt-4 mb-4" />
                  <h3>
                    No Clubs created yet
                  </h3>
                  <div className="text mt-4 col-lg-5 mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor, nullam id aliquam.</div>
                </div>}

            </div>}

        </div>

      </div>
      {openProgressModal && <UploadProgressModal setOpenProgressModal={setOpenProgressModal} singleData={singleData} handleChangeTab={handleChangeTab} handleVideoDelete={handleVideoDelete} />}
      
    </div>

  );
};

export default Analytics