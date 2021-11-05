import React from "react";
import Modal from "../../../../components/layouts/Modal";
import EmailImage from "../../../../assets/images/email.png";
import "./index.scss";

const InvitationModal = ({ setShowInvitationModal }) => {
  return (
    <Modal>
      <div className="invitation_container">
        <img src={EmailImage} alt="email" />
        <p className="notification">
          Your Invite has been sent to jondough1@gmail.com
        </p>
        <div>
          <button
            className="close"
            onClick={() => setShowInvitationModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default InvitationModal;
