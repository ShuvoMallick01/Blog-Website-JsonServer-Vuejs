import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state() {
    return {
      user: null,
    };
  },

  actions: {
    async userRegistration(data) {
      console.log(data);
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      // const user = await response.json();
      // this.user = user;

      if (!response.ok || !response.status === 400)
        throw new Error("RESGISTER USER: someting went wrong");

      const user = await response.json();
      this.user = user;
    },

    async userLogin(data) {
      console.log(data);
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      if (!response.ok || !response.status === 400)
        throw new Error("RESGISTER USER: someting went wrong");

      const user = await response.json();
      this.user = user;
    },
  },
});
