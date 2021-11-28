import { useState} from 'react';
import { useParams } from 'react-router-dom';
import Back from '../../../../assets/icons/back-arrow.svg';
import Graph from '../../../../assets/images/graph.svg';
import SearchIcon from '../../../../assets/icons/search-icon.svg';
import {useSelector } from 'react-redux';
import './index.scss';
import { withRouter } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const AnalyzedMatch = (props) => {
    const [clubTeam, setClubTeam] = useState<any>('TeamA');
    const { upload }: any = useSelector((state) => state);
    let { id } = useParams();
    const uploadData = upload.allUploadData.data.filter(
        (item) => item._id === id
    )[0];
    const { url, TeamA, TeamB } = uploadData.model_data;


    const team: any = clubTeam === 'TeamB' ? TeamB : TeamA;

    return (
        <div className='player'>
            <div
                className='d-flex mt-5 mb-5 mr-3 back '
                onClick={() => props.history.goBack()}
            >
                <img src={Back} alt='back arrow' className='mr-5' />
                {'   '} Back to Players List
            </div>
            <h3 className='mb-4'>Player Stats</h3>

            <div className='dowload-section'>
                <div className='search-section'>
                    <input type='text' placeholder='Search for  your uploads' />{' '}
                    <img src={SearchIcon} alt='search icon' />
                </div>
                <button>Download matrics</button>
            </div>
            <div className='player-card-section mt-5'>
                <div className='player-card-detail'>
                    <div className='img-section'>
                        <div className='images'>
                            <img
                                src={TeamA.Players[9].Image}
                                alt={`${TeamA.Players[9].Name} photo`}
                            />
                        </div>
                        <div className='details pl-5'>
                            <div className='names pl-5'>
                                <div>{TeamA.Players[9].Name.split(' ')[0]}</div>
                                <h2>{TeamA.Players[9].Name.split(' ')[1]}</h2>
                            </div>
                            <div className='positions mt-3 '>
                                <div className='postion'>
                                    <div className='title'>Position</div>
                                    <div className=''>
                                        {TeamA.Players[9].Position}
                                    </div>
                                </div>
                                <div className='postion'>
                                    <div className='title'>Jersey Number</div>
                                    <div className=''>
                                        {TeamA.Players[9].Jersey_no}
                                    </div>
                                </div>
                                <div className='postion'>
                                    <div className='title'>Team</div>
                                    <div className=''>
                                        {TeamA.Players[9].Team}
                                    </div>
                                </div>
                            </div>
                            <div className='circular-progress-bar mt-5 mb-5 d-flex justify-content-evenly'>
                                <div
                                    style={{
                                        width: 100,
                                        height: 100,
                                        fontSize: '13px',
                                    }}
                                >
                                    <CircularProgressbar
                                        value={60}
                                        text={`${60}%`}
                                        styles={buildStyles({
                                            textSize: '16px',
                                            // How long animation takes to go from one percentage to another, in seconds
                                            pathTransitionDuration: 0.5,
                                            // Colors
                                            pathColor: ` #47DC40`,
                                            textColor: '#fff',
                                            trailColor: '#CDFDE9',
                                            backgroundColor: '#47DC40',
                                        })}
                                    />
                                    <div className='mt-2'>Ball Possession</div>
                                </div>
                                <div
                                    style={{
                                        width: 100,
                                        height: 100,
                                        fontSize: '13px',
                                    }}
                                >
                                    <CircularProgressbar
                                        value={60}
                                        text={`${60}%`}
                                        styles={buildStyles({
                                            textSize: '16px',
                                            // How long animation takes to go from one percentage to another, in seconds
                                            pathTransitionDuration: 0.5,
                                            // Colors
                                            pathColor: ` #47DC40`,
                                            textColor: '#fff',
                                            trailColor: '#CDFDE9',
                                            backgroundColor: '#47DC40',
                                        })}
                                    />
                                    <div className='mt-2'>Long Pass Acc.</div>
                                </div>
                                <div
                                    style={{
                                        width: 100,
                                        height: 100,
                                        fontSize: '13px',
                                    }}
                                >
                                    <CircularProgressbar
                                        value={60}
                                        text={`${60}%`}
                                        styles={buildStyles({
                                            textSize: '16px',
                                            // How long animation takes to go from one percentage to another, in seconds
                                            pathTransitionDuration: 0.5,
                                            // Colors
                                            pathColor: ` #47DC40`,
                                            textColor: '#fff',
                                            trailColor: '#CDFDE9',
                                            backgroundColor: '#47DC40',
                                        })}
                                    />
                                    <div className='mt-2'>Short Pass Acc.</div>
                                </div>
                            </div>
                            <div className='action-section d-flex justify-content-evenly'>
                                <div className='action'>
                                    <div>2</div>
                                    <div>Goals</div>
                                </div>
                                <div className='action'>
                                    <div>2</div>
                                    <div>Goals</div>
                                </div>
                                <div className='action'>
                                    <div>2</div>
                                    <div>Goals</div>
                                </div>
                                <div className='action'>
                                    <div>2</div>
                                    <div>Goals</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='player-card-section-title mb-4 mt-3 mb-3'>
                        Speed Graph (In Kilometer/second)
                    </div>
                    <div className='player-card-section-graph m-5 '>
                        <img src={Graph} alt='graph' />
                    </div>
                </div>

                <h3 className='mb-4 mt-5'>Other Players</h3>

                <div className='player-card-section-cards'>
                    {team.Players.map((item, index) => (
                        <div className='card' key={index}>
                            <div className='image mb-2'>
                                <img src={item.Image} alt='player' />
                            </div>
                            {item.Name}
                            <div>{item.Position}</div>
                            <div className='no'>No. {index + 1}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default withRouter(AnalyzedMatch);
