import { Form, Input, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import login from '../../../apis/login';
import { loginReducer } from '../../../store/slices/authSlice';

interface loginPost {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * @description: fetch login details
   */
  const fetchLogin = async (values: loginPost) => {
    try {
      const res = await login({
        email: values.email,
        password: values.password,
      });
      if (res.data && res.ok) {
        // eslint-disable-next-line no-console
        console.log(res.data);
        /**
         * TODO => handle type any err
         */
        // eslint-disable-next-line  @typescript-eslint/no-unsafe-argument
        localStorage.setItem('token', res.data.token);
        dispatch(loginReducer());
        notification.success({ message: 'Logged In successfully' });
        navigate(`/app/dashboard`);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      notification.error({ message: 'Something went wrong!' });
    }
  };

  const onFinish = (values: loginPost) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
    fetchLogin(values).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      notification.error({ message: 'Something went wrong!' });
    });
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
      style={{ margin: '2% auto' }}
    >
      <Form.Item
        label="Username"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item name="remember" valuePropName="checked" noStyle>
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

      <Form.Item
        wrapperCol={{
          span: 24,
        }}
      >
        <Button type="primary" htmlType="submit" shape="round" block>
          Submit
        </Button>
        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;

/**
 * {
    "email": "dasbijoy9804417767@gmail.com",
    "password": "Abcd@1234"
}
 */
