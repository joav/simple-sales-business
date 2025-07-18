/* eslint @typescript-eslint/no-unsafe-function-type: 0 */
// @typescript-eslint/no-unsafe-function-type
import { ApplicationLogger } from './application.logger';

export interface InfrastructureLogger extends ApplicationLogger {
  error(msg: string | Error, metadata?: object): void;
  http(msg: string, metadata?: object): void;
  verbose(msg: string, metadata?: object): void;
  exitOnError: boolean | Function;
}
