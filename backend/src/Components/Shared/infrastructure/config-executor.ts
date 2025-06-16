import { Container } from 'inversify';

export interface ConfigExecutor {
  config(container: Container): void;
}
