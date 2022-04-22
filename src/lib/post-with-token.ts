import { notification } from 'antd';
import axios, { AxiosError, AxiosResponse } from 'axios';
import config from '../config/config';
import ApiResponse from '../types/api-response';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postWithToken = async (endpoint: string, body: any) => {
  try {
    const base = config.base || 'http://localhost:5000/api/v1';
    const token = localStorage.getItem('token') || '';
    const reqConfig = {
      headers: { Authorization: `Bearer ${token}` },
    };

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const { data } = (await axios.post(
      `${base}${endpoint}`,
      body,
      reqConfig,
    )) as AxiosResponse<ApiResponse>;

    if (data?.status) {
      return {
        ok: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: data.data,
        message: data.message,
      };
    } else {
      return {
        ok: false,
        data: null,
        message: data.message,
        error: data.error,
      };
    }
  } catch (err) {
    const error = err as AxiosError<ApiResponse>;
    const res = {
      ok: false,
      data: null,
      message: error.response?.data?.message,
      error: error.response?.data?.error,
    };
    // * Show error notification
    if (!res.ok) {
      if (res.error?.length) {
        res.error.map((err) =>
          notification.error({
            message: err.msg || err.message,
          }),
        );
      } else {
        notification.error({ message: res.message });
      }
    }
    return res;
  }
};

export default postWithToken;
