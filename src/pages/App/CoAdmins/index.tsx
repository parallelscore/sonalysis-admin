import React, { useState, useEffect } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import SearchIcon from "../../../assets/icons/search-icon.svg";
import CoachPhoto from "../../../assets/images/coach-photo.svg";
import CreateCoAdmin from "./CreateCoAdminsModal";
import InvitationModal from "./InvitationModal";
import { LoopingRhombusesSpinner } from "react-epic-spinners";
import endPoint from "../../../api/endPoints";
import { getCall } from "../../../api/request";

const CoAdmins = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [noCoAdminData, setNoCoAdminData] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [coAdminData, setCoAdminData]: any = useState([]);

  useEffect(() => {
    getAllCoAdmins();
  }, []);

  const getAllCoAdmins = () => {
    setIsLoading(true);
    getCall(endPoint.getAllCoAdmin)
      .then((response) => {
        console.log("response for admin data", response.data.data);
        if (response.status === 200) {
          setCoAdminData(response.data.data);
          setIsLoading(false);
        }
        if (response.status === 404 || response.status === 403) {
          setNoCoAdminData(true);
        }
      })
      .catch(() => {});
  };
  console.log("adminn", coAdminData.email);

  return (
    <div className="co_admin_container">
      <div className="title">Co-Admins (8)</div>

      <div className="search_container d-flex">
        <button className="new_btn" onClick={() => setShowModal(true)}>
          Create new
        </button>

        <div className="search_section ">
          <input type="text" placeholder="Search for  your club" />{" "}
          <img src={SearchIcon} alt="search icon" />
        </div>
        <button className="search_btn">Search</button>
      </div>
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center mt-5">
          <LoopingRhombusesSpinner color="#fff" />
        </div>
      ) : (
        <div className="card_section d-flex justify-content-evenly flex-wrap">
          {coAdminData.map((admin) => (
            <div className="card_coach mt-5 mr-5">
              <img src={CoachPhoto} alt="coach" />
              <div className="name mt-2">{admin.fullName}</div>
              <div className="email">{admin.email}</div>

              <Link to={`/app/view-co-admins/${admin._id}`}>
                <button>View</button>
              </Link>
            </div>
          ))}
        </div>
      )}
      {noCoAdminData && (
        <div className="no_data">
          <h4>There are no Co-Admin data at the moment.</h4>
        </div>
      )}
      {showModal && (
        <CreateCoAdmin
          setShowModal={setShowModal}
          setShowInvitationModal={setShowInvitationModal}
        />
      )}
      {showInvitationModal && (
        <InvitationModal setShowInvitationModal={setShowInvitationModal} />
      )}
    </div>
  );
};

export default CoAdmins;
