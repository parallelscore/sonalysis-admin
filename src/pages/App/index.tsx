import './index.scss';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import Analytics from './Clubs';
import Dashboard from './Dashboard';
import CoAdmins from './CoAdmins';
import ViewCoAdmins from './CoAdmins/ViewCoAdmins';

const App = (props) => {
    const {
        match: { path },
    } = props;

    return (
        <div className=''>
            <DashboardLayout>
                <Switch>
                    <Route exact path={path}>
                        <Redirect to={`${path}/dashboard`} />
                    </Route>
                    <Route path={`${path}/dashboard`}>
                        <Dashboard />
                    </Route>
                    <Route path={`${path}/clubs`}>
                        <Analytics />
                    </Route>

                    {/* <Route  path={`${path}/admins`}>
            <PlayerLibrary />
          </Route> */}
                    <Route path={`${path}/co-admins/:admin_id`}>
                        <ViewCoAdmins />
                    </Route>
                    <Route path={`${path}/co-admins`}>
                        <CoAdmins name={'Co-Admins'} endpoint={'co-admin'} />
                    </Route>
                    <Route path={`${path}/admins`} exact>
                        <CoAdmins name={'Admins'} endpoint={'admin'} />
                    </Route>
                </Switch>
            </DashboardLayout>
        </div>
    );
};

export default withRouter(App);
