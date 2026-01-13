import CustomLoaderTable from "@/customs/CustomLoaderTable";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from "next-i18next";
import { User, Building2, Settings, FileText, Clock, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const ActivityLogTable = ({ logs, isPending }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const safeLogs = Array.isArray(logs) ? logs : [];

  // Get icon based on subject type
  const getSubjectIcon = (type) => {
    switch (type) {
      case "Agency":
        return <Building2 className="h-4 w-4" />;
      case "Manager":
        return <User className="h-4 w-4" />;
      case "AgencyMasterData":
        return <FileText className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  // Get badge variant based on event type
  const getEventBadgeStyle = (event) => {
    switch (event) {
      case "created":
        return "bg-green-600 hover:bg-green-600 text-white";
      case "updated":
        return "bg-blue-600 hover:bg-blue-600 text-white";
      case "deleted":
        return "bg-red-600 hover:bg-red-600 text-white";
      default:
        return "bg-gray-500 hover:bg-gray-500 text-white";
    }
  };

  // Format causer name
  const formatCauserName = (causer) => {
    if (!causer?.data) return "-";
    const { first_name, second_name, last_name } = causer.data;
    return `${first_name || ""} ${second_name || ""} ${last_name || ""}`.trim();
  };

  // Format subject info
const formatSubjectInfo = (subject) => {
  if (!subject) return { type: "-", id: "-", name: "-" };

  const type = subject.type || "-";
  const id = subject.data?.id || "-";

  let name = "-";

  if (subject.type === "AgencyMasterData" && subject.data?.brand_name) {
    name = subject.data.brand_name;
  } else if (subject.type === "Manager" && subject.data) {
    name = `${subject.data.first_name || ""} ${subject.data.last_name || ""}`.trim();
  } else if (subject.type === "Agency" && subject.data) {
    // جلب الاسم الحقيقي من الـ master_data لو موجود
    name =
      subject.data?.master_data?.brand_name || // لو موجود في الـ master_data
      subject.data?.profile?.agency_name ||   // لو عندك agency.profile فيه الاسم
      `Agency #${id}`;                        // fallback
  } else if (subject.type === "SubscriptionPlan" && subject.data?.name) {
    name = subject.data.name;
  }

  return { type, id, name };
};


  // Format date/time
  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(i18n.language === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (isPending) {
    return <CustomLoaderTable />;
  }

  if (safeLogs.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        {t("No logs available")}
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table className="border-collapse">
        <TableHeader>
          <TableRow>
            <TableHead className={isRTL ? "text-right" : "text-left"}>
              {t("Event")}
            </TableHead>
            <TableHead className={isRTL ? "text-right" : "text-left"}>
              {t("Description")}
            </TableHead>
            <TableHead className={isRTL ? "text-right" : "text-left"}>
              {t("By")}
            </TableHead>
            <TableHead className={isRTL ? "text-right" : "text-left"}>
              {t("Target")}
            </TableHead>
            <TableHead className={isRTL ? "text-right" : "text-left"}>
              {t("Time")}
            </TableHead>
            <TableHead className={isRTL ? "text-right" : "text-left"}>
              {t("Actions")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {safeLogs.map((log, index) => {
            const subjectInfo = formatSubjectInfo(log.subject);
            return (
              <TableRow
                key={log.id}
                className={`
                  cursor-pointer transition-colors
                  ${index % 2 === 0 ? "bg-background" : "bg-muted/70"}
                  hover:bg-muted/60
                `}
              >
                <TableCell>
                  <Badge className={getEventBadgeStyle(log.event)}>
                    {t(log.event) || log.event}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {t(log.description) || log.description}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">
                        {formatCauserName(log.causer)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {log.causer?.type || "-"}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                      {getSubjectIcon(log.subject?.type)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">
                        {t(subjectInfo.type)} #{subjectInfo.id}
                      </span>
                      {subjectInfo.name && (
                        <span className="text-xs text-muted-foreground">
                          {subjectInfo.name}
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">
                      {formatDateTime(log.created_at)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Link to={`/activity-log/${log.id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ActivityLogTable;
