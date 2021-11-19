import React, { useState, useEffect } from 'react';
import "./index.scss"
import CoachPhoto from "../../../../assets/images/coach-photo.svg"
import {getCall} from "../../../../api/request"
import endPoint from "../../../../api/endPoints"
import Back from "../../../../assets/icons/back-arrow.svg";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { fetchUploadRequest, deleteRequest } from "../../../../store/upload/actions"


const AllCoaches = ({history}) => {
  const { profile, upload }: any = useSelector((state) => state);
  const { allUploadData, getLoading, getError } = upload

  const dispatch = useDispatch()

  const coachData = allUploadData.filter((coach)=>coach.role==="coach")

  useEffect(() => {
    const userId = profile._id;
    handleFetchData({ userId, page: 1, analyzed: "all" })
    
  }, [])


  const handleFetchData = ({ userId, page = 1, analyzed }) => {
    dispatch(fetchUploadRequest(userId, page, analyzed))
  }



 

  const getApprovedOrPending = (clubs, value)=>{
    return clubs.filter((item)=>item.status === value).length
  }

  return (
    

      <div className="top-coach">
        <div
        className="d-flex mt-5 mb-5 mr-3 back "
        onClick={() => history.goBack()}
      >
        <img src={Back} alt="back arrow" className="mr-5" />
        {"   "} Back to Clubs Library
      </div>
        <div className="card-section d-flex justify-content-evenly flex-wrap">
          {coachData.map((coach) => (
            <div className="card-coach mt-5 mr-5 ml-5">
              <img src={CoachPhoto} alt="coach photo" />
              <div className="name mt-2">
                Name:
              </div>
              <div className="">
                {coach.fullName}
              </div>
              <div className="name mt-2">
                Approved Clubs
              </div>
              <div className="approve">
                {getApprovedOrPending(coach.clubs, "approved")}
              </div>
              <div className="name">
                Pending Clubs
              </div>
              <div className="pending">
              {getApprovedOrPending(coach.clubs, "pending")}
              </div>

              <Link to={`/app/clubs/view-coach/${coach._id}`}><button>View</button></Link>
            </div>
          ))}
        </div>
      </div>

  );
};

export default withRouter(AllCoaches)