import React, { useState, useRef } from "react";
import "./index.scss";
import Modal from "../layouts/Modal";
import FolderIcon from "../../assets/icons/folder.svg";
import { useSelector } from "react-redux";

const DragNdrop = ({
  setOpenProgressModal,
  handleChangeTab,
  singleData,
  handleVideoDelete,
}) => {
  const { upload }: any = useSelector((state) => state);

  const updatedUploadData = upload?.allUploadData?.data.filter(
    (item) => item._id === singleData._id
  )[0];

  return (
    <Modal>
      <div className="container">
        <div className="drop-n-drop col-lg-6 mx-auto p-5">
          {updatedUploadData.model_data.isFootballVideo ? (
            <div className="progress-section mt-5">
              {/* <h4>Your video is being analysed</h4> */}
              <div className="text mb-5">Your video is being analysed</div>
              <div className="d-flex justify-content-between">
                <div className="folder-section">
                  <img src={FolderIcon} alt="" /> {updatedUploadData.filename}
                </div>
                <div className="infor-section">
                  <div className="completed">
                    {updatedUploadData.statusText
                      ? updatedUploadData.statusText
                      : "0%"}{" "}
                    Completed
                  </div>
                </div>
              </div>

              <div className="progress-outer">
                <div
                  className="progress-inner"
                  style={{
                    width: `${
                      updatedUploadData.statusText
                        ? updatedUploadData.statusText
                        : 0
                    }`,
                  }}
                ></div>
              </div>
            </div>
          ) : (
            <div>The video is not a football match</div>
          )}
          <div className="d-flex min-cancel justify-content-between mt-5 col-lg-9 mx-auto">
            <button onClick={() => setOpenProgressModal(false)}>
              Minimize
            </button>
            {!updatedUploadData.model_data.isFootballVideo ? (
              <button
                className="cancel"
                onClick={() => setOpenProgressModal(false)}
              >
                Cancel
              </button>
            ) : (
              <button
                className="cancel"
                onClick={() =>
                  handleVideoDelete({
                    id: updatedUploadData._id,
                    name: updatedUploadData.filename,
                  })
                }
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DragNdrop;
