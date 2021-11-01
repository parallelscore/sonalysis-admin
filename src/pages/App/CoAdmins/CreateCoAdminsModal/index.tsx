import React, { useState } from "react";
import "./index.scss";
import Modal from "../../../../components/layouts/Modal";
import UserIcon from "../../../../assets/images/user.png";

const CreateCoAdmin = ({ setShowInvitationModal, setShowModal }) => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
  });
  const handleFileUpload = () => {
    console.log("get image from user's device");
  };

  const handleOnchange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };
  const hide = () => {
    setShowInvitationModal(true);
    setShowModal(false);
  };
  return (
    <Modal>
      <div className="create_admin_modal_container">
        <div className="text">Create a Co-admin</div>

        <form>
          <div className="user_icon_container">
            <div className="icon_container">
              <img src={UserIcon} alt="user icon" />
            </div>
            <div className="upload_image" onClick={handleFileUpload}>
              Upload Image
            </div>
          </div>

          <div className="mt-3">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="John Dough"
              onChange={handleOnchange}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="jondough1@gmail.com"
              onChange={handleOnchange}
            />
          </div>

          <div className="mt-4">
            <p>Edit Acesss</p>
            <div className="d-flex teams_container">
              <input
                type="checkbox"
                id="teams"
                name="teams"
                value="teams"
                className="teams"
              />
              <label htmlFor="teams">Teams/Clubs</label>
            </div>
            <div className="d-flex player_container">
              <input
                type="checkbox"
                id="players"
                name="players"
                value="players"
                className="players"
              />
              <label htmlFor="players">Players</label>
            </div>
          </div>
          <div className="d-flex btns_container">
            <button
              className="cancel"
              onClick={() => setShowInvitationModal(false)}
            >
              Cancel
            </button>{" "}
            <button className="invite_btn" onClick={hide}>
              Send invite
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateCoAdmin;
