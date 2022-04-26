import postWithToken from '../lib/post-with-token';
import UserDetails from '../types/user/userDetails';

/**
 * @description - This function is used to get the user details by id.
 * @param body {id: string}
 */

const getUserDetailsById = async (body: { id: string }) => {
  const res = await postWithToken('/user/get_user_by_id', body);
  return {
    ok: res.ok,
    data: res.data as UserDetails,
    message: res.message as string,
  };
};

export default getUserDetailsById;
