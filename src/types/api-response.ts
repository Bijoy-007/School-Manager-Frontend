export default interface ApiResponse {
  status: boolean;
  data: unknown;
  message: string;
  error: [{ message: string }];
}
