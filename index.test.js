import test from 'ava';
import Hapi from 'hapi';

import plugin from './index';

test('plugin registered', async t => {
  const server = new Hapi.Server({ port: 3000 });

  server.route({ method: 'GET', path: '/', handler: request => request.app });

  await server.register(plugin);
  const { result } = await server.inject({ url: '/' });
  t.truthy(result.startTime);
  t.truthy(result.endTime);
});

test('plugin registered with all options', async t => {
  const server = new Hapi.Server({ port: 3000 });

  server.route({ method: 'GET', path: '/', handler: request => request.app });

  const options = {
    enabled: false,
    environmentName: 'integration',
    region: 'ap-west-1',
    metricsSentCallback: () => {},
  };

  await server.register({ plugin, options });
  const { result } = await server.inject({ url: '/' });
  t.truthy(result.startTime);
  t.truthy(result.endTime);
});
