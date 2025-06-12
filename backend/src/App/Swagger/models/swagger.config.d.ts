/* eslint @typescript-eslint/no-explicit-any: 0 */

type SwaggerConfigParams = {
  openapiPath: string;
  validateRequests?: boolean;
  validateResponses?: boolean;
};

interface SwaggerConfig {
  init: (params: SwaggerConfigParams) => {
    serve: any;
    docsHandler: any;
    validator: any;
  };
}
