import { actionsCreator } from './../actions';
import RegistrationForm from './../components/RegistrationForm';
import Page from './Page';

export default Page(RegistrationForm, actionsCreator.registration.call);
