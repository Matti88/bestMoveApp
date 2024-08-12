import { create } from 'zustand';

interface AuthStore {
    login: (username: string, password: string) => void;
    checkLogin: () => void; 
    isLoggedIn: () => boolean; //TODO check if user is logged in
    logout: () => void;
    user: { username: string } | null;
  }

// Create the Zustand store
const useAuthStore = create<AuthStore>((set) => ({
    user: null, // Store the user object, initially null

    // Function to log in the user
    login: (username: string, password: string) => {
        // In a real application, you would validate the credentials
        // against a backend and fetch user details.
        // Here, we'll just simulate a login.
        if (username === "FabriFibra" && password === "SemperFidelis99") {
            const user = { username: "FabriFibra" }; // Simulated user object
            localStorage.setItem('user', JSON.stringify(user)); // Store user in localStorage
            set({ user });
        } else {
            alert("Incorrect username or password");
        }
    },

    // Function to check if the user is logged in
    checkLogin: () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            set({ user: JSON.parse(storedUser) });
        } else {
            set({ user: null });
        }
    },

    // Function to log out the user
    logout: () => {
        localStorage.removeItem('user'); // Remove user from localStorage
        set({ user: null });
    },

    // Function to check if the user is logged in
    isLoggedIn: () => {
        return !!localStorage.getItem('user');
    }
}));

export default useAuthStore;

