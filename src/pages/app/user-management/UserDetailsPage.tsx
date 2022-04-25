import {
  Col,
  Form,
  Row,
  Input,
  DatePicker,
  Button,
  Select,
  notification,
} from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

import classes from './UserDetailsPage.module.css';
import Loader from '../../../components/app/ui/Loader';
import Applayout from '../../../layout/AppLayout';
import GeneralInfo from '../../../types/general-info';
import UserDetails from '../../../types/user/userDetails';
import ContentWrapper from '../../../components/app/ui/ContentWrapper';
import TextArea from 'antd/lib/input/TextArea';
import getUserDetailsById from '../../../apis/get-user-details-by-id';
import createNewUser from '../../../apis/create-new-user';
import OtpVerification from '../../../components/app/user-management/OtpVerification';
import updateUserDetails from '../../../apis/update-user-details';

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
  const navigate = useNavigate();

  const [newId, setNewId] = useState<string>('');
  const [userDetails, setUserDetails] = useState<Partial<UserDetails>>({
    id: '',
    passsword: '',
    name: '',
    email: '',
    type: 'ASSISTANT_TEACHER',
    joiningDate: null,
    description: '',
    teacherId: '',
    phone: '',
  });

  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>({
    isEditing: isNew,
    loading: false,
    showOtp: false,
  });

  const required = (field: string) => {
    return `${field} is required`;
  };

  /**
   * @description - This function is used to save a new user
   */

  const saveNewUser = async (details: UserDetails) => {
    try {
      const { ok, data } = await createNewUser(details);
      if (ok) {
        setNewId(data.id || '');
        setGeneralInfo({ ...generalInfo, showOtp: true });
        notification.success({ message: 'Please verify email to continue' });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const updateUser = async (details: UserDetails) => {
    try {
      const { ok } = await updateUserDetails(details);
      if (ok) {
        notification.success({ message: 'User details updated successfully' });
        if (details.id) {
          navigate(`/app/users/${details.id}`);
          window.location.reload();
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

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
    setUserDetails((userDetails) => ({ ...userDetails, ...changedValues }));
  };

  const finishHandler = async (details: UserDetails) => {
    try {
      setGeneralInfo((generalInfo) => ({ ...generalInfo, loading: true }));
      if (isNew) {
        // * If the user is new, then we need to save the user
        await saveNewUser(details);
      } else if (id) {
        // * Update the user details
        await updateUser(details);
      }
      setGeneralInfo((generalInfo) => ({ ...generalInfo, loading: false }));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      setGeneralInfo((generalInfo) => ({ ...generalInfo, loading: false }));
    }
  };

  const editButtonHandler = () => {
    setGeneralInfo((generalInfo) => ({
      ...generalInfo,
      isEditing: !generalInfo.isEditing,
    }));
  };

  const { isEditing, showOtp } = generalInfo;

  return (
    <Applayout>
      <Loader loading={generalInfo.loading}>
        <ContentWrapper>
          {/**
           * @description: If email is sent then show the otp verification
           */}
          {showOtp ? (
            <OtpVerification id={newId} />
          ) : (
            <Form
              onValuesChange={valuesChangeHandler}
              form={form}
              onFinish={finishHandler}
              name="userDetails"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Row gutter={gutter}>
                <Col>
                  <Item
                    rules={[
                      {
                        required: true,
                        message: required('Full name'),
                      },
                    ]}
                    label="Full name"
                    name="name"
                  >
                    <Input type="text" readOnly={!isEditing} />
                  </Item>
                  <Item
                    rules={[
                      {
                        required: true,
                        message: required('Email'),
                      },
                    ]}
                    label="Email"
                    name="email"
                  >
                    <Input type="email" readOnly={!isNew} />
                  </Item>
                  <Item
                    rules={[
                      {
                        required: true,
                        message: required('User type'),
                      },
                    ]}
                    label="Designation"
                    name="type"
                  >
                    <Select disabled={!isNew}>
                      <Select.Option value="ASSISTANT_TEACHER">
                        Assistant Teacher
                      </Select.Option>
                      <Select.Option value="SENIOR_TEACHER">
                        Senior Teacher
                      </Select.Option>
                      <Select.Option disabled value="PRINCIPAL">
                        Principal
                      </Select.Option>
                    </Select>
                  </Item>
                  {/**
                   * Only visble for new users
                   */}
                  {isNew && (
                    <Item label="Pasword" name="password">
                      <Input type="password" />
                    </Item>
                  )}
                </Col>
                <Col>
                  <Item
                    rules={[
                      {
                        required: true,
                        message: required('Phone number'),
                      },
                    ]}
                    label="Phone Number"
                    name="phone"
                  >
                    <Input type="tel" readOnly={!isEditing} />
                  </Item>
                  <Item label="Teacher ID" name="teacherId">
                    <Input
                      placeholder="System generated"
                      type="text"
                      readOnly={true}
                    />
                  </Item>
                  <Item
                    rules={[
                      {
                        required: true,
                        message: required('Joining date'),
                      },
                    ]}
                    label="Joining Date"
                    name="joiningDate"
                  >
                    <DatePicker
                      style={{
                        minWidth: '100%',
                      }}
                      disabled={!isNew}
                    />
                  </Item>
                </Col>
              </Row>
              <Row>
                <Col lg={9} md={9}>
                  <Item
                    rules={[
                      {
                        required: true,
                        message: required('Description'),
                      },
                    ]}
                    label="Description"
                    name="description"
                  >
                    <TextArea rows={5} readOnly={!isEditing} />
                  </Item>
                  {/* If the user is new, then show only save button otherwise
                show update and cancel buttons show edit and update button */}
                  <div className={classes['btn__wrapper']}>
                    {isNew ? (
                      <Button htmlType="submit" type="primary" shape="round">
                        Save
                      </Button>
                    ) : (
                      <>
                        <Button
                          onClick={editButtonHandler}
                          type={isEditing ? 'ghost' : 'primary'}
                          shape="round"
                        >
                          {isEditing ? 'Cancel' : 'Edit'}
                        </Button>
                        {'  '}
                        {isEditing ? (
                          <Button
                            htmlType="submit"
                            type="primary"
                            shape="round"
                          >
                            Update
                          </Button>
                        ) : null}
                      </>
                    )}
                  </div>
                </Col>
              </Row>
            </Form>
          )}
        </ContentWrapper>
      </Loader>
    </Applayout>
  );
};

export default UserDetailsPage;
