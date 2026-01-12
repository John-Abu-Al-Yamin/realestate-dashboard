import { z } from "zod";

export const validationAgency = [
  // Step 1 - Basic Info
  z.object({
    user_name: z.string().min(1, "User Name is required"),
    brand_name: z.string().min(1, "Brand Name is required"),
    phone_number: z.string().min(10, "Phone Number is required"),
    mobile_number: z.string().min(10, "Mobile Number is required"),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    url: z.string().url("Invalid URL").optional().or(z.literal("")),

    social_media_links: z.array(z.string()).optional(), // <-- هنا بدل string
  }),

  // Step 2 - Overview & Content
  z.object({
    overview: z.string().min(1, "Overview is required"),
    vision: z.string().min(1, "Vision is required"),
    message: z.string().min(1, "Message is required"),
    features: z.string().min(1, "Features is required"),
    attachment: z.any().optional(),
  }),

  // Step 3 - Legal & Verification
  z.object({
    commercial_license: z
      .string()
      .min(1, "validation.commercialLicenseRequired"),
    commercial_license_attachment: z
      .any()
      .refine(
        (files) => files && files.length > 0,
        "validation.commercialLicenseAttachmentRequired"
      ),
    tax_license: z.string().min(1, "validation.taxLicenseRequired"),
    tax_license_attachment: z
      .any()
      .refine(
        (files) => files && files.length > 0,
        "validation.taxLicenseAttachmentRequired"
      ),
    fal_license: z.string().min(1, "validation.falLicenseRequired"),
    fal_license_attachment: z
      .any()
      .refine(
        (files) => files && files.length > 0,
        "validation.falLicenseAttachmentRequired"
      ),
    address: z.string().min(1, "Address is required"),
    address_attachment: z
      .any()
      .refine(
        (files) => files && files.length > 0,
        "validation.addressAttachmentRequired"
      ),
    verification_expiry: z.string().optional(),
    history: z.string().optional(),
    region_id: z.string().min(1, "validation.regionRequired"),
  }),

  // Step 4 - Policies
  z.object({
    terms_and_conditions: z.string().optional(),
    privacy_policy: z.string().optional(),
    faqs: z
      .array(
        z.object({
          question: z.string().min(1, "Question is required"),
          answer: z.string().min(1, "Answer is required"),
        })
      )
      .optional(),
    cookies_policy: z.string().optional(),
  }),

  // Step 5 - Branding & Theme
  z.object({
    logo: z.any().optional(),
    icon: z.any().optional(),
    watermark: z.any().optional(),
    primary_color: z.string().optional(),
    secondary_color: z.string().optional(),
    font: z.string().optional(),
    theme: z.string().optional(),
  }),
];
