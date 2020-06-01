export interface Pagination {
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    totalItems: number;
}

export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}
