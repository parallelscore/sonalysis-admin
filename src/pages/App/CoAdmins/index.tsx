import React, { useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import SearchIcon from "../../../assets/icons/search-icon.svg";
import CoachPhoto from "../../../assets/images/coach-photo.svg";
import CreateCoAdmin from "./CreateCoAdminsModal";
import InvitationModal from "./InvitationModal";

const CoAdmins = () => {
  const [showModal, setShowModal] = useState(false);
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const coAdmins = [
    {
      name: "Amani Kanu",
      email: "amani35@gmail.com",
    },
    {
      name: "Amani Kanu",
      email: "amani35@gmail.com",
    },
    {
      name: "Amani Kanu",
      email: "amani35@gmail.com",
    },
    {
      name: "Amani Kanu",
      email: "amani35@gmail.com",
    },
    {
      name: "Amani Kanu",
      email: "amani35@gmail.com",
    },
    {
      name: "Amani Kanu",
      email: "amani35@gmail.com",
    },
    {
      name: "Amani Kanu",
      email: "amani35@gmail.com",
    },
    {
      name: "Amani Kanu",
      email: "amani35@gmail.com",
    },
  ];
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
      <div className="card_section d-flex justify-content-evenly flex-wrap">
        {coAdmins.map((admin) => (
          <div className="card_coach mt-5 mr-5">
            <img src={CoachPhoto} alt="coach photo" />
            <div className="name mt-2">{admin.name}</div>
            <div className="email">{admin.email}</div>

            <Link to="/app/clubs/view-coach">
              <button>View</button>
            </Link>
          </div>
        ))}
      </div>
      {/* {showModal && (
        <CreateCoAdmin
          // setShowModal={setShowModal}
          setShowInvitationModal={setShowInvitationModal}
        />
      )} */}
      {showModal && (
        <CreateCoAdmin
          setShowModal={setShowModal}
          setShowInvitationModal={setShowInvitationModal}
        />
      )}
      {showInvitationModal && <InvitationModal />}
    </div>
  );
};

export default CoAdmins;
