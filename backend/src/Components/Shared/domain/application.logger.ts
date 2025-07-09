export interface ApplicationLogger {
  warn(msg: string, metadata?: object): void;
  info(msg: string, metadata?: object): void;
  debug(msg: string, metadata?: object): void;
}
