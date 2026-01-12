import { useGetSubscriptionId } from "@/hooks/Actions/subscriptions/useCardSubscriptions";
import { useTranslation } from "next-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Calendar,
  CheckCircle,
  ArrowLeft,
  Clock,
  Info,
  Settings,
  XSquare,
} from "lucide-react";
import CustomLoadingCard from "@/customs/CustomLoadingCard";

const SubscriptionsDetalis = () => {
  const { id } = useParams();
  const { data: response, isPending } = useGetSubscriptionId(id);
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (isPending) {
    return <CustomLoadingCard />;
  }

  const subscription = response?.data?.data;
  const agency = subscription?.agency;

  if (!subscription) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">
          {t("subscription_not_found", "Subscription not found")}
        </h2>
        <Button onClick={() => navigate("/subscriptions")}>
          {t("go_back", "Go Back")}
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className="-ml-2 mb-2 text-muted-foreground"
              onClick={() => navigate("/subscriptions")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("back_to_subscriptions", "Back to Subscriptions")}
            </Button>

            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">
                {t("subscription", "Subscription")} #{subscription.id}
              </h1>
              <Badge
                variant={subscription.active ? "default" : "secondary"}
                className="h-6"
              >
                {subscription.active
                  ? t("active", "Active")
                  : t("inactive", "Inactive")}
              </Badge>
            </div>
          </div>
        </div>

        <Separator />

        {/* Metrics */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("agency_id", "Agency ID")}
              </CardTitle>
              <div className="rounded-full bg-primary/10 p-2">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {subscription.agency?.id}
              </div>
              <CardDescription className="mt-1">
                {t("agency_desc", "Associated agency")}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("start_date", "Start Date")}
              </CardTitle>
              <div className="rounded-full bg-primary/10 p-2">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {subscription.start_date}
              </div>
              <CardDescription className="mt-1">
                {t("subscription_start", "Subscription start date")}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("end_date", "End Date")}
              </CardTitle>
              <div className="rounded-full bg-primary/10 p-2">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subscription.end_date}</div>
              <CardDescription className="mt-1">
                {t("subscription_end", "Subscription end date")}
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* معلومات أساسية */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <Info className="h-5 w-5" />
            {t("basic_info", "Basic Information")}
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2 rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                {t("agency_id", "Agency ID")}
              </p>
              <p className="text-xl font-bold">{agency?.id}</p>
            </div>
            <div className="space-y-2 rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                {t("manager_id", "Manager ID")}
              </p>
              <p className="text-xl font-bold">{agency?.manager_id}</p>
            </div>
            <div className="space-y-2 rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                {t("setup_status", "Setup Status")}
              </p>
              <Badge
                variant={
                  agency?.setup_status === "complete" ? "default" : "secondary"
                }
                className="text-sm"
              >
                {agency?.setup_status === "complete"
                  ? t("complete", "Complete")
                  : t("incomplete", "Incomplete")}
              </Badge>
            </div>
            <div className="space-y-2 rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                {t("deleted", "Deleted")}
              </p>
              <p className="text-xl font-bold">
                {agency?.deleted_at ? t("yes", "Yes") : t("no", "No")}
              </p>
            </div>
          </div>
        </div>

        {/* Setup Steps */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <Settings className="h-5 w-5" />
            {t("setup_steps", "Setup Steps")}
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {agency?.setup_steps &&
              Object.entries(agency.setup_steps).map(([key, value]) => (
                <div key={key} className="space-y-3 rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium capitalize">
                      {t(key, key.replace("_", " "))}
                    </p>
                    {value ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XSquare className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {value
                      ? t("step_completed", "Step completed")
                      : t("step_pending", "Step pending")}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Timestamps */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <Clock className="h-5 w-5" />
            {t("timestamps", "Timestamps")}
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2 rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                {t("created_at", "Created at")}
              </p>
              <div className="space-y-1">
                <p className="font-medium">
                  {new Date(agency?.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(agency?.created_at).toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="space-y-2 rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                {t("updated_at", "Updated at")}
              </p>
              <div className="space-y-1">
                <p className="font-medium">
                  {new Date(agency?.updated_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(agency?.updated_at).toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="space-y-2 rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                {t("deleted_at", "Deleted at")}
              </p>
              <div className="space-y-1">
                <p className="font-medium">
                  {agency?.deleted_at
                    ? new Date(agency.deleted_at).toLocaleDateString()
                    : t("not_deleted", "Not deleted")}
                </p>
                {agency?.deleted_at && (
                  <p className="text-sm text-muted-foreground">
                    {new Date(agency.deleted_at).toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsDetalis;
