import OtpInput from 'react-otp-input';

import classes from './Otp.module.css';

interface Props {
  value: string | undefined;
  onChange: (value: string) => void;
  numInputs: number;
}

const Otp = (props: Props) => {
  const { value, onChange, numInputs } = props;

  const separator = <span className={classes['otp__separator']}>-</span>;

  return (
    <div className={classes['otp__wrapper']}>
      <OtpInput
        inputStyle={{
          border: '3px solid #d9d9d9',
          width: '3rem',
          height: '3rem',
          borderRadius: '10px',
        }}
        separator={separator}
        value={value}
        onChange={onChange}
        numInputs={numInputs}
      />
    </div>
  );
};

export default Otp;
