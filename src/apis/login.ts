import postWithoutToken from '../lib/post-without-token';
import LoginDetails from '../types/user/loginDetails';
import apis from './all-apis';

/**
 * @description - This function is used to get login token and user details
 * @param body {email: string, password: string}
 */

const login = async (body: { email: string; password: string }) => {
  const res = await postWithoutToken(apis.LOGIN, body);
  return {
    ok: res.ok,
    data: res.data as LoginDetails,
    message: res.message as string,
  };
};

export default login;
