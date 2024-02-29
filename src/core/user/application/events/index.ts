import { CreatedUserEventHandler } from './CreatedUserEventHandler'
import { DeletedUserEventHandler } from './DeletedUserEventHandler'
import { UpdatedUserEventHandler } from './UpdatedUserEventHandler'

export default [
    UpdatedUserEventHandler,
    CreatedUserEventHandler,
    DeletedUserEventHandler,
]
