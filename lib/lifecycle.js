exports.setStartTime = (request, h) => {
  request.app.startTime = (new Date()).getTime();
  return h.continue;
};

exports.setEndTime = (request, h) => {
  request.app.endTime = (new Date()).getTime();
  return h.continue;
};
