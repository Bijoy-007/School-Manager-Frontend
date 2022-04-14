import { Col, Form, Row, Input, DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../../../components/app/ui/Loader';
import Applayout from '../../../layout/AppLayout';
import GeneralInfo from '../../../types/generalInfo';
import UserDetails from '../../../types/user/userDetails';
import ContentWrapper from '../../../components/app/ui/ContentWrapper';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';

const { Item } = Form;

const gutter = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 8,
};

const UserDetailsPage = () => {
  const { id } = useParams();
  const isNew = id === 'new';
  const [form] = Form.useForm();

  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    email: '',
    designation: '',
    joiningDate: null,
    description: '',
    teacherId: '',
    phone: '',
  });

  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>({
    isEditing: isNew,
    loading: false,
  });

  /**
   * @description: This isthe initial effect to fetch the user details
   */

  useEffect(() => {
    setGeneralInfo((generalInfo) => ({ ...generalInfo, loading: true }));
    /**
     * @note: Mock API call
     */
    const timer = setTimeout(() => {
      setUserDetails({
        name: 'Bijoy Das',
        email: 'dasbijoy9804417767@gmail.com',
        designation: 'Associate Software Engineer',
        joiningDate: moment('2020-06-01', 'DD-MM-YYYY'),
        description: 'some description',
        teacherId: 'T001',
        phone: '8240940338',
      });
      setGeneralInfo((generalInfo) => ({ ...generalInfo, loading: false }));
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  /**
   * @description: This effect is used to update UI with the change of state of the user details
   */

  useEffect(() => {
    form.setFieldsValue(userDetails);
    // eslint-disable-next-line no-console
    console.log('New fields value', form.getFieldsValue());
  }, [userDetails]);

  const valuesChangeHandler = (changedValues: Partial<UserDetails>) => {
    alert('Values changed');
    setUserDetails((userDetails) => ({ ...userDetails, ...changedValues }));
  };

  const updateHandler = (details: UserDetails) => {
    // eslint-disable-next-line no-console
    console.log(details);
  };

  return (
    <Applayout>
      <Loader loading={generalInfo.loading}>
        <ContentWrapper>
          <Form
            onValuesChange={valuesChangeHandler}
            form={form}
            onFinish={updateHandler}
            name="userDetails"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Row gutter={gutter}>
              <Col>
                <Item label="Full name" name="name">
                  <Input />
                </Item>
                <Item label="Email" name="email">
                  <Input type="email" readOnly={!generalInfo.isEditing} />
                </Item>
                <Item label="Designation" name="designation">
                  <Input type="text" readOnly={!generalInfo.isEditing} />
                </Item>
              </Col>
              <Col>
                <Item label="Phone Number" name="phone">
                  <Input type="tel" readOnly={!generalInfo.isEditing} />
                </Item>
                <Item label="Teacher ID" name="teacherId">
                  <Input type="text" readOnly={!generalInfo.isEditing} />
                </Item>
                <Item label="Joining Date" name="joiningDate">
                  <DatePicker
                    style={{
                      minWidth: '100%',
                    }}
                    inputReadOnly={!generalInfo.isEditing}
                  />
                </Item>
              </Col>
            </Row>
            <Row>
              <Col lg={9} md={9}>
                <Item label="Description" name="description">
                  <TextArea rows={5} readOnly={!generalInfo.isEditing} />
                </Item>
              </Col>
            </Row>
          </Form>
        </ContentWrapper>
      </Loader>
    </Applayout>
  );
};

export default UserDetailsPage;
