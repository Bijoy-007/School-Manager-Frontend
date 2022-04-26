import postWithToken from '../lib/post-with-token';
import UserDetails from '../types/user/userDetails';

/**
 * @description - This function is used to update the user details
 * @param body userDetails: string
 */

const updateUserDetails = async (body: Partial<UserDetails>) => {
  const res = await postWithToken('/user/update_user_details', body);
  return {
    ok: res.ok,
    data: res.data as UserDetails,
    message: res.message as string,
  };
};

export default updateUserDetails;
