import { create } from "zustand";
import { persist } from "zustand/middleware";
import useFormStore from "./useFormStore";

const useAuthStore = create(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      user: null,
      user_type: null,
      sessionChecked: false,

      // Login function (resets form on new login)
      login: (userData, type) => {
        // console.log("🔹 Logging in user:", userData);
        set({ isLoggedIn: true, user: userData, user_type: type, sessionChecked: true });

        // Reset form on login to ensure a fresh start
        useFormStore.getState().resetForm();
        // console.log("Zustand State after login:", get());
      },

      // Logout function (prevents infinite redirect loop)
      logout: async () => {
        if (!get().isLoggedIn) return; // Prevents multiple logout calls

        try {
          console.log("🔹 Logging out user...");
          await fetch(`https://api.kokomoyachtclub.vip/validate-user/logout/`, {
            method: "POST",
            credentials: "include",
          });
        } catch (error) {
          console.error("Logout Error:", error);
        }

        set({ isLoggedIn: false, user: null, user_type: null, sessionChecked: false });

        // Reset form on logout
        useFormStore.getState().resetForm();

        console.log("Zustand State after logout:", get());
        setTimeout(() => (window.location.href = "/login"), 500); // Prevent race condition
      },

      // Check session (triggers form reset on new session)
      checkSession: async () => {
        if (get().sessionChecked) return; // Prevents multiple calls

        try {
          // console.log("🔹 Checking session..."); 
          const response = await fetch(`https://api.kokomoyachtclub.vip/validate-user/current-user/`, {
            method: "GET",
            credentials: "include",
          });

          if (response.ok) {
            const userData = await response.json();
            console.log("Session Valid:", userData);
            set({ isLoggedIn: true, user: userData, user_type: user_type, sessionChecked: true });

            // Reset form when a new session is detected
            useFormStore.getState().resetForm();
          } else {
            console.log("Session expired. Logging out...");
            get().logout();
          }
        } catch (error) {
          console.error("Session Check Error:", error);
          get().logout();
        }
      },

      // Debugging function (View Zustand state in browser console)
      debugStore: () => {
        console.log("Zustand Store:", get());
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

// Make Zustand store accessible in browser console
window.useAuthStore = useAuthStore;

export default useAuthStore;
