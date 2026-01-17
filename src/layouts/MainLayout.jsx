import Sidebar from "@/_components/Sidebar/Sidebar";
import SidebarMobil from "@/_components/Sidebar/SidebarMobil";
import { useTranslation } from "next-i18next";
import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const MainLayout = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen  overflow-hidden">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      {/* Sidebar for mobile */}
      <div className="block md:hidden">
        <SidebarMobil />
      </div>

      {/* Main content */}
      <div
        className={`
    flex-1 transition-all duration-300
    pb-[90px] md:pb-0 
    ${
      isOpen
        ? i18n.language === "ar"
          ? "md:mr-56 md:ml-0"
          : "md:ml-56 md:mr-0"
        : i18n.language === "ar"
          ? "md:mr-20 md:ml-0"
          : "md:ml-20 md:mr-0"
    }
  `}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
