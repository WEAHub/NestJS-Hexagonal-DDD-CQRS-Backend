import { Module } from '@nestjs/common';
import { SharedModule } from './infrastructure/shared/shared.module';
import { CoreModule } from './core/core.module';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpServerModule } from './infrastructure/http-server/http-server.module';

@Module({
  imports: [
    SharedModule,
    CoreModule,
    HttpServerModule,
    CqrsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
