export const handleDbError = (e: unknown) => {
  if (e instanceof Error) {
    return e;
  } else {
    return new Error(String(e));
  }
};
