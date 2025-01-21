import axios from "axios";

export const authService = {
  login: async (credentials) => {
    try {
      const jsonSend = JSON.stringify({
        username: credentials.username,
        password: credentials.password,
        recaptcha: null,
      });

      const response = await axios.post(
        "https://cors-anywhere.herokuapp.com/http://139.177.195.95/site/login",
        {
          jsonSend: jsonSend,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  },
};
