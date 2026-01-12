import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";

const OtpVerificationForm = () => {
  const { t, i18n } = useTranslation();
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const isRtl = i18n.language === "ar";

  const handleChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((num) => num !== "")) {
      navigate("/auth/reset-password");
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const isComplete = otp.every((num) => num !== "");
    if (!isComplete) {
      alert(t("otp.enterAllDigits"));
      return;
    }

    navigate("/auth/reset-password");
  };

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="w-full max-w-md mx-auto bg-transparent dark:bg-card p-6"
    >
      {/* Header */}
      <div className="space-y-1 text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-primary dark:bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary-foreground dark:text-primary-foreground" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-foreground dark:text-foreground">
          {t("otp.title")}
        </h1>
        <p className="text-muted-foreground dark:text-muted-foreground">
          {t("otp.description")}
        </p>
      </div>

      {/* OTP Inputs */}
      <div className="flex justify-center gap-2 mb-4">
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-14 text-center text-2xl font-bold bg-background dark:bg-background border border-border dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary text-foreground dark:text-foreground"
          />
        ))}
      </div>

      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground dark:text-muted-foreground">
          {t("otp.resend")}{" "}
          <span className="font-medium text-foreground dark:text-foreground">60s</span>
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col space-y-3">
        <Button
          onClick={handleVerify}
          className="w-full bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground hover:bg-primary/90 dark:hover:bg-primary/90"
        >
          {t("otp.verifyButton")}
        </Button>

        <Link to="/auth/login" className="w-full">
          <Button
            variant="ghost"
            className={`w-full text-foreground dark:text-foreground hover:bg-accent dark:hover:bg-accent flex items-center justify-center`}
          >
            <ArrowLeft className={`w-4 h-4 ${isRtl ? "ml-2 mr-0" : "mr-2"}`} />
            {t("otp.backToLogin")}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OtpVerificationForm;
