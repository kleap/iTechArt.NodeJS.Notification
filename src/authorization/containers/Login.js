import LoginForm from './../components/LoginForm';
import { login } from './../actions/index';
import Page from './Page';

export default Page(LoginForm, login);
