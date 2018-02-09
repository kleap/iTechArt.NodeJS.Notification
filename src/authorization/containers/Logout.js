import LogoutForm from './../components/LogoutForm';
import { logout } from './../actions/index';
import Page from './Page';

export default Page(LogoutForm, logout);
