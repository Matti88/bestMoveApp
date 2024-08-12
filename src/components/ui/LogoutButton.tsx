import React from 'react';
import { Button } from '@/components/ui/shadcn/button'; // Import the Button component from ShadCN
import useAuthStore from '@/store/userLogin'; // Import your Zustand store

const LogoutButton = () => {
    const { logout } = useAuthStore(); // Get the logout function from the store

    const handleLogout = () => {
        logout(); // Call the logout function from Zustand store
    };

    return (
        <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white">
            Logout
        </Button>
    );
};

export default LogoutButton;
