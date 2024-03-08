import { GetProductDto } from '@core/products/shared/dto/GetProduct.dto'
import { ProductSorts } from '@core/products/shared/enums/ProductSorts'

export interface PaginatedQueryParameters {
    page?: number
    limit?: number
    sort?: ProductSorts
    sortColumn?: string
    whereConditions?: object
}

const sortColumnKeys = ['visits', 'id', 'stars', 'updateDate']

export class PaginatedQueryBuilder {
    private parameters: PaginatedQueryParameters = {}

    private defaultParameters: PaginatedQueryParameters = {
        whereConditions: {},
        limit: 10,
        page: 1,
        sortColumn: 'id',
        sort: ProductSorts.DESC,
    }

    constructor(private query: GetProductDto) {
        Object.assign(this.parameters, this.defaultParameters)
    }

    create(): PaginatedQueryParameters {
        if (this.query.category) {
            this.addWhereCondition({ categoryId: this.query.category })
        }

        this.parameters.sortColumn = this.checkSortColumn(this.query.sortColumn)

        this.parameters.limit = this.query.limit ?? this.defaultParameters.limit
        this.parameters.sort = this.query.sort ?? this.defaultParameters.sort
        this.parameters.page = this.query.page ?? this.defaultParameters.page

        return this.parameters
    }

    private addWhereCondition(condition: object) {
        Object.assign(this.parameters.whereConditions, condition)
    }

    private checkSortColumn(sortColumn: string): string {
        return sortColumnKeys.find((k) => sortColumn === k) ?? 'id'
    }
}
