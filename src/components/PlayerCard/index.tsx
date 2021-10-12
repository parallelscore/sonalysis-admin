
import React, { useState, useRef } from "react";
import "./index.scss"
import EditPen from "../../assets/icons/edit-pen.svg"
import EditPlayer from "../EditPlayer"

const PlayerCard = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="player-card">
      <div className="card" key="" >
        <div className="col-12 d-flex justify-content-between align-items-center mb-4" >

        <div className="remove-player">Remove</div>
        <div className="edit-pen" onClick={()=>setShowModal(true)}><img src={EditPen} alt="edit " /></div>
        </div>
        <div className="image mb-2">
          <img src={""} alt="player" />
        </div>
        Edinson Cavani
        <div>Forward</div>
        <div className="no">No. 9</div>
      </div>
      {showModal&&<EditPlayer setShowModal={setShowModal} />}
    </div>

  );
};

export default PlayerCard