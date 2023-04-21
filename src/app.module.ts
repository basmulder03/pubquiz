import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { RolesController } from './roles/roles.controller';
import { RolesService } from './roles/roles.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../ui', 'dist/ui'),
      exclude: ['/api/(.*)'],
    }),
  ],
  controllers: [AppController, RolesController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    RolesService,
  ],
})
export class AppModule {}
