import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/app-config.module';
import { AppConfigService } from './config/app/app-config.service';
import { AuthModule } from './modules/auth/auth.module';
import { TodosModule } from './modules/todos/todos.module';
import { UsersModule } from './modules/users/users.module';
import { MysqlProviderModule } from './providers/database/mysql-provider.module';

@Module({
  imports: [
    AppConfigModule,
    MysqlProviderModule,
    AuthModule,
    UsersModule,
    TodosModule,
  ],
  providers: [AppConfigService],
})
export class AppModule {}
