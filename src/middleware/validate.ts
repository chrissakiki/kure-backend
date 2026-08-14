import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

const LOCATION_KEYS = new Set(['body', 'query', 'params']);

const fieldKey = (path: PropertyKey[]) => {
  const parts = path.map(String);
  const fields =
    parts[0] && LOCATION_KEYS.has(parts[0]) ? parts.slice(1) : parts;
  return fields.join('.');
};

export const validate = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string[]> = {};

      for (const issue of result.error.issues) {
        const key = fieldKey(issue.path) || '_errors';
        if (!fieldErrors[key]) fieldErrors[key] = [];
        fieldErrors[key].push(issue.message);
      }

      const first = result.error.issues[0];
      const key = first ? fieldKey(first.path) : '';
      const message = key
        ? `${key}: ${first.message}`
        : (first?.message ?? 'Validation failed');

      return res.status(400).json({
        error: {
          message,
          code: 'VALIDATION_ERROR',
          details: { fieldErrors },
        },
      });
    }

    const data = result.data as {
      body?: unknown;
      query?: Record<string, unknown>;
      params?: Record<string, string>;
    };

    if (data.body !== undefined) req.body = data.body;
    if (data.query !== undefined) Object.assign(req.query, data.query);
    if (data.params !== undefined) Object.assign(req.params, data.params);

    next();
  };
};
