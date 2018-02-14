import authActions from './authorization/actions/creator';
import { actions } from './common/actions';

export default {
  ...authActions,
  ...actions,
};
