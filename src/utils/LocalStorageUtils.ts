export interface FormData {
  fullName: string;
  phone: string;
  countryCode: string;
  email: string;
  workAuthorization: string;
}

const STORAGE_KEY = "flashfire_signup_form_data";

export function loadFormData(): FormData {
  if (typeof window === "undefined") {
    return {
      fullName: "",
      phone: "",
      countryCode: "+1",
      email: "",
      workAuthorization: "",
    };
  }
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch {
    /* ignore */
  }
  return {
    fullName: "",
    phone: "",
    countryCode: "+1",
    email: "",
    workAuthorization: "",
  };
}
