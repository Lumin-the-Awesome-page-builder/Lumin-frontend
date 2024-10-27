import appConf from '@/api/conf/app.conf';
import { LogLevel } from '@/utils/logger/log-level';

export class LoggerUtil {
  private readonly level: LogLevel;
  private readonly excludedPrefixes: string[];

  constructor() {
    this.level = appConf.loggerLevel;
    this.excludedPrefixes = appConf.loggerExcludedPrefixes;
  }

  private parseStacktrace(stack) {
    const caller = stack.split('\n')[3];
    console.log(stack.replace('Error', 'Stacktrace'));
    const callerFullName = caller.split('://localhost:5173')[1];
    const callerFile = callerFullName.split('?')[0];
    const callerPosition =
      callerFullName.split(':')[1] + ':' + callerFullName.split(':')[2];
    return `${callerFile} (${callerPosition})`;
  }

  public log(mode: LogLevel, prefix: string, ...message: any[]) {
    if (
      this.excludedPrefixes.includes(prefix) ||
      this.excludedPrefixes.includes('*')
    )
      return;
    if (this.level < mode) return;

    console.log('LOG: ', prefix);
    if (appConf.showStackTrace)
      console.log('FROM: ', this.parseStacktrace(new Error().stack));
    message[0].forEach((el) => console.log(el));
    console.log('------------------');
  }

  public debug(...message: any[]) {
    this.log(LogLevel.DEBUG, '', message);
  }

  public debugPrefixed(prefix: string = 'default', ...message: any[]) {
    this.log(LogLevel.DEBUG, prefix, message);
  }

  public info(...message: any[]) {
    this.log(LogLevel.INFO, '', message);
  }

  public infoPrefixed(prefix: string = 'default', ...message: any[]) {
    this.log(LogLevel.INFO, prefix, message);
  }
}

export default new LoggerUtil();
