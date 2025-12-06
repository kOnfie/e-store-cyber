// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate card number (16 digits)
export const isValidCardNumber = (cardNumber: string): boolean => {
  const cleanedNumber = cardNumber.replace(/\s/g, '');
  return /^\d{16}$/.test(cleanedNumber);
};

// Validate CVV (3 digits)
export const isValidCVV = (cvv: string): boolean => {
  return /^\d{3}$/.test(cvv);
};

// Validate expiration date (MM/YY format)
export const isValidExpirationDate = (expirationDate: string): boolean => {
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!regex.test(expirationDate)) return false;

  const [month, year] = expirationDate.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  const expYear = parseInt(year, 10);
  const expMonth = parseInt(month, 10);

  if (expYear < currentYear) return false;
  if (expYear === currentYear && expMonth < currentMonth) return false;

  return true;
};

// Validate postal code (basic check)
export const isValidPostalCode = (postalCode: string): boolean => {
  return postalCode.trim().length >= 3;
};
