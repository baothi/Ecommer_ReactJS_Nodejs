const getCustomerfromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer")).token
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getCustomerfromLocalStorage !== null ? getCustomerfromLocalStorage : ""
    }`,
    Accept: "application/json",
  },
};

export const base_url = "http://localhost:8080/api/";