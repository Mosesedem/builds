const API_BASE = 'https://v2.protonmedicare.com/api/actions';

export const checkEmail = async (email: string) => {
  const response = await fetch(`${API_BASE}/app.php?action=checkEmail`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return response.json();
};

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE}/app.php?action=login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const register = async (email: string, password: string, firstName: string, lastName: string) => {
  const response = await fetch(`${API_BASE}/app.php?action=register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, firstName, lastName }),
  });
  return response.json();
};

export const createEnrollment = async (formData: FormData) => {
  // For FormData, we need to append the action as part of the form data
  // since we can't use URL parameters with FormData
  formData.append('action', 'create-enrollment');
  
  const response = await fetch(`${API_BASE}/app.php`, {
    method: 'POST',
    body: formData, // FormData for file upload
  });
  return response.json();
};

// Type definitions for better TypeScript support
export interface ApiResponse {
  success: boolean;
  message: string;
  exists?: boolean;
  paymentUrl?: string;
  enrollment_id?: number;
}

export interface PaymentData {
  email: string;
  price: number;
  plan: string;
  enrollment_id: number;
  paymentType: 'subscription' | 'onetime';
}

export const initiatePayment = async (data: PaymentData) => {
  const response = await fetch(`${API_BASE}/app.php?action=initiate-payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};
