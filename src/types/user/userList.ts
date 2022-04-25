import UserDetails from './userDetails';
interface Userlist extends UserDetails {
  isActive: boolean;
  profileImage: string;
  createdAt: Date;
  label: string;
}
export default Userlist;
