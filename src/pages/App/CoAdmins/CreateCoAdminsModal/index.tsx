import React, { useState } from "react";
import "./index.scss";
import Modal from "../../../../components/layouts/Modal";
import UserIcon from "../../../../assets/images/user.png";
import swal from "sweetalert";
import axios from "axios";
import { getCall, postCall } from "../../../../api/request";
import endPoint from "../../../../api/endPoints";

const CreateCoAdmin = ({ setShowInvitationModal, setShowModal }) => {
  const [fileLogo, setFileLogo] = useState("");
  const [file, setFile]: any = useState("");
  const [coAdminData, setCoAdminData] = useState({
    fullName: "",
    email: "",
    photo: "",
    permission: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnchange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "logo") {
      name === "logo" && setFileLogo(URL.createObjectURL(e.target.files[0]));
      return setFile(e.target.file);
    }
    setCoAdminData({ ...coAdminData, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    // getImgLink(file);
    // createCoAdmin(imgName)
    setErrorMessage("");
  }

  function createCoAdmin(imgName) {
    coAdminData.photo = imgName;
    postCall(endPoint.createCoAdmin, coAdminData).then((res) => {
      setIsLoading(false);
      if (res?.status === 200) {
        console.log("uploaded co admin data", res.data.data);
        console.log("uploaded co admin dataaa", coAdminData);
        swal("Success", "Co Admin created successfully!", "success");
        setShowInvitationModal(true);
        setShowModal(false);
      }
      setErrorMessage(res.data.message);
      setInterval(() => setErrorMessage(""), 8000);
    });
  }

  return (
    <Modal>
      <div className="create_admin_modal_container">
        <div className="text">Create a Co-admin</div>

        <form>
          <div className="user_icon_container">
            <div className="icon_container">
              <label htmlFor="clubLogo" className="logo">
                {fileLogo && <img src={UserIcon} alt="logo" />}
                {!fileLogo && "Upload Your Logo"}
              </label>
              <input
                type="file"
                name="logo"
                id="coAdminLogo"
                className="logo-file"
                onChange={handleOnchange}
                accept="image/*"
              />
            </div>
            <div className="upload_image">Upload Image</div>
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
            <button className="invite_btn" onClick={handleSubmit}>
              Send invite
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateCoAdmin;
