import fs from 'node:fs';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import * as OpenApiValidator from 'express-openapi-validator';

export default {
  init({ openapiPath, ...flags }: SwaggerConfigParams) {
    const openapiJson = JSON.parse(fs.readFileSync(openapiPath, 'utf-8'));

    const swaggerOptions = {
      swaggerDefinition: openapiJson,
      apis: []
    };

    const swaggerDocs = swaggerJSDoc(swaggerOptions);

    return {
      serve: swaggerUi.serve,
      docsHandler: swaggerUi.setup(swaggerDocs),
      validator: OpenApiValidator.middleware({
        apiSpec: openapiJson,
        ...flags
      })
    };
  }
} satisfies SwaggerConfig;
