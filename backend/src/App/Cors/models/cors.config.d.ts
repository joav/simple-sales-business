/* eslint @typescript-eslint/no-explicit-any: 0 */

type CorsConfigParams = {
  origins: string[];
};

interface CorsConfig {
  init(cfg?: Partial<CorsConfigParams>): { middleware: any };
}
