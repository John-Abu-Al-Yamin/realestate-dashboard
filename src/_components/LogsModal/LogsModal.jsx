import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomLoaderTable from "@/customs/CustomLoaderTable";
import { useGetLogsId } from "@/hooks/Actions/allLogs/useCurdsLogs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from "next-i18next";

const LogsModal = ({ isOpen, onClose, id ,type }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const { data, isPending: isLogsPending } = useGetLogsId(id, type);

  const logsData = data?.data?.data ? [data.data.data] : [];

  console.log("Logs data:", logsData);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1100px]">
        <DialogHeader>
          <DialogTitle>{t("Activity Logs")}</DialogTitle>
        </DialogHeader>

        {}

        <div className="rounded-md border">
          {isLogsPending ? (
            <div className="p-4">
              <CustomLoaderTable />
            </div>
          ) : (
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
                </TableRow>
              </TableHeader>

              <TableBody>
                {logsData.length > 0 ? (
                  logsData.map((log, index) => (
                    <TableRow
                      key={log.id || index}
                      className="cursor-pointer transition-colors hover:bg-muted/60"
                    >
                      <TableCell className="font-medium">
                        {log.event || "-"}
                      </TableCell>
                      <TableCell>{log.description || "-"}</TableCell>
                      <TableCell className={isRTL ? "text-right" : "text-left"}>
                        {log.causer?.data
                          ? `${log.causer.data.first_name} ${log.causer.data.last_name}`
                          : log.causer?.type || "-"}
                      </TableCell>
                      <TableCell className={isRTL ? "text-right" : "text-left"}>
                        {log.subject?.type || "-"} #
                        {log.subject?.data?.id || "-"}
                      </TableCell>
                      <TableCell className={isRTL ? "text-right" : "text-left"}>
                        {log.created_at
                          ? new Date(log.created_at).toLocaleString(
                              isRTL ? "ar-SA" : "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="p-4 text-center text-gray-500"
                    >
                      {t("No logs available")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LogsModal;
