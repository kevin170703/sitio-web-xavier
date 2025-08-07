export interface FormData {
  // Información de Contacto Principal
  contactName: string;
  contactPhone: string;
  contactEmail: string;

  // Información de Empresa
  companyName: string;
  companyPhone: string;
  companyEmail: string;
  companyProducts: string;
  companyHistory: string;
  companyMission: string;

  // Público Objetivo
  targetDemographics: string;
  targetConsumptionHabits: string;
  targetCommunicationTone: string;

  // Objetivos
  projectGoals: string;

  // Identidad de Marca
  hasLogo: string;
  hasBrandManual: string;
  hasContent: string;
  contentRestrictions: string;
  competitors: string;

  // Presencia Digital
  hasDomain: string;
  domainName: string;
  socialMedia: {
    instagram: boolean;
    facebook: boolean;
    linkedin: boolean;
    other: boolean;
  };
  otherSocialMediaMessage: string;
  projectTimeline: string;

  // Servicios Digitales
  hasWebsite: string;
  websiteObjective: string;
  needsMultilingual: string;
  securityLevel: string;
  externalTools: string;

  // Servicios Adicionales
  services: {
    aiChat: boolean;
    aiCalls: boolean;
    departmentCalendar: boolean;
    languageTranslator: boolean;
    seo: boolean;
    socialMediaManagement: boolean;
    paidAdvertising: boolean;
  };

  // Información Adicional
  additionalInfo: string;
}

export async function sendEmail({
  name,
  email,
  message,
  company,
  country,
  phone,
}: {
  name: string;
  email: string;
  message: string;
  company: string;
  country: string;
  phone: string;
}) {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Aquí puedes incluir datos adicionales si lo necesitas
        name,
        email,
        message,
        company,
        country,
        phone,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      return result;
    }
  } catch (error) {
    console.error("Error de red:", error);
  }
}

export async function sendEmailClient(formData: FormData) {
  try {
    const response = await fetch("/api/send-email-client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      return result;
    }
  } catch (error) {
    console.error("Error de red:", error);
  }
}
