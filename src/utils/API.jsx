export const getToken = () => {
  return localStorage.getItem("token");
};

export const authHeader = () => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
};