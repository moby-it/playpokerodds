const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export function isValidEmail(value: string) {
  return emailRegex.test(value);
}
