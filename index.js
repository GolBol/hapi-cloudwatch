const packageJSON = require('./package.json');
const lifecycle = require('./lib/lifecycle');
const metric = require('./lib/metric');

exports.plugin = {
  pkg: packageJSON,
  name: 'hapi-cloudwatch',

  async register(server, options) {
    const responseTimeMetric = metric.createResponseTimeMetric(options);
	const countMetric = metric.createCountMetric(options);

    server.ext('onRequest', lifecycle.setStartTime);
    server.ext('onPreResponse', lifecycle.setEndTime);

	server.events.on('request', request => {
      const dimensions = metric.createRequestDimensions(request);
      countMetric.put(1, 'RequestCount', dimensions);
    });
	
    server.events.on('response', request => {
      const dimensions = metric.createResponseDimensions(request);
      responseTimeMetric.put(request.app.endTime - request.app.startTime, 'ApiResponseTime', dimensions);
	  countMetric.put(1, 'ResponseCount', dimensions);
    });
  },
};
