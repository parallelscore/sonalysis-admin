import "./index.scss"
import {
  withRouter,
  Route,
  Switch,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';
import {useEffect} from "react"
import AllClub from "./AllClub"
import CreateClub from "./CreateClub"


import {baseURL} from "../../../api/request";
import {updateUpload} from "../../../store/upload/actions"
import {useDispatch} from "react-redux"

export interface CardProps {
  number?: number;
  desc?: string;
  image?: string;
  charts?: any;
}

const Analystic = (props) => {
  const {
    match: { path },
  } = props;

  const dispatch = useDispatch();

  useEffect(() => {
   
  }, []);

  return (
    <div className="">
        <Switch>
          {/* <Route exact path={path}>
            <Redirect to={`${path}`} />
          </Route> */}
          <Route exact path={`${path}`}>
            <CreateClub />
          </Route>
 
          <Route path={`app/player-library/create-club`}>
            <CreateClub/>
          </Route>

        </Switch>

      

    </div>

  );
};

export default withRouter(Analystic)