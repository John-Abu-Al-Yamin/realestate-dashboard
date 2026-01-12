import { useGetLogsId } from '@/hooks/Actions/allLogs/useCurdsLogs';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Calendar,
    User,
    Building2,
    FileText,
    Clock,
    Activity,
    Info,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LoadingSkeleton from '@/customs/LoadingSkeleton';

const ActivityLogPageDetalis = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === "rtl";
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: response, isPending } = useGetLogsId(id);

    if (isPending) {
        return <LoadingSkeleton />;
    }

    const log = response?.data?.data;

    if (!log) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <AlertCircle className="w-16 h-16 text-muted-foreground" />
                <h2 className="text-xl font-semibold">{t("No logs available")}</h2>
                <Button variant="outline" onClick={() => navigate(-1)}>
                    {t("go_back")}
                </Button>
            </div>
        );
    }

    const getEventColor = (event) => {
        switch (event) {
            case "created": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
            case "updated": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
            case "deleted": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
            default: return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
        }
    };

    const formatDate = (date) => {
        if (!date) return "-";
        return new Date(date).toLocaleString(isRTL ? 'ar-EG' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const KeyValueItem = ({ label, value }) => {
        if (value === null || value === undefined) return null;

        let displayValue = value;
        if (typeof value === 'boolean') {
            displayValue = value ? t("yes") : t("no");
        } else if (label.includes('created_at') || label.includes('updated_at')) {
            displayValue = formatDate(value);
        }

        return (
            <div className="flex flex-col space-y-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t(label) !== label ? t(label) : label.replace(/_/g, ' ')}
                </span>
                <span className="font-medium text-sm wrap-break-word">{displayValue}</span>
            </div>
        );
    };

    const DataCard = ({ title, icon: Icon, type, data }) => (
        <div className="bg-card rounded-lg border shadow-sm p-6 space-y-4 h-full">
            <div className="flex items-center space-x-3 mx-3 border-b pb-4">
                <div className="p-2 bg-primary/10 rounded-full">
                    <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold text-lg">{title}</h3>
                    {type && <Badge variant="secondary" className="mt-1">{t(type)}</Badge>}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data && Object.entries(data).map(([key, value]) => {
                    // Skip nested objects or huge text for grid
                    if (typeof value === 'object' && value !== null) return null;
                    return <KeyValueItem key={key} label={key} value={value} />;
                })}
            </div>

            {/* Handle nested objects separately (like setup_steps in Agency) */}
            {data && Object.entries(data).map(([key, value]) => {
                if (typeof value === 'object' && value !== null) {
                    return (
                        <div key={key} className="mt-4 pt-4 border-t">
                            <h4 className="font-medium mb-3 capitalize">{key.replace(/_/g, ' ')}</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {Object.entries(value).map(([nestedKey, nestedValue]) => (
                                    <div key={nestedKey} className="flex items-center space-x-2 mx-2 text-sm">
                                        {nestedValue ?
                                            <CheckCircle2 className="w-4 h-4 text-green-500" /> :
                                            <div className="w-4 h-4 rounded-full border-2 border-muted" />
                                        }
                                        <span className="capitalize">{nestedKey.replace(/_/g, ' ')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );

    return (
        <div className="min-h-screen bg-background p-4 md:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                        <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            {t("Activity Details")}
                            <Badge className={`${getEventColor(log.event)} border-0`}>
                                {t(log.event)}
                            </Badge>
                        </h1>
                        <p className="text-muted-foreground flex items-center gap-2 mt-1">
                            <span className="text-sm">#{log.id}</span>
                            <span>•</span>
                            <Clock className="w-3 h-3" />
                            <span className="text-sm">{formatDate(log.created_at)}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Causer/Actor Card */}
                <DataCard
                    title={t("By")}
                    icon={User}
                    type={log.causer?.type}
                    data={log.causer?.data}
                />

                {/* Subject/Target Card */}
                <DataCard
                    title={t("Target")}
                    icon={log.subject?.type === 'Agency' ? Building2 : FileText}
                    type={log.subject?.type}
                    data={log.subject?.data}
                />
            </div>

            {/* Raw info or Description if needed */}
            <div className="bg-card rounded-lg border shadow-sm p-6">
                <div className="flex items-start gap-4">
                    <Info className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                        <h3 className="font-semibold mb-1">{t("Description")}</h3>
                        <p className="text-muted-foreground rtl:text-right">
                            {t(log.description)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityLogPageDetalis;