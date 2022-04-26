import postWithToken from '../lib/post-with-token';
import OTP from '../types/otp';

/**
 * @description - This function is used to verify the signup otp
 * @param body userDetails: string
 */

const verifySignupOtp = async (body: OTP) => {
  const res = await postWithToken('/auth/verify_signup_otp', body);
  return {
    ok: res.ok,
    data: res.data as null,
    message: res.message as string,
  };
};

export default verifySignupOtp;
