import './index.scss';
import { NavLink } from 'react-router-dom';
import Logo from '../../../../assets/icons/logo.svg';
import DashboardIcon from '../../../../assets/icons/dashboard.svg';
import ClubLibrary from '../../../../assets/icons/club-library.svg';
import Admins from '../../../../assets/icons/admin.svg';
import SettingIcon from '../../../../assets/icons/settings.svg';
import LogoutIcon from '../../../../assets/icons/logout.svg';
import { logOut } from '../../../../utils';
import { useSelector } from 'react-redux';

export interface CardProps {
    number?: number;
    desc?: string;
    image?: string;
    charts?: any;
}

const Home = () => {
    const { profile }: any = useSelector((state) => state);
    const { role } = profile;

    const menu = [
        {
            id: 1,
            icon: DashboardIcon,
            title: 'Dashboard',
            access: ['admin', 'owner', 'co-admin'],
            link: '/app/dashboard',
        },
        {
            id: 2,
            icon: ClubLibrary,
            title: 'Club Library',
            access: ['admin', 'co-admin'],
            link: '/app/clubs',
        },
        {
            id: 2,
            icon: ClubLibrary,
            title: 'Admins',
            access: ['owner'],
            link: '/app/admins',
        },
        {
            id: 3,
            icon: Admins,
            title: 'Co-Admins',
            access: ['admin', 'owner'],
            link: '/app/co-admins',
        },
    ];

    return (
        <div className='sidebar'>
            <div className='logo'>
                <img src={Logo} alt='' />
            </div>
            <ul>
                {menu.map((item, index) => {
                    if (item.access.includes(role)) {
                        return (
                            <li>
                                <NavLink
                                    to={item.link}
                                    className='menu'
                                    activeClassName='active'
                                >
                                    <img src={item.icon} alt='logout' />{' '}
                                    <div>{item.title}</div>
                                </NavLink>
                            </li>
                        );
                    }
                })}
            </ul>
            <div className='logout-div'>
                <img src={SettingIcon} alt='logout' /> <div>Settings</div>
            </div>
            <div className='logout-div log' onClick={logOut}>
                <img src={LogoutIcon} alt='logout' /> <div>Logout</div>
            </div>
        </div>
    );
};

export default Home;
