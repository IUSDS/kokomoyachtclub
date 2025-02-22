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
        console.log("🔹 Logging in user:", userData); // ✅ Debug
        set({ isLoggedIn: true, user: userData, sessionChecked: true });
        console.log("✅ Zustand State after login:", get()); // ✅ Debug Zustand store
      },

      // ✅ Logout function (prevents infinite redirect loop)
      logout: async () => {
        if (!get().isLoggedIn) return; // ✅ Prevents multiple logout calls

        try {
          console.log("🔹 Logging out user..."); // ✅ Debug
          await fetch(`https://api.kokomoyachtclub.vip/validate-user/logout/`, {
            method: "POST",
            credentials: "include",
          });
        } catch (error) {
          console.error("❌ Logout Error:", error);
        }

        set({ isLoggedIn: false, user: null, sessionChecked: false });
        console.log("✅ Zustand State after logout:", get()); // ✅ Debug Zustand store
        setTimeout(() => (window.location.href = "/login"), 500); // ✅ Prevent race condition
      },

      // ✅ Check session (prevents infinite loops)
      checkSession: async () => {
        if (get().sessionChecked) return; // ✅ Prevents multiple calls

        try {
          console.log("🔹 Checking session..."); // ✅ Debug
          const response = await fetch(`https://api.kokomoyachtclub.vip/validate-user/current-user/`, {
            method: "GET",
            credentials: "include",
          });

          if (response.ok) {
            const userData = await response.json();
            console.log("✅ Session Valid:", userData);
            set({ isLoggedIn: true, user: userData, sessionChecked: true });
          } else {
            console.log("❌ Session expired. Logging out...");
            get().logout(); // ✅ Only call logout ONCE
          }
        } catch (error) {
          console.error("❌ Session Check Error:", error);
          get().logout(); // ✅ Only call logout ONCE
        }
      },

      // ✅ Debugging function (View Zustand state in browser console)
      debugStore: () => {
        console.log("🛠️ Zustand Store:", get());
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

// ✅ Make Zustand store accessible in browser console
window.useAuthStore = useAuthStore;

export default useAuthStore;
