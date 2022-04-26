import getWithToken from '../lib/get-with-token';
import Userlist from '../types/user/userList';
import apis from './all-apis';

/**
 * @description - This function is used to get the user details by id.
 * @param body {id: string}
 */

const getAllUser = async () => {
  const res = await getWithToken(apis.GET_ALL_USERS);
  return {
    ok: res.ok,
    data: res.data as Userlist[],
    message: res.message as string,
  };
};

export default getAllUser;
