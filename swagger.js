const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Sarrah Admin Panel API',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'https://localhost:3032',
                description: 'Development server',
            },
            {
                url: 'https://sarrahapp.com:3032',
                description: 'Prod server',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ BearerAuth: [] }],
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
