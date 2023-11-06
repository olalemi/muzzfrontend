export const getBaseUrl = (route: string) => {
  let url;
  switch (process.env.NODE_ENV) {
    case "production":
      url = ``;
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
      url = "";
      break;
    case "development":
    default:
      url = "http://localhost:3005";
  }
  return url;
};
