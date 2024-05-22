const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Earthquakes Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple Earthquake API application made with Express and documented with Swagger",
      contact: {
        name: "sxnpaii",
        url: "https://sxnpaii.uz",
        email: "axurshidbek2005@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8080/",
      },
    ],
  },
  apis: ["../routes/*.js"],
};

module.exports = options;
