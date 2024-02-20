import { LoginDto } from "src/core/shared/dto/Login.dto";
import { AuthRepository } from "../ports/outbound/AuthRepository";
import { User } from "../interfaces/User";
import { EntityNotFoundException } from "@core/shared/exception/EntityNotFoundException";
import { AUTH_REPOSITORY } from "@infrastructure/adapters/adapters.module";

export class AuthService {

  constructor(private readonly auth: AuthRepository) {}
  
  async checkUser(user: LoginDto): Promise<User> {
    const _user: User = await this.auth.findByEmail(user.email); 

    if(!_user) {
      throw new EntityNotFoundException(`User(email="${user.email}") Not found`)
    }

    return _user;
  }
  

}

export const AuthServiceProvider = {
  provide: AuthService,
  useFactory: (authRepository: AuthRepository) => new AuthService(authRepository),
  inject: [ AUTH_REPOSITORY ]
}