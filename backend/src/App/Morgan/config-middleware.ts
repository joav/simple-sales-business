/* eslint @typescript-eslint/no-explicit-any: 0 */
import morgan from 'morgan';
import { InfrastructureLogger } from '@Shared/domain';
import { MorganConfig } from './morgan-config';

export const morganConfigMiddleWare = {
  init(logger: InfrastructureLogger) {
    const middleware = morgan(
      (tokens: any, req: any, res: any) =>
        JSON.stringify({
          method: tokens.method(req, res),
          url: tokens.url(req, res),
          status: Number.parseFloat(tokens.status(req, res)),
          content_length: tokens.res(req, res, 'content-length'),
          response_time: Number.parseFloat(tokens['response-time'](req, res))
        }),
      {
        stream: {
          write: (message: string) => {
            const data = JSON.parse(message);
            logger.http(data);
          }
        }
      }
    );
    return { middleware };
  }
} satisfies MorganConfig;
