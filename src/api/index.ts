export const getBaseUrl = (route: string) => {
  let url;
  switch (process.env.NODE_ENV) {
    case "production":
      url = `https://muzz-backend-4bb0948a3ed5.herokuapp.com/api/${route}/`;
      break;
    case "development":
    default:
      url = `http://localhost:3005/api/${route}/`;
  }

  return url;
};

export const getBaseUrlWithoutRoute = () => {
  let url;
  switch (process.env.NODE_ENV) {
    case "production":
      url = "https://muzz-backend-4bb0948a3ed5.herokuapp.com/";
      break;
    case "development":
    default:
      url = "http://localhost:3005";
  }
  return url;
};




