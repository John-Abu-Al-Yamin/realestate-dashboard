import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Lock, Eye, EyeOff } from "lucide-react";

const ResetPasswordForm = () => {
  const { t, i18n } = useTranslation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const isRtl = i18n.language === "ar";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      alert(t("resetPassword.fillFields"));
      return;
    }

    if (newPassword.length < 6) {
      alert(t("resetPassword.passwordLength"));
      return;
    }

    if (newPassword !== confirmPassword) {
      alert(t("resetPassword.passwordMismatch"));
      return;
    }

    alert(t("resetPassword.success"));
    setTimeout(() => navigate("/auth/login"), 1200);
  };

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="w-full max-w-md mx-auto bg-transparent dark:bg-card p-6">
      {/* Header */}
      <div className="space-y-1 text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-primary dark:bg-primary rounded-lg flex items-center justify-center">
            <Lock className="w-6 h-6 text-primary-foreground dark:text-primary-foreground" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-foreground dark:text-foreground">
          {t("resetPassword.title")}
        </h1>
        <p className="text-muted-foreground dark:text-muted-foreground">
          {t("resetPassword.description")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* New Password */}
        <div className="space-y-2 relative">
          <Label htmlFor="newPassword" className="text-foreground dark:text-foreground">
            {t("resetPassword.newPassword")}
          </Label>
          <Input
            id="newPassword"
            type={showNewPassword ? "text" : "password"}
            placeholder={t("resetPassword.newPasswordPlaceholder")}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-background dark:bg-background border border-border dark:border-border text-foreground dark:text-foreground placeholder:text-muted-foreground dark:placeholder:text-muted-foreground pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className={`absolute ${isRtl ? "left-3" : "right-3"} top-1/2 text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground`}
          >
            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2 relative">
          <Label htmlFor="confirmPassword" className="text-foreground dark:text-foreground">
            {t("resetPassword.confirmPassword")}
          </Label>
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder={t("resetPassword.confirmPasswordPlaceholder")}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-background dark:bg-background border border-border dark:border-border text-foreground dark:text-foreground placeholder:text-muted-foreground dark:placeholder:text-muted-foreground pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className={`absolute ${isRtl ? "left-3" : "right-3"} top-1/2 text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground`}
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Buttons */}
        <div className="flex flex-col space-y-3 mt-4">
          <Button
            type="submit"
            className="w-full bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground hover:bg-primary/90 dark:hover:bg-primary/90"
          >
            {t("resetPassword.confirmButton")}
          </Button>

          <Link to="/auth/login" className="w-full">
            <Button
              variant="ghost"
              className={`w-full text-foreground dark:text-foreground hover:bg-accent dark:hover:bg-accent flex items-center justify-center`}
            >
              <ArrowLeft className={`w-4 h-4 ${isRtl ? "ml-2 mr-0" : "mr-2"}`} />
              {t("resetPassword.backToLogin")}
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
