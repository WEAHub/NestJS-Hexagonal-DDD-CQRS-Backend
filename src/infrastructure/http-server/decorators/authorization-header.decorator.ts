import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const AuthorizationHeader = createParamDecorator((data: never, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  const { headers } = request;
  const authHeader = headers['authorization']
  const [ type, token ] = authHeader.split(' ')
  return token;
});