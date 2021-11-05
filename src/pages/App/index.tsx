import "./index.scss";
import {
  withRouter,
  Route,
  Switch,
  Redirect,
  useRouteMatch,
} from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Analytics from "./Clubs";
import Dashboard from "./Dashboard";
import Recruitment from "./Recruitment";
import Hightlight from "./Highlight/index";
import Actions from "./Highlight/hight";

import PlayerLibrary from "./PlayerLibrary";
import CoAdmins from "./CoAdmins";
import ApproveModal from "../../components/ApproveModal";
import CreateCoAdmin from "./CoAdmins/CreateCoAdminsModal";
import InvitationModal from "./CoAdmins/InvitationModal";
import ViewCoAdmins from "./CoAdmins/ViewCoAdmins";

export interface CardProps {
  number?: number;
  desc?: string;
  image?: string;
  charts?: any;
}

const App = (props) => {
  const {
    match: { path },
  } = props;

  return (
    <div className="">
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
          <Route path={`${path}/admins`}>
            <CoAdmins />
          </Route>
          <Route path={`${path}/view-co-admins/:admin_id`}>
            <ViewCoAdmins />
          </Route>
        </Switch>
      </DashboardLayout>
    </div>
  );
};

export default withRouter(App);
