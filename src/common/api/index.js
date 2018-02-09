export default (request) => {
  console.log(request);
  return request.then(res => ({
    ...res.data,
  })).catch(err => (
    err.response ?
      { ...err.response.data } :
      { success: false, message: 'Server unavailable...' }
  ));
};
