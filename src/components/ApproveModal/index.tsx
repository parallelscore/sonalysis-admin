import React, { useState } from "react";
import "./index.scss";
import Modal from "../layouts/Modal";
import CancelIcon from "../../assets/icons/cancel.svg";
import { useFormik } from "formik";
import { Redirect, withRouter } from "react-router-dom";
import { postCall } from "../../api/request";
import swal from "sweetalert";
import EyeIcon from "../../assets/icons/eye-hide.svg";
import { useDispatch, useSelector } from "react-redux";
import cookie from "js-cookie";
import endPoint from "../../api/endPoints";
import { getProfileRequest } from "../../store/profile/actions";

export interface CardProps {
  number?: number;
  desc?: string;
  image?: string;
  charts?: any;
}

const Approved = ({ setIsLoginOpen, handleSignUpOpenModal, setShowModal }) => {
 
  const [errorMessage, setErrorMessage] = useState("");
  
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleOnchange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setErrorMessage("");
  //   postCall(endPoint.login, userData).then((res) => {
  //     setIsLoading(false);
  //     console.log({ res });
  //     if (res.status === 200) {
  //       cookie.set("auth", res.data.data.auth_token);
  //       dispatch(getProfileRequest(res.data.data.user));
  //       window.location.replace("/app");
  //       return;
  //     }
  //     setErrorMessage(res.data.message);
  //     setInterval(() => setErrorMessage(""), 8000);
  //   });
  // };
  return (
    <Modal>
      <div className="container">
        <div className="approved col-lg-6 mx-auto text-center">
          

            <div className="text">
              Please state why you are pending Jim’s club creation
            </div>
            <form >
              <div>

              <textarea className="col-lg-9" placeholder="Please type in your reason...">

              </textarea>
              </div>
              <div className="d-flex justify-content-between col-lg-7 mx-auto">

              <button className="btn-cancel" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn-submit" onClick={()=>setShowModal(false)}>Submit</button>
              </div>
            </form>
          
        </div>
      </div>
    </Modal>
  );
};

export default withRouter(Approved);
