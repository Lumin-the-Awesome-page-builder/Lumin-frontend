import { LogLevel } from '@/utils/logger/log-level.ts';

const appConf = {
  proto: '',
  endpoint: '',
  refreshEndpoint: '',
  loggerLevel: LogLevel.INFO,
  loggerExcludedPrefixes: [],
  showStackTrace: true,
};

export default appConf;
