import { useState } from 'react';
import { Modal, Button } from 'antd';
import LoginForm from './LoginForm';

const LoginModal = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Login
      </Button>
      <Modal
        title="Log In"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={400}
        maskClosable={false}
      >
        <LoginForm />
      </Modal>
    </>
  );
};

export default LoginModal;
