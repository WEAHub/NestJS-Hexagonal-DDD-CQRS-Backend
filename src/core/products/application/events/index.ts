import { CreatedProductEventHandler } from './CreatedProductHandler'
import { DeletedProductEventHandler } from './DeletedProductHandler'
import { UpdatedProductEventHandler } from './UpdatedProductHandler'

export default [
    CreatedProductEventHandler,
    DeletedProductEventHandler,
    UpdatedProductEventHandler,
]
