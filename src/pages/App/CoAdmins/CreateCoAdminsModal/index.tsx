import React, { useState } from "react";
import "./index.scss";
import Modal from "../../../../components/layouts/Modal";
import UserIcon from "../../../../assets/images/user.png";
import swal from "sweetalert";
import { postCall, cloudinaryPostCall } from "../../../../api/request";
import endPoint from "../../../../api/endPoints";

const CreateCoAdmin = ({ showInvitationModal, setShowModal, name }) => {
  const [fileLogo, setFileLogo] = useState("");
  const [file, setFile]: any = useState("");
  const [coAdminData, setCoAdminData] = useState({
    fullName: "",
    email: "",
    photo: "",
    permission: [],
    role:""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnchange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "photo") {
      setFile(e.target.files[0]);
      setFileLogo(URL.createObjectURL(e.target.files[0]));
      return;
    }
    setCoAdminData({ ...coAdminData, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    createCoAdmin(file);
    setErrorMessage("");
  }

  function createCoAdmin(file) {
    var cloudinaryData = new FormData();
    cloudinaryData.append("upload_preset", "sonalysis-upload");
    cloudinaryData.append("file", file);

    cloudinaryPostCall(endPoint.cloudinaryPost, cloudinaryData).then((res) => {
      if (res?.status === 200) {
        const responseFetch = res.data;
        const { secure_url } = responseFetch;
        coAdminData.photo = secure_url;
        coAdminData.role = name==="Admins"?"admin":"co-admin"

        postCall(endPoint.createCoAdmin, coAdminData).then((res) => {
          setIsLoading(false);
          if (res?.status === 200) {
            swal("Success", "Co-Admin created successfully!", "success");
            setShowModal(false);
            showInvitationModal(coAdminData.email);
          }
          setErrorMessage(res.data.message);
          setInterval(() => setErrorMessage(""), 8000);
        });
      }
    });
  }
  const checkCompleted = (coAdminData.email && coAdminData.fullName && fileLogo)?true:false;

  return (
    <Modal>
      <div className="create_admin_modal_container">
        <div className="text">Create a {name}</div>

        <form onSubmit={handleSubmit}>
          <div className="user_icon_container">
            <div className="icon_container">
              <label htmlFor="photo" className="user-photo">
                <img src={fileLogo ? fileLogo : UserIcon} alt="logo" />
              </label>
              <input
                type="file"
                name="photo"
                id="photo"
                required
                className="logo-file d-none"
                onChange={handleOnchange}
                accept="image/*"
              />
            </div>
            <label htmlFor="photo" className="upload_image">
              {fileLogo ? "Change" : "Upload"} Image
            </label>
          </div>
          {errorMessage && (
            <div className="alert alert-danger mt-3" role="alert">
              {errorMessage}
            </div>
          )}

          <div className="mt-3">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              required
              placeholder="John Dough"
              onChange={handleOnchange}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              required
              id="email"
              placeholder="jondough1@gmail.com"
              onChange={handleOnchange}
            />
          </div>

          <div className="mt-4">
            <p>Grant Acesss</p>
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
            <button className="cancel" onClick={() => setShowModal(false)}>
              Cancel
            </button>{" "}
            <button className={checkCompleted?"invite_btn_done":"invite_btn"} disabled={!checkCompleted }>
              Send invite
              {isLoading && (
                <div
                  className="spinner-border text-light spinner-border-sm"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateCoAdmin;
