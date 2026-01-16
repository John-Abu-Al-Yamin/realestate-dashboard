import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  UserRound,
  ListTodo,
  Activity,
  Settings,
  Menu,
  LogOut,
  Link,
  MapPin,
  ArrowBigDown,
  ChevronDown,
  ChevronUp,
  Map,
  Building2,
  MapPinned,
  Archive,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher";
import { removeAuthToken } from "@/services/cookies";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [isAddressOpen, setIsAddressOpen] = useState(false);

  const navItems = [
    { key: "dashboard", href: "/", icon: LayoutDashboard },
    { key: "agencies", href: "/agencies", icon: Users },
    { key: "mangers", href: "/managers", icon: UserRound },
    {
      key: "subscription Plans",
      href: "/subscription-plans",
      icon: CreditCard,
    },
    { key: "subscriptions", href: "/subscriptions", icon: ListTodo },
    { key: "social links", href: "/social-links", icon: Link },
    { key: "Archive", href: "/Archive", icon: Archive },
    { key: "activityL", href: "/activity-log", icon: Activity },
  ];

  return (
    <div
      className={`fixed top-0 h-screen dark:bg-[#1F1F23] flex flex-col transition-all duration-300 bg-sidebar  overflow-y-auto
      ${isOpen ? "md:w-56" : "md:w-[58px]"}
      ${i18n?.language === "ar" ? "right-0 border-l" : "left-0 border-r"}`}
    >
      {/* Header */}
      <div className="mb-8 flex items-center justify-between px-4 pt-6">
        {isOpen && (
          <h1 className="text-2xl font-extrabold tracking-tight text-sidebar-foreground dark:text-sidebar-foreground">
            SIMT
          </h1>
        )}

        <button
          className="p-1 cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Menu className="text-gray-700 dark:text-gray-200" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.key}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-black text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                }`
              }
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
              <span
                className={`transition-all duration-300 overflow-hidden ${
                  isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"
                }`}
              >
                {t(`sidebar.${item.key}`)}
              </span>
            </NavLink>
          );
        })}
        {/* Address Menu */}
        <div>
          <button
            onClick={() => setIsAddressOpen((prev) => !prev)}
            className="cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium w-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
          >
            <MapPin className="h-[18px] w-[18px]" strokeWidth={1.5} />
            <span
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"
              }`}
            >
              {t("sidebar.Address")}
            </span>

            {isOpen && (
              <ChevronDown
                className={`transition-transform duration-300 ease-in-out ${
                  isAddressOpen ? "rotate-180" : "rotate-0"
                } ${i18n.language === "ar" ? "mr-auto" : "ml-auto"}`}
                strokeWidth={1.5}
              />
            )}
          </button>

          {/* Submenu with smooth slide down/up */}
          <div
            className={`flex flex-col space-y-1 overflow-hidden transition-[max-height] duration-500 ease-in-out mt-1
      ${isAddressOpen && isOpen ? "max-h-96" : "max-h-0"}`}
          >
            <NavLink
              to="/address/regions"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg text-sm px-3 py-2 transition-all duration-300 ${
                  isActive
                    ? "bg-black text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                } ${i18n.language === "ar" ? "pr-11 pl-3" : "pl-11 pr-3"}`
              }
            >
              {t("sidebar.regions")}
            </NavLink>

            <NavLink
              to="/address/cities"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg text-sm px-3 py-2 transition-all duration-300 ${
                  isActive
                    ? "bg-black text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                } ${i18n.language === "ar" ? "pr-11 pl-3" : "pl-11 pr-3"}`
              }
            >
              {t("sidebar.cities")}
            </NavLink>

            <NavLink
              to="/address/branches"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg text-sm px-3 py-2 transition-all duration-300 ${
                  isActive
                    ? "bg-black text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                } ${i18n.language === "ar" ? "pr-11 pl-3" : "pl-11 pr-3"}`
              }
            >
              {t("sidebar.branches")}
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Settings + Language */}
      <div className="px-2 mb-4 flex flex-col gap-2 mt-auto">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium transition-all duration-300 ${
              isActive
                ? "bg-black text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
            }`
          }
        >
          <Settings className="h-[18px] w-[18px]" strokeWidth={1.5} />
          <span
            className={`transition-all duration-300 ${
              isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"
            }`}
          >
            {t("sidebar.settings")}
          </span>
        </NavLink>

        <LanguageSwitcher isSidebarOpen={isOpen} />

        <button
          onClick={() => {
            removeAuthToken();
            navigate("/auth/login");
          }}
          className={`flex items-center gap-3 bg-red-50 cursor-pointer rounded-lg px-3 py-2.5 text-base font-medium transition-all duration-300 w-full hover:bg-red-100 dark:hover:bg-red-900/10 text-red-600 dark:text-red-400`}
        >
          <LogOut className="h-[18px] w-[18px]" strokeWidth={1.5} />
          <span
            className={`transition-all duration-300 text-start ${
              isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"
            }`}
          >
            {t("sidebar.logout")}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
