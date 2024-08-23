export const info = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API News",
      version: "1.0.0",
      description: "Documentacion de API News",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
      // {
      //     url: 'https://.......'
      // }
    ],
  },
  apis: ["./src/docs/*.yml"],
};
