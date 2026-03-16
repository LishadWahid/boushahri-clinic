import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';
import { AnimatePresence, motion } from "framer-motion";

const RootLayout = () => {
    return (
        <AnimatePresence mode='wait'>
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen bg-gradient-to-br from-blue-10 via-white to-blue-100"
            >
                <Navbar />
                <Outlet />
                <Footer />
            </motion.div>
        </AnimatePresence>
    );
};

export default RootLayout;