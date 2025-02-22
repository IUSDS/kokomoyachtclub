import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      user: null,
      sessionChecked: false, // ✅ New flag to prevent infinite loop

      // ✅ Login function
      login: (userData) => {
        set({ isLoggedIn: true, user: userData, sessionChecked: true });
      },

      // ✅ Logout function (prevents infinite redirect loop)
      logout: async () => {
        if (!get().isLoggedIn) return; // ✅ Prevents multiple logout calls

        try {
          await fetch(`https://api.kokomoyachtclub.vip/validate-user/logout/`, {
            method: "POST",
            credentials: "include",
          });
        } catch (error) {
          console.error("Logout Error:", error);
        }

        set({ isLoggedIn: false, user: null, sessionChecked: false });
        window.location.href = "/login"; // ✅ Redirect only once
      },

      // ✅ Check session (prevents infinite loops)
      checkSession: async () => {
        if (get().sessionChecked) return; // ✅ Prevents multiple calls

        try {
          const response = await fetch(`https://api.kokomoyachtclub.vip/validate-user/current-user/`, {
            method: "GET",
            credentials: "include",
          });

          if (response.ok) {
            const userData = await response.json();
            set({ isLoggedIn: true, user: userData, sessionChecked: true });
          } else {
            console.log("Session expired. Logging out...");
            get().logout(); // ✅ Only call logout ONCE
          }
        } catch (error) {
          console.error("Session Check Error:", error);
          get().logout(); // ✅ Only call logout ONCE
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
