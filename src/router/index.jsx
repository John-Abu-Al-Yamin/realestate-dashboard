import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// Layouts and route components (keep these as direct imports)
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";

// Lazy load page components
const LoginForm = lazy(() => import("@/pages/auth/LoginForm"));
const ForgotPasswordForm = lazy(
  () => import("@/pages/auth/ForgotPasswordForm"),
);
const OtpVerificationForm = lazy(
  () => import("@/pages/auth/OtpVerificationForm"),
);
const ResetPasswordForm = lazy(() => import("@/pages/auth/ResetPasswordForm"));
const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const AgenciesPage = lazy(() => import("@/pages/AgenciesPage/AgenciesPage"));
const AgencyDetailsPage = lazy(
  () => import("@/pages/AgenciesPage/AgencyDetailsPage"),
);
const AddAgencies = lazy(() => import("@/pages/AgenciesPage/AddAgencies"));
const SelectManager = lazy(
  () => import("@/pages/AgenciesPage/SelectManager/SelectManager"),
);
const EditMasterData = lazy(
  () => import("@/pages/AgenciesPage/EditMasterData"),
);
const EditVerification = lazy(
  () => import("@/pages/AgenciesPage/EditVerification"),
);
const EditLegal = lazy(() => import("@/pages/AgenciesPage/EditLegal"));
const EditVisualIdentity = lazy(
  () => import("@/pages/AgenciesPage/EditVisualIdentity"),
);
const ManagersPage = lazy(() => import("@/pages/ManagersPage/ManagersPage"));
const ManagersPageDetalis = lazy(
  () => import("@/pages/ManagersPage/ManagersPageDetalis"),
);
const ManagersEdite = lazy(() => import("@/pages/ManagersPage/ManagersEdite"));
const AddManager = lazy(() => import("@/pages/ManagersPage/AddManager"));

const SubscriptionPlansPage = lazy(
  () => import("@/pages/SubscriptionPlans/SubscriptionPlansPage"),
);
const SubscriptionPlanDetalis = lazy(
  () => import("@/pages/SubscriptionPlans/SubscriptionPlanDetalis"),
);
const AddSubscriptionPlan = lazy(
  () => import("@/pages/SubscriptionPlans/AddSubscriptionPlan"),
);

const SubscriptionPlansEdite = lazy(
  () => import("@/pages/SubscriptionPlans/SubscriptionPlansEdite"),
);

const SubscriptionsPage = lazy(
  () => import("@/pages/Subscriptions/SubscriptionsPage"),
);
const SubscriptionsDetalis = lazy(
  () => import("@/pages/Subscriptions/SubscriptionsDetalis"),
);
const AddSubscriptions = lazy(
  () => import("@/pages/Subscriptions/AddSubscriptions"),
);
const EditProfile = lazy(() => import("@/pages/AgenciesPage/EditProfile"));
const SubscriptionEdite = lazy(
  () => import("@/pages/Subscriptions/SubscriptionEdite"),
);
const ActivityLogPage = lazy(
  () => import("@/pages/ActivityLogPage/ActivityLogPage"),
);

const ActivityLogPageDetalis = lazy(
  () => import("@/pages/ActivityLogPage/ActivityLogPageDetalis"),
);

const EditeMangerAgancey = lazy(
  () => import("@/pages/AgenciesPage/SelectManager/EditeMangerAgancey"),
);
const SocialLinks = lazy(() => import("@/pages/SocialLinks/SocialLinks"));

const Regions = lazy(() => import("@/pages/Address/Regions"));
const Cities = lazy(() => import("@/pages/Address/Cities"));
const Branches = lazy(() => import("@/pages/Address/Branches"));
const Countries = lazy(() => import("@/pages/Address/Countries"));
const ArchivePage = lazy(() => import("@/pages/Archive/ArchivePage"));


// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/auth",
    element: (
      <PublicRoute>
        <Suspense fallback={<LoadingFallback />}>
          <AuthLayout />
        </Suspense>
      </PublicRoute>
    ),
    children: [
      { path: "login", element: <LoginForm /> },
      { path: "forgot-password", element: <ForgotPasswordForm /> },
      { path: "otp-verification", element: <OtpVerificationForm /> },
      { path: "reset-password", element: <ResetPasswordForm /> },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <MainLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "agencies",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AgenciesPage />
          </Suspense>
        ),
      },
      {
        path: "agencies/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AgencyDetailsPage />
          </Suspense>
        ),
      },
      {
        path: "agencies/add",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AddAgencies />
          </Suspense>
        ),
      },
      {
        path: "agencies/select-manager",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SelectManager />
          </Suspense>
        ),
      },

      {
        path: "agencies/edit-manager/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <EditeMangerAgancey />
          </Suspense>
        ),
      },

      {
        path: "agencies/edit-master-data/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <EditMasterData />
          </Suspense>
        ),
      },
      {
        path: "agencies/edit-profile/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <EditProfile />
          </Suspense>
        ),
      },
      {
        path: "agencies/edit-verification/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <EditVerification />
          </Suspense>
        ),
      },
      {
        path: "agencies/edit-legal/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <EditLegal />
          </Suspense>
        ),
      },
      {
        path: "agencies/edit-visual-identity/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <EditVisualIdentity />
          </Suspense>
        ),
      },

      {
        path: "subscription-plans",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SubscriptionPlansPage />
          </Suspense>
        ),
      },
      {
        path: "subscription-plans/add",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AddSubscriptionPlan />
          </Suspense>
        ),
      },
      {
        path: "subscription-plans/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SubscriptionPlanDetalis />
          </Suspense>
        ),
      },

      {
        path: "subscription-plans/edit/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SubscriptionPlansEdite />
          </Suspense>
        ),
      },

      {
        path: "subscriptions",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SubscriptionsPage />
          </Suspense>
        ),
      },
      {
        path: "subscriptions/add",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AddSubscriptions />
          </Suspense>
        ),
      },
      {
        path: "subscriptions/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SubscriptionsDetalis />
          </Suspense>
        ),
      },
      {
        path: "subscriptions/edit/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SubscriptionEdite />
          </Suspense>
        ),
      },

      {
        path: "managers",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ManagersPage />
          </Suspense>
        ),
      },
      {
        path: "managers/add",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AddManager />
          </Suspense>
        ),
      },
      {
        path: "managers/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ManagersPageDetalis />
          </Suspense>
        ),
      },
      {
        path: "managers/edit/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ManagersEdite />
          </Suspense>
        ),
      },
      {
        path: "activity-log",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ActivityLogPage />
          </Suspense>
        ),
      },
      {
        path: "activity-log/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ActivityLogPageDetalis />
          </Suspense>
        ),
      },

      {
        path: "address/countries",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Countries />
          </Suspense>
        ),
      },
      {
        path: "address/regions",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Regions />
          </Suspense>
        ),
      },
      {
        path: "address/cities",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Cities />
          </Suspense>
        ),
      },
      {
        path: "address/branches",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Branches />
          </Suspense>
        ),
      },

      {
        path: "social-links",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SocialLinks />
          </Suspense>
        ),
      },

      {
        path: "archive",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ArchivePage />
          </Suspense>
        ),
      },

      {
        path: "reports",
        element: <h1>Reports Page</h1>,
      },
      {
        path: "leads",
        element: <h1>Leads Page</h1>,
      },

      {
        path: "settings",
        element: <h1>Settings Page</h1>,
      },
    ],
  },
]);

export default router;
