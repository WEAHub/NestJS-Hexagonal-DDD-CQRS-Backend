export interface Paginated<T> {
    page: number
    size: number
    count: number
    data: T[]
}

export interface PaginatedValues<T> {
    count: number
    data: T[]
}
