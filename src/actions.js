import { actionsCreator } from './authorization/actions';
import { actions } from './common/actions';

export default {
  ...actionsCreator,
  ...actions,
};
