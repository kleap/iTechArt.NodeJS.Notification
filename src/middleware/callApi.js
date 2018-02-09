const flow = ['request', 'requestFail', 'requestSuccess'];

export default actions => ({ dispatch }) => next => (action) => {
  if (!action.payload) {
    return next(action);
  }
  const { prefix, apiCall, cb, err } = action.payload;

  if (!prefix) {
    return next(action);
  }

  const [request, fail, success] = flow;
  dispatch(actions[prefix][request]());

  return apiCall().then((res) => {
    if (res.success) {
      dispatch(actions[prefix][success](res));
      return cb && cb(dispatch, res);
    }
    dispatch(actions[prefix][fail](res));
    return err && err(dispatch, res);
  });
};

