import { describe, it, expect, vi } from 'vitest';
import LoggerUtil from '@/utils/logger/logger.util';
import { LogLevel } from '@/utils/logger/log-level.ts';

// Мокаем конфигурацию
vi.mock('src/api/conf/app.conf', () => ({
  loggerLevel: LogLevel.DEBUG,
  loggerExcludedPrefixes: ['excludedPrefix'],
  showStackTrace: true,
}));

describe('LoggerUtil', () => {
  it('Logger util test', () => {
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    LoggerUtil.log(LogLevel.DEBUG, 'testPrefix', ['This should be logged']);

    expect(consoleLogSpy).toHaveBeenCalledWith('LOG: ', 'testPrefix');
    expect(consoleLogSpy).toHaveBeenCalledWith('------------------');

    consoleLogSpy.mockRestore();
  });

  it('пLogger level test', () => {
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    // Уровень DEBUG
    LoggerUtil.log(LogLevel.DEBUG, '', ['Debug message']);
    expect(consoleLogSpy).toHaveBeenCalledWith('LOG: ', '');
    expect(consoleLogSpy).toHaveBeenCalledWith('------------------');

    // Уровень INFO
    LoggerUtil.log(LogLevel.INFO, '', ['Info message']);
    expect(consoleLogSpy).toHaveBeenCalledWith('LOG: ', '');
    expect(consoleLogSpy).toHaveBeenCalledWith('------------------');

    // Логирование с уровнем ниже (например, ERROR)
    LoggerUtil.log(LogLevel.ERROR, '', ['Error message']);
    expect(consoleLogSpy).toHaveBeenCalledWith('LOG: ', '');
    expect(consoleLogSpy).toHaveBeenCalledWith('------------------');

    consoleLogSpy.mockRestore();
  });
});
