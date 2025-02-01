import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFormStore = create(
  persist(
    (set,get) => ({
      // Personal Info
      username: "",
      setUsername: (username) => set({ username }),
      firstName: "",
      setFirstName: (firstName) => set({ firstName }),
      lastName: "",
      setLastName: (lastName) => set({ lastName }),
      dl: "",
      setDl: (dl) => set({ dl }),
      company: "",
      setCompany: (company) => set({ company }),
      password: "",
      setPassword: (password) => set({ password }),
      address1: "",
      setAddress1: (address1) => set({ address1 }),
      address2: "",
      setAddress2: (address2) => set({ address2 }),
      city: "",
      setCity: (city) => set({ city }),
      state: "",
      setState: (state) => set({ state }),
      zip: "",
      setZip: (zip) => set({ zip }),
      phoneNumber: "",
      setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
      email: "",
      setEmail: (email) => set({ email }),
      membershipType: "",
      setMembershipType: (membershipType) => set({ membershipType }),
      points: "",
      setPoints: (points) => set({ points }),
      picture: null,
      setPicture: (picture) => set({ picture }),
      referral: "",
      setReferral: (referral) => set({ referral }),
      usernameAvailable: false,
      setUsernameAvailable: (usernameAvailable) => set({ usernameAvailable }),
      emailAvailable: false,
      setEmailAvailable: (emailAvailable) => set({ emailAvailable }),

      // Family Info
      spouse: "",
      setSpouse: (spouse) => set({ spouse }),
      spouseMobile: "",
      setSpouseMobile: (spouseMobile) => set({ spouseMobile }),
      spouseEmail: "",
      setSpouseEmail: (spouseEmail) => set({ spouseEmail }),
      childNum: 0,
      setChildNum: (childNum) => set({ childNum }),
      children: [
        { name: "", dob: "", mobile: "", email: "" },
        { name: "", dob: "", mobile: "", email: "" },
        { name: "", dob: "", mobile: "", email: "" },
        { name: "", dob: "", mobile: "", email: "" },
      ],
      setChildren: (children) => set({ children }),

      // Emergency Info
      emergencyContactName: "",
      setEmergencyContactName: (emergencyContactName) =>
        set({ emergencyContactName }),
      emergencyEmail: "",
      setEmergencyEmail: (emergencyEmail) => set({ emergencyEmail }),
      emergencyPhone: "",
      setEmergencyPhone: (emergencyPhone) => set({ emergencyPhone }),
      emergencyRelationship: "",
      setEmergencyRelationship: (emergencyRelationship) => set({ emergencyRelationship }),

      // ACH Info
      depositoryName: "",
      setDepositoryName: (depositoryName) => set({ depositoryName }),
      branch: "",
      setBranch: (branch) => set({ branch }),
      achCity: "",
      setAchCity: (achCity) => set({ achCity }),
      achState: "",
      setAchState: (achState) => set({ achState }),
      achZip: "",
      setAchZip: (achZip) => set({ achZip }),
      routingNumber: "",
      setRoutingNumber: (routingNumber) => set({ routingNumber }),
      accountNumber: "",
      setAccountNumber: (accountNumber) => set({ accountNumber }),
      nameOnAccount: "",
      setNameOnAccount: (nameOnAccount) => set({ nameOnAccount }),
      accountType: "",
      setAccountType: (accountType) => set({ accountType }),

      // Reset Form
      resetForm: () =>
        set({
          username: "",
          firstName: "",
          lastName: "",
          password: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          zip: "",
          phoneNumber: "",
          email: "",
          membershipType: "",
          points: "",
          picture: null,
          referral: "",
          spouse: "",
          spouseMobile: "",
          spouseEmail: "",
          childNum: 0,
          children: [
            { name: "", dob: "", mobile: "", email: "" },
            { name: "", dob: "", mobile: "", email: "" },
            { name: "", dob: "", mobile: "", email: "" },
            { name: "", dob: "", mobile: "", email: "" },
          ],
          emergencyContactName: "",
          emergencyEmail: "",
          emergencyPhone: "",
          depositoryName: "",
          branch: "",
          achCity: "",
          achState: "",
          achZip: "",
          routingNumber: "",
          accountNumber: "",
          nameOnAccount: "",
          accountType: "",
        }),
      // Derived state: Check if all personal info fields are filled
      isPersonalInfoComplete: () => {
        const state = get();
        return (
          state.username &&
          state.firstName &&
          state.lastName &&
          state.password &&
          state.address1 &&
          state.city &&
          state.state &&
          state.zip &&
          state.phoneNumber &&
          state.email &&
          state.membershipType &&
          state.points
        );
      },

      // Derived state: Check if all ACH info fields are filled
      isAchInfoComplete: () => {
        const state = get();
        return (
          state.depositoryName &&
          state.branch &&
          state.achCity &&
          state.achState &&
          state.achZip &&
          state.routingNumber &&
          state.accountNumber &&
          state.nameOnAccount &&
          state.accountType
        );
      },

      // Derived state: Check if all Emergency info fields are filled
      isEmergencyInfoComplete: () => {
        const state = get();
        return (
          state.emergencyContactName &&
          state.emergencyEmail &&
          state.emergencyPhone &&
          state.emergencyRelationship 
        );
      },
    }),

    {
      name: "user-form-storage", // Local Storage key
      getStorage: () => localStorage, // Persist in local storage
    }
  )
);

export default useFormStore;
