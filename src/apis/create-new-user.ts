import postWithToken from '../lib/post-with-token';
import UserDetails from '../types/user/userDetails';

/**
 * @description - This function is used to save a new user
 * @param body userDetails: string
 */

const createNewUser = async (body: UserDetails) => {
  const res = await postWithToken('/user/create_new_user', body);
  return {
    ok: res.ok,
    data: res.data as UserDetails,
    message: res.message as string,
  };
};

export default createNewUser;
