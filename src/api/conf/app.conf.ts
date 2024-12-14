import { LogLevel } from '@/utils/logger/log-level.ts';

const appConf = {
  host: 'lumin.dudosyka.ru',
  proto: 'https',
  endpoint: 'api.lumin.dudosyka.ru',
  // proto: 'http',
  // endpoint: 'localhost:8080',
  redirectUrl: 'lumin.dudosyka.ru',
  refreshEndpoint: '/auth/refresh',
  loggerLevel: LogLevel.DEBUG,
  loggerExcludedPrefixes: [],
  showStackTrace: false,
};

export default appConf;
