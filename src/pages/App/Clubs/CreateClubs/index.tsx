import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCall, postCall } from "../../../../api/request";
import endPoint from "../../../../api/endPoints";
import swal from "sweetalert";
import Back from "../../../../../assets/icons/back-arrow.svg";
import Step1 from "../../../../../assets/images/step-1.svg";
import Step2 from "../../../../../assets/images/step-2.svg";
import EmptyFile from "../../../../../assets/icons/empty-file.svg";
import { LoopingRhombusesSpinner } from "react-epic-spinners";
import EditPlayer from "../../../../components/EditPlayer";
import PlayerCard from "../../../../components/PlayerCard";
import Create from "../../../../components/CreateClub";

import "./index.scss";
import moment from "moment";

const CreateClub = ({ handleChangeStep }) => {
  const { profile, upload }: any = useSelector((state) => state);
  const { allUploadData, getLoading, getError } = upload;

  console.log(allUploadData.data);
  // const { url, TeamA, TeamB } = model_data;
  const [tab, setTab] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [clubTeam, setClubTeam] = useState<any>({});
  const [postLoading, setPostLoading] = useState(false);
  const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const handleChangeTab = (tab, analyzed) => {
    setTab(tab);
  };

  const sendCSV = (e) => {
    setPostLoading(true);
    const data = e.target.files[0];
    let formData = new FormData();
    formData.append("file", data);
    console.log({ data });
    postCall(endPoint.csvUpload, formData)
      .then((response) => {
        setPostLoading(false);
        console.log("response.data.data vnvkvnklv", response);
        if (response.status === 200) {
          swal("Success", "players created successfully!", "success");
          return;
        }
        swal("Error", "something happen try again", "error");
      })
      .catch(() => {
        setPostLoading(false);
        swal("Error", "something happen try again", "error");
      });
  };


  return (
    <div className="step-two">
      <Create setClubTeam={setClubTeam}/>
      <div className="title mt-5 pt-5">All Players</div>
      <div className="tab-section mt-3">
        <div
          className={`tab ${tab === 1 && "active-tab"}`}
          onClick={() => handleChangeTab(1, "all")}
        >
          Starting 11
        </div>
        <div
          className={`tab ${tab === 2 && "active-tab"}`}
          onClick={() => handleChangeTab(2, true)}
        >
          Substitutes
        </div>
        <div
          className={`tab ${tab === 3 && "active-tab"}`}
          onClick={() => handleChangeTab(3, false)}
        >
          Reserves
        </div>
      </div>

      <div className=" form col-lg-8 mt-5">
        <div className="form-group  mt-5 ">
          <div>View and edit and delete players</div>
          <div className="d-flex align-items-center mt-4">
          <button className="completete-players px-3">
            Players complete
          </button>{" "}
          <button className="btn players-add">11</button>{" "}
          <form>
            <label htmlFor="csv-upload" className=" upload-btn ">
              {postLoading ? (
                <LoopingRhombusesSpinner />
              ) : (
                "Upload players via CSV"
              )}
            </label>
            <input
              type="file"
              id="csv-upload"
              className="d-none"
              accept="text/csv"
              onChange={sendCSV}
            />
          </form>
          </div>
        </div>
      </div>

      {/* <div className="player-card-section-cards mt-5">
        {data.map((item) => (
          <PlayerCard />
        ))}
      </div> */}

      {showEditModal && <EditPlayer setShowModal={setShowEditModal} />}
    </div>
  );
};

export default withRouter(CreateClub);
