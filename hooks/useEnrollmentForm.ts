import { useState, useEffect } from "react";
import { plans, durations } from "@/lib/constants";
import { toast } from "react-hot-toast";

export interface FormData {
  duration: string;
  plan: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  maritalStatus: string;
  referral: string;
  headshot: File | null;
}

export function useEnrollmentForm() {
  const [formData, setFormData] = useState<FormData>({
    duration: "",
    plan: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    referral: "",
    maritalStatus: "",
    headshot: null,
  });

  const [price, setPrice] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const selectedPlan = plans.find((p) => p.name === formData.plan);
    const selectedDuration = durations.find(
      (d) => d.value === formData.duration
    );
    if (selectedPlan && selectedDuration) {
      const basePrice = selectedPlan.basePrice;
      const discountedPrice = basePrice * (1 - selectedDuration.discount);
      setPrice(discountedPrice * parseInt(formData.duration));
    }
  }, [formData.plan, formData.duration]);

  // const validateDOB = (dob: string) => {
  //   const today = new Date()
  //   const birthDate = new Date(dob)
  //   return birthDate < today
  // }

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   if (name === "dob" && !validateDOB(value)) {
  //     toast.error("Date of birth must be in the past")
  //     return
  //   }
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, headshot: file }));
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return {
    formData,
    price,
    previewImage,
    // handleInputChange,
    handleFileChange,
    handleSelectChange,
    // errors,
    setFormData,
  };
}
