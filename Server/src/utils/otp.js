export const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  return {
    otp,
    expires: Date.now() + 5 * 60 * 1000 // 5 minutes
  };
};
