import Sidebar from "@/_components/Sidebar/Sidebar";
import SidebarMobil from "@/_components/Sidebar/SidebarMobil";
import { useTranslation } from "next-i18next";
import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const MainLayout = () => {
  const { i18n } = useTranslation();

  return (
    <div className="min-h-screen  overflow-hidden">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Sidebar for mobile */}
      <div className="block md:hidden">
        <SidebarMobil />
      </div>

      {/* Main content */}
      <div
        className={`flex-1 transition-all duration-300
    pb-[90px] md:pb-0
    ${i18n?.language === "ar" ? "mr-0 md:mr-56" : "ml-0 md:ml-56"}
  `}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
