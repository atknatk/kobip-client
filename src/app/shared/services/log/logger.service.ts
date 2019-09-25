import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../environments/environment';

export class LoggerConfig {
  level: KbLoggerLevel;
  serverLogLevel: KbLoggerLevel;
  serverLoggingUrl?: string;
}

export enum KbLoggerLevel {
  TRACE = 0, DEBUG, INFO, LOG, WARN, ERROR, OFF
}

export let isDebugMode = environment.isDebugMode;

const Levels = [
  'TRACE',
  'DEBUG',
  'INFO',
  'LOG',
  'WARN',
  'ERROR',
  'OFF'
];

@Injectable()
export class KbLoggerService {

  private _serverLogLevel: KbLoggerLevel;
  private _clientLogLevel: KbLoggerLevel;
  private _isIE: boolean;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId, @Optional() private options: LoggerConfig) {
    if (!this.options) {
      this.options = {
        level: KbLoggerLevel.OFF,
        serverLogLevel: KbLoggerLevel.OFF
      };
    }
    this._serverLogLevel = this.options.serverLogLevel;
    this._clientLogLevel = this.options.level;
    this._isIE = isPlatformBrowser(platformId) &&
      !!(navigator.userAgent.indexOf('MSIE') !== -1 || navigator.userAgent.match(/Trident\//) || navigator.userAgent.match(/Edge\//));
  }

  debug(message, ...additional: any[]) {
    this._log(KbLoggerLevel.DEBUG, true, message, additional);
  }

  error(message, ...additional: any[]) {
    this._log(KbLoggerLevel.ERROR, true, message, additional);
  }

  info(message, ...additional: any[]) {
    this._log(KbLoggerLevel.INFO, true, message, additional);
  }

  log(message, ...additional: any[]) {
    this._log(KbLoggerLevel.LOG, true, message, additional);
  }

  trace(message, ...additional: any[]) {
    this._log(KbLoggerLevel.TRACE, true, message, additional);
  }

  warn(message, ...additional: any[]) {
    this._log(KbLoggerLevel.WARN, true, message, additional);
  }

  private _getColor(level: KbLoggerLevel) {
    switch (level) {
      case KbLoggerLevel.TRACE:
        return 'blue';
      case KbLoggerLevel.DEBUG:
        return 'teal';
      case KbLoggerLevel.INFO:
      case KbLoggerLevel.LOG:
        return 'gray';
      case KbLoggerLevel.WARN:
      case KbLoggerLevel.ERROR:
        return 'red';
      case KbLoggerLevel.OFF:
      default:
        return;
    }
  }

  private _log(level: KbLoggerLevel, logOnServer: boolean, message, additional: any[] = []) {
    if (!message) {
      return;
    }

    // Allow logging on server even if client log level is off
    if (logOnServer) {
      this._logOnServer(level, message, additional);
    }

    // if no message or the log level is less than the environ
    if (level < this._clientLogLevel) {
      return;
    }

    if (typeof message === 'object') {
      try {
        message = JSON.stringify(message, null, 2);
      } catch (e) {
        additional = [message, ...additional];
        message = 'circular object in message. ';
      }
    }

    // Coloring doesn't work in IE
    if (this._isIE) {
      return this._logIE(level, message, additional);
    }

    const color = this._getColor(level);

    console.log(`%c${this._timestamp()} [${Levels[level]}]`, `color:${color}`, message, ...additional);
  }

  private _logIE(level: KbLoggerLevel, message: string, additional: any[]) {
    switch (level) {
      case KbLoggerLevel.WARN:
        console.warn(`${this._timestamp()} [${Levels[level]}] `, message, ...additional);
        break;
      case KbLoggerLevel.ERROR:
        console.error(`${this._timestamp()} [${Levels[level]}] `, message, ...additional);
        break;
      case KbLoggerLevel.INFO:
        console.info(`${this._timestamp()} [${Levels[level]}] `, message, ...additional);
        break;
      default:
        console.log(`${this._timestamp()} [${Levels[level]}] `, message, ...additional);
    }
  }

  private _logOnServer(level: KbLoggerLevel, message, additional: any[]) {
    if (!this.options.serverLoggingUrl) {
      return;
    }

    // if the user provides a serverLogLevel and the current level is than that do not log
    if (level < this._serverLogLevel) {
      return;
    }

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post(this.options.serverLoggingUrl, {
      level: Levels[level],
      message: message,
      additional: additional,
      timestamp: this._timestamp()
    }, {headers})
      .subscribe(
        res => null,
        error => this._log(KbLoggerLevel.ERROR, false, 'FAILED TO LOG ON SERVER')
      );
  }

  private _timestamp() {
    return new Date().toISOString();
  }

}
