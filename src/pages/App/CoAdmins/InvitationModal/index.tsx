import React from "react";
import Modal from "../../../../components/layouts/Modal";
import EmailImage from "../../../../assets/images/email.png";
import "./index.scss";

const InvitationModal = () => {
  return (
    <Modal>
      <div className="invitation_container">
        <img src={EmailImage} alt="email image" />
        <p className="notification">
          Your Invite has been sent to jondough1@gmail.com
        </p>
      </div>
    </Modal>
  );
};

export default InvitationModal;
