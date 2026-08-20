export const asString = (value: unknown): string | undefined =>
  typeof value === 'string' ? value : undefined;
