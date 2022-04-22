import { Moment } from 'moment';

export default interface UserDetails {
  name: string;
  email: string;
  type: string;
  joiningDate: Moment | null;
  description: string;
  teacherId: string;
  phone: string;
}
