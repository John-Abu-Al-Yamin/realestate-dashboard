import Charts from "@/_components/dashboard/Charts";
import Header from "@/_components/dashboard/Header";
import QuickActions from "@/_components/dashboard/QuickActions";
import RecentActivities from "@/_components/dashboard/RecentActivities";
import StatsCards from "@/_components/dashboard/StatsCards";
import { useGetstatistics } from "@/hooks/Actions/statistics/useCardStatistics";

const Dashboard = () => {
  const { data: statistics, isPending: isStatisticsPending } =
    useGetstatistics();

  return (
    <div className="min-h-screen bg-background dark:bg-background p-4 md:p-6">
      <Header />
      <div className="mt-6">
        <QuickActions />
      </div>
      <div className="mt-6">
        <StatsCards statistics={statistics} />
      </div>
      <div className="mt-6  ">
        <Charts />
      </div>
      <div className="mt-6">
        <RecentActivities />
      </div>
    </div>
  );
};

export default Dashboard;
