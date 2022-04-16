import { Form, Input, Button } from 'antd';

const LoginForm = () => {
  const onFinish = (values: unknown) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: unknown) => {
    //  eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
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
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{ margin: '2% auto' }}
    >
      <Form.Item
        label="Username"
        name="username"
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

// import { Form, Input, Button, Checkbox } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';

// const LoginForm = () => {
//   const onFinish = (values: unknown) => {
//     // eslint-disable-next-line no-console
//     console.log('Received values of form: ', values);
//   };

//   return (
//     <Form
//       name="normal_login"
//       className="login-form"
//       initialValues={{
//         remember: true,
//       }}
//       onFinish={onFinish}
//     >
//       <Form.Item
//         name="username"
//         rules={[
//           {
//             required: true,
//             message: 'Please input your Username!',
//           },
//         ]}
//       >
//         <Input
//           prefix={<UserOutlined className="site-form-item-icon" />}
//           placeholder="Username"
//         />
//       </Form.Item>
//       <Form.Item
//         name="password"
//         rules={[
//           {
//             required: true,
//             message: 'Please input your Password!',
//           },
//         ]}
//       >
//         <Input
//           prefix={<LockOutlined className="site-form-item-icon" />}
//           type="password"
//           placeholder="Password"
//         />
//       </Form.Item>
//       <Form.Item>
//         <Form.Item name="remember" valuePropName="checked" noStyle>
//           <Checkbox>Remember me</Checkbox>
//         </Form.Item>

//         <a className="login-form-forgot" href="">
//           Forgot password
//         </a>
//       </Form.Item>

//       <Form.Item>
//         <Button type="primary" htmlType="submit" className="login-form-button">
//           Log in
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default LoginForm;
