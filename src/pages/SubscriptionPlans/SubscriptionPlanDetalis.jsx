import { useGetSubscriptionPlanId } from "@/hooks/Actions/subscription-plans/useCardSubscriptionPlans";
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
  HardDrive,
  Users,
  Building2,
  ArrowLeft,
  Clock,
} from "lucide-react";
import CustomLoadingCard from "@/customs/CustomLoadingCard";

const SubscriptionPlanDetails = () => {
  const { id } = useParams();
  const { data: response, isPending } = useGetSubscriptionPlanId(id);
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (isPending) {
    return <CustomLoadingCard />;
  }

  const plan = response?.data?.data;

  if (!plan) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">
          {t("plan_not_found", "Plan not found")}
        </h2>
        <Button onClick={() => navigate("/subscription-plans")}>
          {t("go_back", "Go Back")}
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto w-full space-y-8">
        {/* Header Section */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className="-ml-2 mb-2 text-muted-foreground"
              onClick={() => navigate("/subscription-plans")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("back_to_plans", "Back to Plans")}
            </Button>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{plan.name}</h1>
              <Badge
                variant={plan.active ? "default" : "secondary"}
                className="h-6"
              >
                {plan.active
                  ? t("active", "Active")
                  : t("inactive", "Inactive")}
              </Badge>
            </div>
            <p className="text-xl font-medium text-primary">
              ${plan.price}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                / {t("month", "month")}
              </span>
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">{t("edit_plan", "Edit Plan")}</Button>
            <Button onClick={() => navigate("/subscription-plans/add")}>
              {t("add subscribe", "Add Subscribe")}
            </Button>
          </div>
        </div>

        <Separator />

        {/* Metrics Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("max_storage", "Max Storage")}
              </CardTitle>
              <div className="rounded-full bg-primary/10 p-2">
                <HardDrive className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {plan.max_storage}{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  GB
                </span>
              </div>
              <CardDescription className="mt-1">
                {t("storage_desc", "Total available cloud storage")}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("max_staff", "Max Staff")}
              </CardTitle>
              <div className="rounded-full bg-primary/10 p-2">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {plan.max_staff}{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  {t("members", "Members")}
                </span>
              </div>
              <CardDescription className="mt-1">
                {t("staff_desc", "Maximum number of team members")}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("max_properties", "Max Properties")}
              </CardTitle>
              <div className="rounded-full bg-primary/10 p-2">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {plan.max_properties}{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  {t("listings", "Listings")}
                </span>
              </div>
              <CardDescription className="mt-1">
                {t("properties_desc", "Maximum properties allowed")}
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Footer Info */}
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <h3 className="font-semibold">
                  {t("plan_details", "Plan Details")}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    {t("created_at", "Created at")}:{" "}
                    {new Date(plan.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-end space-y-2 md:text-right">
                <p className="text-sm text-muted-foreground">
                  {t("pricing_summary", "Monthly billing cycle")}
                </p>
                <p className="text-2xl font-bold">
                  {plan.name} - ${plan.price}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionPlanDetails;
