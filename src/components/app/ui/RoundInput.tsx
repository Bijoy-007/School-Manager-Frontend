import { Input } from 'antd';

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const RoundInput = (props: Props) => {
  return (
    <Input
      {...props}
      style={{
        ...props.style,
        borderRadius: '50px',
      }}
    />
  );
};

export default RoundInput;
