export interface DecodedJwt {
  userId: string;
  email: string;
  role: number;
}
export function decodedJwtIsValid(
  decodedJwt: unknown
): decodedJwt is DecodedJwt {
  return (
    typeof decodedJwt === 'object' &&
    !!decodedJwt &&
    'userId' in decodedJwt &&
    'email' in decodedJwt &&
    'role' in decodedJwt
  );
}
