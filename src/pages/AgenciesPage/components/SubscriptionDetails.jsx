import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useTranslation } from "next-i18next";

const SubscriptionDetails = () => {
    const { register, setValue, watch, formState: { errors } } = useFormContext();
    const planType = watch('planType');
    const { t } = useTranslation();

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="planType">{t('Plan Type')}</Label>
                    <Select onValueChange={(value) => setValue('planType', value)} value={planType}>
                        <SelectTrigger>
                            <SelectValue placeholder={t('Select Plan')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="basic">{t('Basic (Silver)')}</SelectItem>
                            <SelectItem value="premium">{t('Premium (Gold)')}</SelectItem>
                            <SelectItem value="enterprise">{t('Enterprise (Platinum)')}</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.planType && <p className="text-red-500 text-sm">{t(errors.planType.message)}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="startDate">{t('Start Date')}</Label>
                    <Input id="startDate" type="date" {...register('startDate')} />
                    {errors.startDate && <p className="text-red-500 text-sm">{t(errors.startDate.message)}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="endDate">{t('End Date')}</Label>
                    <Input id="endDate" type="date" {...register('endDate')} />
                    {errors.endDate && <p className="text-red-500 text-sm">{t(errors.endDate.message)}</p>}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionDetails;
