export function getSecretKey(): string {
  const secretkey = process.env['JWT_SECRET'];
  if (!secretkey) throw new Error('secret key not present');
  return secretkey;
}
