import { notification } from 'antd';
import axios, { AxiosError, AxiosResponse } from 'axios';
import apis from '../apis/all-apis';
import config from '../config/config';
import ApiResponse from '../types/api-response';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postWithoutToken = async (endpoint: string, body: any) => {
  try {
    const base =
      config.base || apis.API_BASE_URL || 'http://localhost:5000/api/v1';

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const { data } = (await axios.post(
      `${base}${endpoint}`,
      body,
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
        res.error.map((err) => notification.error({ message: err.message }));
      } else {
        notification.error({ message: res.message });
      }
    }
    return res;
  }
};

export default postWithoutToken;
