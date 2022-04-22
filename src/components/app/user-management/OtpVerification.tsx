import { Button, notification } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import verifySignupOtp from '../../../apis/verify-signup-otp';
import classes from './OtpVerification.module.css';
import Otp from '../ui/Otp';

interface Props {
  id: string;
}

const OtpVerification = (props: Props) => {
  const [otp, setOtp] = useState<string>('');
  const navigate = useNavigate();

  const otpChangeHandler = (value: string) => {
    setOtp(value);
  };

  const verifyHandler = async () => {
    try {
      if (otp.length !== 6) {
        return notification.error({ message: 'Please enter a valid OTP' });
      }
      const { ok } = await verifySignupOtp({
        otp,
        id: props.id,
      });
      if (ok) {
        notification.success({ message: 'OTP verified successfully.' });
        navigate(`/app/users/${props.id}`);
        window.location.reload();
      }
    } catch (error) {}
  };

  return (
    <div className={classes['otp-verification__wrapper']}>
      <h1>Email Verification</h1>
      <p>Enter the OTP sent to the given email to verify the account.</p>
      <Otp onChange={otpChangeHandler} value={otp} numInputs={6} />
      <Button
        className={classes['otp-verification__btn']}
        onClick={verifyHandler}
        type="primary"
        shape="round"
      >
        verify
      </Button>
    </div>
  );
};

export default OtpVerification;
