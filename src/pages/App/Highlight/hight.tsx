import { useState } from 'react';

import Football from '../../../assets/images/football.svg';
import './index.scss';
import { withRouter } from 'react-router-dom';

const AnalyzedMatch = () => {
    const [selectedVideo, setSelectedVideo] = useState('dribble');

    const dataReels: any = {
        freekick:
            'https://parallelscore-staging.s3.amazonaws.com//home/pmunis/SonalysisFile/SonalysisVideoProcessingService//jobs/2b278203-fc32-42a1-bfbe-fb487b372722/actionsdetected/vjnVWZKDGTQjiUn7qFkjDu_0_3.mp4',
        dribble:
            'https://parallelscore-staging.s3.amazonaws.com//home/pmunis/SonalysisFile/SonalysisVideoProcessingService//jobs/2b278203-fc32-42a1-bfbe-fb487b372722/actionsdetected/vjnVWZKDGTQjiUn7qFkjDu_4_6.mp4',
        tackle: 'https://parallelscore-staging.s3.amazonaws.com//home/pmunis/SonalysisFile/SonalysisVideoProcessingService//jobs/2b278203-fc32-42a1-bfbe-fb487b372722/highlightreels/26cf1c79-f92d-422a-9b7c-d728f6112e23.mp4',
    };

    const keyReel: any = Object.keys(dataReels);

    const handleVideoChange = (video) => {
        const vid: any = document.getElementById('playBackVideo');
        vid.load();
        // alert(dataReels[video])
        setSelectedVideo(video);
        setTimeout(() => {
            if (vid) {
                vid.play();
                // vid.current.load();
                // vid.oncanplay = function () {
                //   vid.autoplay = true
                // };
            }
        }, 1000);
    };

    return (
        <div className='match-stats'>
            <h3 className='mb-4 mt-5'>HeghtLight Reels Actions</h3>

            <h3 className='mt-5'>Playing: {selectedVideo}</h3>
            <div className='video-section d-lg-flex '>
                <div className='col-lg-6 football-vidoe mt-'>
                    <video width='320' height='240' controls id='playBackVideo'>
                        <source
                            src={dataReels[selectedVideo]}
                            type='video/mp4'
                        />
                        {/* <source src="movie.ogg" type="video/ogg"> */}
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className='video-section-right ml-5'>
                    <h3>Actions</h3>
                    <div>
                        {keyReel.map((item) => (
                            <div
                                className='card-img'
                                onClick={() => handleVideoChange(item)}
                            >
                                <img src={Football} alt='video' />{' '}
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <h5 className="mt-5">Goal Information {selectedVideo}</h5> */}
            {/* <div className="infor-card col-lg-4">
        <div className="player-card-section-cards">
          {team.Players.slice(8, 10).map((item, index) => (
            <div className="card-t " key={index}>
              <div className="image mb-2">
                <img src={item.Image} alt="player" />
              </div>
              <div className="content pl-5">
                {item.Name}
                <div>{item.Position}</div>
                <div className="no">No. {index + 1}</div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
        </div>
    );
};

export default withRouter(AnalyzedMatch);
