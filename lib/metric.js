const cloudwatchMetrics = require('cloudwatch-metrics');

const noop = () => {};

exports.createResponseTimeMetric = (options = {}) => {
  const environmentName = options.environment || process.env.NODE_ENV || 'not set';
  const metricsSentCallback = options.metricsSentCallback || noop;
  const enabled = typeof options.enabled === 'undefined' ? true : !!options.enabled;
  const region = options.region || 'ap-south-1';
  const namespace = options.namespace || 'Api Metrics';

  cloudwatchMetrics.initialize({ region });

  const cloudwatchOptions = {
    enabled,
    sendCallback: metricsSentCallback,
  };

  return new cloudwatchMetrics.Metric(
    namespace,
    'Milliseconds',
    [{ Name: 'Environment', Value: environmentName }],
    cloudwatchOptions);
};

exports.createCountMetric = (options = {}) => {
  const environmentName = options.environment || process.env.NODE_ENV || 'not set';
  const metricsSentCallback = options.metricsSentCallback || noop;
  const enabled = typeof options.enabled === 'undefined' ? true : !!options.enabled;
  const region = options.region || 'ap-south-1';
  const namespace = options.namespace || 'Api Metrics';

  cloudwatchMetrics.initialize({ region });

  const cloudwatchOptions = {
    enabled,
    sendCallback: metricsSentCallback,
  };

  return new cloudwatchMetrics.Metric(
    namespace,
    'Count',
    [{ Name: 'Environment', Value: environmentName }],
    cloudwatchOptions);
};

exports.createResponseDimensions = request => {
  const { path } = request.route;
  const { statusCode } = request.response;

  return [
    {
      Name: 'Path',
      Value: path,
    },
    {
      Name: 'StatusCode',
      Value: `${statusCode}`,
    },
    {
      Name: 'Method',
      Value: request.method,
    },
  ];
};

exports.createRequestDimensions = request => {
  return [
    {
      Name: 'Path',
      Value: request.route,
    },
    {
      Name: 'Method',
      Value: request.method,
    },
  ];
};

