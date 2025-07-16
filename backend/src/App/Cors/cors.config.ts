import cors from 'cors';

export const corsConfig = {
  init(cfg: Partial<CorsConfigParams> = {}) {
    const middleware = cors({
      origin: cfg.origins
    });
    return { middleware };
  }
} satisfies CorsConfig;
