const packageJSON = require('./package.json');
const lifecycle = require('./lib/lifecycle');
const metric = require('./lib/metric');

exports.plugin = {
  pkg: packageJSON,
  name: 'hapi-cloudwatch',

  async register(server, options) {
    const responseMetric = metric.create(options);

    server.ext('onRequest', lifecycle.setStartTime);
    server.ext('onPreResponse', lifecycle.setEndTime);

    server.events.on('response', request => {
      const dimensions = metric.createDimensions(request);
      responseMetric.put(request.app.endTime - request.app.startTime, 'ApiResponseTime', dimensions);
    });
  },
};
