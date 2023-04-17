export const tokenConfig = (auth) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Session: auth,
    },
  };
  if (token) {
    config.headers["Authorization"] = `Basic ${token}`;
  }

  return config;
};
