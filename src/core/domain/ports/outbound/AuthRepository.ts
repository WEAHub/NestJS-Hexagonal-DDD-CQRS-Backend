import { User } from "../../interfaces/User";

export interface AuthRepository {
  findByEmail(email: string): Promise<User>
}