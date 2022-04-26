import UserDetails from './userDetails';

export default interface LoginDetails {
  user: UserDetails;
  token: string;
}
