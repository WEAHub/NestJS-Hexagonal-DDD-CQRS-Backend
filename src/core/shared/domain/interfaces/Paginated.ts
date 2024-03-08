export interface Paginated<T> {
    page: number
    limit: number
    count: number
    data: T[]
}

export interface PaginatedValues<T> {
    count: number
    data: T[]
}
