import { Response } from 'express';

export const asString = (value: unknown): string | undefined =>
  typeof value === 'string' ? value : undefined;

export const parseOptionalBoolean = (value: unknown): boolean | undefined => {
  const raw = asString(value);
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  return undefined;
};

export const internalServerError = (res: Response) =>
  res.status(500).json({
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_SERVER_ERROR',
    },
  });

export const formatNameList = (names: string[]): string => {
  if (names.length === 0) return '';
  if (names.length === 1) return names[0]!;
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
};
