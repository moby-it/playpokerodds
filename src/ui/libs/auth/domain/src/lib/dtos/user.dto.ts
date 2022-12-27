export interface SigninDto {
  email: string;
  password: string;
}
export interface RegisterDto extends SigninDto {
  username: string;
}
export interface AuthResposeDto {
  id: string;
  username: string;
  email: string;
  score: number;
  token: string;
}

export interface UserResposeDto {
  id: string;
  username: string;
  email: string;
  score: number;
}

export interface EditUserDto {
  username: string;
}
