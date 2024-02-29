import { GetAllCategoryHandler } from './handlers/GetAllCategoryHandler'
import { GetCategoryByIdHandler } from './handlers/GetCategoryByIdHandler'
import { GetCategoryByNameQueryHandler } from './handlers/GetCategoryByNameHandler'

export default [
    GetAllCategoryHandler,
    GetCategoryByNameQueryHandler,
    GetCategoryByIdHandler,
]
