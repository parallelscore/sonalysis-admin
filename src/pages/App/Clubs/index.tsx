import './index.scss';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import AllUploadVideo from './AllClubs';
import CreateClub from './CreateClubs';
import ViewCoach from './ViewCoach';
import ClubDetails from './ClubDetails';
import AllCoaches from './AllCoaches';
// import AnalyzedMatch from "./AnalyzedMatch"
import PlayerDetail from './PlayerDetail';

import { useDispatch } from 'react-redux';

const Analystic = (props) => {
    const {
        match: { path },
    } = props;

    return (
        <div className=''>
            <Switch>
                <Route exact path={path}>
                    <Redirect to={`${path}/all-clubs`} />
                </Route>

                <Route exact path={`${path}/all-clubs`}>
                    <AllUploadVideo />
                </Route>
                <Route exact path={`${path}/all-coaches`}>
                    <AllCoaches />
                </Route>
                <Route exact path={`${path}/create-club`}>
                    <CreateClub />
                </Route>
                <Route exact path={`${path}/view-coach/:coach_id`}>
                    <ViewCoach />
                </Route>
                <Route exact path={`${path}/details`}>
                    <ClubDetails />
                </Route>

                {/* <Route path={`${path}/match/:id`}>
            <AnalyzedMatch/>
          </Route> */}
                <Route path={`${path}/player/:id`}>
                    <PlayerDetail />
                </Route>
            </Switch>
        </div>
    );
};

export default withRouter(Analystic);
