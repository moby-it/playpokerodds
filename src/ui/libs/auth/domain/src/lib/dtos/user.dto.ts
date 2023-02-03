export interface SigninDto {
  username: string;
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
