import './index.scss';
import Sidebar from './Sidebar';
import TopNav from './Top';

const NavBar = (props) => {
    return (
        <div className='layout'>
            <div>
                <Sidebar />
            </div>

            <div className='left-menu'>
                <TopNav />
                {props.children}
            </div>
        </div>
    );
};

export default NavBar;
