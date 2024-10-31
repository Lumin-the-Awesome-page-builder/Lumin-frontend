import { LogLevel } from '@/utils/logger/log-level.ts';

const appConf = {
  proto: 'http',
  endpoint: 'localhost:8080',
  refreshEndpoint: '/auth/refresh',
  loggerLevel: LogLevel.DEBUG,
  loggerExcludedPrefixes: [],
  showStackTrace: false,
};

export default appConf;
