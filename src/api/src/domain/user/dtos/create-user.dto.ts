export interface CreateUserDto {
  username: string;
  email: string;
  salt: string;
  hash: string;
}
