export function validateObject(o: unknown): o is Record<string, unknown> {
  return typeof o === 'object' && !!o;
}
