import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Back from "../../../../../assets/icons/back-arrow.svg";
import Step1 from "../../../../../assets/images/step-1.svg";
import Step2 from "../../../../../assets/images/step-2.svg";
import EmptyFile from "../../../../../assets/icons/empty-file.svg"
import { LoopingRhombusesSpinner } from 'react-epic-spinners'
import EditPlayer from "../../../../../components/EditPlayer"
import PlayerCard from "../../../../../components/PlayerCard"

import "./index.scss"
import moment from "moment"


const CreateClub = ({ handleChangeStep }) => {
  const { profile, upload }: any = useSelector((state) => state);
  const { allUploadData, getLoading, getError, } = upload

  console.log(allUploadData.data)
  // const { url, TeamA, TeamB } = model_data;
  const [tab, setTab] = useState(1)
  const [showEditModal, setShowEditModal] = useState(false)
  const [clubTeam, setClubTeam] = useState<any>("TeamA");
  // const team: any = clubTeam === "TeamB" ? TeamB : TeamA;


  const handleChangeTab = (tab, analyzed) => {
    setTab(tab)
  }

  return (
    <div className="step-two">
      <div className="tab-section mt-5">
        <div className={`tab ${tab === 1 && "active-tab"}`} onClick={() => handleChangeTab(1, "all")}>Starting 11</div>
        <div className={`tab ${tab === 2 && "active-tab"}`} onClick={() => handleChangeTab(2, true)}>Substitutes</div>
        <div className={`tab ${tab === 3 && "active-tab"}`} onClick={() => handleChangeTab(3, false)}>Reserves</div>

      </div>

      <div className=" form col-lg-8 mt-5">
        <div className="form-group  mt-5 ">
          <div >Upload your players details</div>
          <button  className="upload-player px-3" onClick={() => setShowEditModal(true)}>Upload player</button> <label htmlFor="csvFile"  className="upload-player pt-2 px-3 csv-btn" >Upload players from CSV file</label> <button className="btn players-add">2</button>
          <input type="file" name="csvFile" id="csvFile" className="logo-file" />
        </div>
      </div>

      <div className="player-card-section-cards mt-5">
       
        <PlayerCard />
        <PlayerCard />
      </div>

      <div className="col-lg-7 d-flex justify-content-between">

        <button className="btn btn-secondary mt-5" onClick={() => handleChangeStep(1)}>
          Previous step
        </button>
        <button className="btn btn-primary mt-5" onClick={() => handleChangeStep(2)}>
          NEXT
        </button>
      </div>
      {showEditModal && <EditPlayer setShowModal={setShowEditModal} />}
    </div>
  );
};

export default withRouter(CreateClub)