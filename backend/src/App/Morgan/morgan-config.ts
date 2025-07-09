/* eslint @typescript-eslint/no-explicit-any: 0 */
import { InfrastructureLogger } from '@Shared/domain';

export interface MorganConfig {
  init(logger: InfrastructureLogger): { middleware: any };
}
