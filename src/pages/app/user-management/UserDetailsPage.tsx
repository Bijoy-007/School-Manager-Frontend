import { Col, Form, Row, Input, DatePicker } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../../../components/app/ui/Loader';
import Applayout from '../../../layout/AppLayout';
import GeneralInfo from '../../../types/general-info';
import UserDetails from '../../../types/user/userDetails';
import ContentWrapper from '../../../components/app/ui/ContentWrapper';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import getUserDetailsById from '../../../apis/get-user-details-by-id';

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
    type: '',
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
   * @description: This is function is used to get user details by id
   */

  const fetchDetails = useCallback(async () => {
    try {
      setGeneralInfo((generalInfo) => ({ ...generalInfo, loading: true }));
      const res = await getUserDetailsById({ id: id || '' });
      if (res.data && res.ok) {
        setUserDetails({
          ...res.data,
          joiningDate: moment(res.data.joiningDate),
        });
      }

      setGeneralInfo((generalInfo) => ({ ...generalInfo, loading: false }));
    } catch (error) {
      setGeneralInfo((generalInfo) => ({ ...generalInfo, loading: false }));
    }
  }, []);

  /**
   * @description: This is the initial effect to fetch the user details
   */

  useEffect(() => {
    // * If the user is not new, then we need to fetch the details
    if (!isNew) {
      fetchDetails().catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
    }
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
                <Item label="Designation" name="type">
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
