import { z } from 'zod';

export const paginationQueryFields = {
  pageNumber: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
};

export type PaginationQuery = {
  pageNumber?: number;
  limit?: number;
};

export const getPagination = (query: PaginationQuery = {}) => {
  const pageNumber = query.pageNumber ?? 1;
  const limit = query.limit ?? 20;

  return {
    pageNumber,
    limit,
    skip: (pageNumber - 1) * limit,
  };
};

export const buildPaginationMeta = (
  total: number,
  pageNumber: number,
  limit: number,
) => ({
  pageNumber,
  limit,
  total,
  totalPages: Math.max(1, Math.ceil(total / limit)),
});
