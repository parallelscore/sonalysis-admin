
import React, { useState, useRef } from "react";
import "./index.scss"
import Modal from "../layouts/Modal"
import FolderIcon from "../../assets/icons/folder.svg"
import { FileDrop } from 'react-file-drop'
import EmptyFile from "../../assets/icons/empty-file.svg"
import { useDispatch, useSelector } from "react-redux"
import { createUploadRequest } from "../../store/upload/actions"
import axios from "axios"

export interface CardProps {
  number?: number;
  desc?: string;
  image?: string;
  charts?: any;
}

const DragNdrop = ({ setShowModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [videoFile, setVideoFile] = useState<any>("");
  const dispatch = useDispatch()
  const { upload }: any = useSelector((state) => state);
  const { postLoading, postError, progress } = upload
  console.log({ postLoading, progress })
  const fileInputRef = useRef(null);
  const onFileInputChange = (event) => {
    const { files } = event.target;
    // do something with your files...
  }

  const onTargetClick = () => {
    // fileInputRef.current.click()
  }

  const handleOnchange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file)
  }

  const handleSubmit = (videoFile) => {
    // const formData = new FormData()
    // const file: any = videoFile
    // formData.append("file", file,);
    // dispatch(createUploadRequest(videoFile, handleChangeTab, setShowModal)) 
  }

  const downloadVideo = () => {
    const link: any = document.getElementById("link")
    const linkValue = link.value
    // setLinkLoading(true)
    // "https://res.cloudinary.com/sirsuccess/video/upload/v1616574885/pscore/Chelsea_0-2_Manchester_United___Premier_League_Highlights_msbcqa.mp4"
    axios({
      url: linkValue, //your url
      method: "GET",
      responseType: "blob" // important
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link_upload = new Blob([response.data], {
        type: `video/mp4`
      });
      // console.log({link_upload })
      const formData = new FormData();

      formData.append("file", link_upload, "url upload.mp4");
      // console.log("formData", formData.get("file"));
      handleSubmit(formData)
      // uploadURL(link_upload)
      // setLinkLoading(false)
    }).catch((error) => {
      console.log({ error })
      // setLinkLoading(false)
      // return toast({
      //   status: "error",
      //   description:
      //     "We can't get the video from the link, please try again",
      // });

    })
  };




  return (
    <Modal>

      <div className="container">
        <div className="edit-player col-lg-6 mx-auto p-5">
          <>
            <h4 className="text-center">Player details</h4>
            <form className=" col-lg-10 mt-5 mx-auto">
              <div className="form-group col-lg-4 mx-auto">
                <label htmlFor="clubLogo" className="logo">Upload Image</label>
                <input type="file" name="clubLogo" id="clubLogo" className="playerIma" />
              </div>
              <div className="col mt-3">
                <div className="form-group  d-flex justify-content-between gap-2">
                  <div className="col-md-7">
                    <label htmlFor="clubName">Player name</label>
                    <input type="text" className="form-control" id="clubName" placeholder="Enter club name" />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="Abbrivation">Jersey number</label>
                    <input type="text" className="form-control" id="Abbrivation" placeholder="eg. ClubFC" />
                  </div>
                </div>
                <div className="form-group  mt-4 ">

                  <label htmlFor="Location">Position</label>
                  <input type="text" className="form-control" id="Location" placeholder="Enter Location" />
                </div>
              </div>

            </form>
          </>
          <div className="d-flex min-cancel justify-content-between mt-5 col-lg-9 mx-auto">
            <button onClick={() => setShowModal(false)} className="">
            Done
            </button>
            <button className="cancel" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>

        </div>

      </div>
    </Modal>
  );
};

export default DragNdrop