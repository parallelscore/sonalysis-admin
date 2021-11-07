import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import SearchIcon from "../../assets/icons/search-icon.svg";
import EmptyFile from "../../assets/icons/manchester-icon.svg";
import { getCall } from "../../api/request";
import endPoint from "../../api/endPoints";
import NoClub from "../../assets/images/no-club.svg";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "../../assets/icons/delete.svg"
import { fetchUploadRequest, deleteRequest } from "../../store/upload/actions";
import moment from "moment";
import { LoopingRhombusesSpinner } from "react-epic-spinners";
import swal from "sweetalert";

const CoachClubs = ({ clubs }) => {
  const { profile, upload }: any = useSelector((state) => state);
  const { allUploadData, getLoading, getError } = upload;

  const dispatch = useDispatch();
  const [tab, setTab] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [clubData, setClubData]: any = useState(clubs);

  useEffect(() => {
    const userId = profile._id;
    handleFetchData({ userId, page: 1, analyzed: "all" });
  }, []);

  const handleFetchData = ({ userId, page = 1, analyzed }) => {
    dispatch(fetchUploadRequest(userId, page, analyzed));
  };

  const clubDetail = (value) => {
    const club = clubs.filter((item) => item.status === value);
    setClubData(club);
    if (value === "all") setClubData(clubs);
  };

  const handleVideoDelete = ({ id, name }) => {
    swal({
      title: `You are about deleting ${name}`,
      text: "Once deleted, you will not be able to recover this video",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await dispatch(deleteRequest(id));

        swal("Video deleted successfully", {
          icon: "success",
        });
        const userId = profile._id;
        handleFetchData({ userId, page: 1, analyzed: "all" });
      }
      // else {
      //   swal("Your imaginary file is safe!");
      // }
    });
  };

  const handleChangeTab = (tab, status) => {
    console.log({ tab, status });
    const userId = profile._id;
    setTab(tab);
    clubDetail(status);
  };

  // to="/app/clubs/details"

  return (
    <div className="all-video">
      <div className="all-files">
        <div className="search-container d-flex">
          <div className="search-section ">
            <input type="text" placeholder="Search for  your club" />{" "}
            <img src={SearchIcon} alt="search icon" />
          </div>
          <button className="search-btn">Search</button>
        </div>
        <div className="video-tab">
          <h3 className="mb-4">All Clubs</h3>
          <div className="tab-section">
            <div
              className={`tab ${tab === 1 && "active-tab"}`}
              onClick={() => handleChangeTab(1, "all")}
            >
              All
            </div>
            <div
              className={`tab ${tab === 2 && "active-tab"}`}
              onClick={() => handleChangeTab(2, "approved")}
            >
              Approved
            </div>
            <div
              className={`tab ${tab === 3 && "active-tab"}`}
              onClick={() => handleChangeTab(3, "pending")}
            >
              Pending
            </div>
          </div>

          <div className="table-head d-flex mt-5">
            <div className="col-5 pl-5">CLUB</div>
            <div className="col-2">STATUS</div>
            <div className="col-2">DATE</div>
          </div>
          {isLoading ? (
            <div className="d-flex align-items-center justify-content-center mt-5">
              <LoopingRhombusesSpinner color="#811aff" />
            </div>
          ) : (
            <div>
              {clubs &&
                clubData?.map((item, id) => (
                  <div
                    className="table-row d-flex align-items-center p-3 mt-4"
                    key={id}
                  >
                    <div className="col-5 d-flex align-items-center">
                      <div className="mr-2 ml-3">
                        <img src={EmptyFile} alt="empty-file" />
                      </div>{" "}
                      <div className="pl-5 ml-5">{item.name}</div>
                    </div>
                    <div
                      className={`col-2 ${
                        item.status !== "pending" ? "success" : "pending"
                      } status`}
                    >
                      {item.status}
                    </div>
                    <div className="col-2">
                      {moment(item.createdAt).startOf("minutes").fromNow()}
                    </div>
                    <div className="col-2">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn analyzing dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Choose Action
                        </button>
                        <ul className="dropdown-menu">
                          <li className="dropdown-item">Edit</li>
                          <li className="dropdown-item">Approve</li>
                          <li className="dropdown-item">Disapprove</li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="col-2 delete"
                      onClick={() =>
                        handleVideoDelete({ id: item._id, name: item.filename })
                      }
                    >
                      <img src={DeleteIcon} alt="delete icon" />
                    </div>
                  </div>
                ))}

              {!clubData.length && (
                <div className="no-file col-8 mx-auto mt-5">
                  <img
                    src={NoClub}
                    alt="empty-file"
                    className="mx-auto mt-4 mb-4"
                  />
                  <h3>No club Found</h3>
                  <div className="text mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Tortor, nullam id aliquam.
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoachClubs;
