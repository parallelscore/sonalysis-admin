import './index.scss';
import { withRouter, Route, Switch } from 'react-router-dom';
import CreateClub from './CreateClub';

const Analystic = (props) => {
    const {
        match: { path },
    } = props;

    return (
        <div className=''>
            <Switch>
                {/* <Route exact path={path}>
            <Redirect to={`${path}`} />
          </Route> */}
                <Route exact path={`${path}`}>
                    <CreateClub />
                </Route>

                <Route path={`app/player-library/create-club`}>
                    <CreateClub />
                </Route>
            </Switch>
        </div>
    );
};

export default withRouter(Analystic);
