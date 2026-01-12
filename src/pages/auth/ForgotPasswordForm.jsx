import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail } from "lucide-react";

const ForgotPasswordForm = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isRtl = i18n.language === "ar";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert(t("forgotPassword.emailSent"));
      console.log("[v0] Password reset requested for:", email);
      navigate("/auth/otp-verification");
    }, 1000);
  };

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="w-full max-w-md mx-auto bg-transparent p-6 dark:bg-card"
    >
      {/* Header */}
      <div className="space-y-1 text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-primary dark:bg-primary rounded-lg flex items-center justify-center">
            <Mail className="w-6 h-6 text-primary-foreground dark:text-primary-foreground" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-foreground dark:text-foreground">
          {t("forgotPassword.title")}
        </h1>
        <p className="text-muted-foreground dark:text-muted-foreground">
          {t("forgotPassword.description")}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground dark:text-foreground">
            {t("forgotPassword.emailLabel")}
          </Label>
          <div className="relative">
            <Mail
              className={`absolute top-3 h-4 w-4 text-muted-foreground ${
                isRtl ? "right-3" : "left-3"
              }`}
            />
            <Input
              id="email"
              type="email"
              placeholder={t("forgotPassword.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`bg-background dark:bg-background border-border dark:border-border text-foreground dark:text-foreground placeholder:text-muted-foreground
                ${isRtl ? "pr-10 pl-3" : "pl-10 pr-3"}`}
              required
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col my-3">
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? t("forgotPassword.sending") : t("forgotPassword.resetButton")}
          </Button>

          <Link to="/auth/login" className="w-full mt-2">
            <Button
              variant="ghost"
              className="w-full text-foreground dark:text-foreground hover:bg-accent dark:hover:bg-accent flex items-center justify-center"
            >
              <ArrowLeft className={`w-4 h-4 ${isRtl ? "ml-2 mr-0" : "mr-2"}`} />
              {t("forgotPassword.backToLogin")}
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
