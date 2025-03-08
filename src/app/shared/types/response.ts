type Response<T> = {
  items: T;
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  errors?: {
    id: string;
    reason: string;
  };
};

export type { Response };
