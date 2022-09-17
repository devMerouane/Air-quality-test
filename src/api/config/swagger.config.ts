import SwaggerJsDoc, { OAS3Options } from 'swagger-jsdoc';

class SwaggerConfiguration {
  private static instance: SwaggerConfiguration;

  private options: OAS3Options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      servers: [{ url: '/api/v1/' }],
      info: {
        title: 'Air Quality',
        version: '1.0.0',
        description: 'Air Quality API documentation',
      },
    },
    apis: [`${process.cwd()}/src/api/core/docs/v1/**/*.yaml`],
  };

  private constructor() {}

  static get() {
    if (!SwaggerConfiguration.instance) {
      SwaggerConfiguration.instance = new SwaggerConfiguration();
    }

    return SwaggerConfiguration.instance;
  }

  init() {
    return SwaggerJsDoc(this.options);
  }
}

const swaggerConfiguration = SwaggerConfiguration.get().init();

export { swaggerConfiguration as Swagger };
