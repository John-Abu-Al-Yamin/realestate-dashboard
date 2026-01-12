import React from "react";
import { useTranslation } from "react-i18next";

const ActivityLogHeader = () => {
    const { t } = useTranslation();
    return (
        <div className="flex items-center justify-between ">
            <div>
                <h1 className="text-3xl font-bold text-foreground">{t('Activity Logs')}</h1>
                <p className="mt-1 text-sm text-muted-foreground">{t('sidebar.activityL')}</p>
            </div>
        </div>
    );
};

export default ActivityLogHeader;
