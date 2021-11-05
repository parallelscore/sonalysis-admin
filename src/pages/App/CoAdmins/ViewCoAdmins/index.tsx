import React from "react";
import "../../Clubs/ViewCoach/index.scss";
import Back from "../../../../assets/icons/back-arrow.svg";
import CoachPhoto from "../../../../assets/images/coach-photo.svg";
import { useSelector } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import CoAdminClubs from "../../../../components/CoAdminClubs";

const ViewCoAdmins = ({ history }) => {
  const { upload }: any = useSelector((state) => state);
  const { allUploadData } = upload;
  let { admin_id } = useParams();
  const coAdminData = allUploadData.filter((item) => item._id === admin_id)[0];

  return (
    <div className="all-video">
      <div className="top-coach">
        <div
          className="d-flex mt-5 mb-5 mr-3 back "
          onClick={() => history.goBack()}
        >
          <img src={Back} alt="back arrow" className="mr-5" />
          {"   "} Back to co-admins
        </div>
        <div className="d-flex align-items-center">
          <div className="coach-photo mr-5">
            <img src={CoachPhoto} alt="A c0-Admin" />
          </div>
          <div className="ml-5">
            <div className="name">{coAdminData.fullName}</div>
            <div className="mt-2">{coAdminData.email}</div>
            <div className="mt-2">{coAdminData?.location}</div>
          </div>
        </div>
        <button className="delete">Delete</button>
        <button className="new-btn">Revoke Edit Access</button>
      </div>

      <CoAdminClubs clubs={coAdminData.clubs} />
    </div>
  );
};

export default withRouter(ViewCoAdmins);
