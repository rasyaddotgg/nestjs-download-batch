import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { ExceljsService } from './exceljs.service';
import { OrgHasPosition } from './entities/organization-has-position.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'hcms',
      autoLoadEntities: true,
      synchronize: false,
      // logging: true,
    }),
    TypeOrmModule.forFeature([Employee, OrgHasPosition]),
  ],
  controllers: [AppController],
  providers: [AppService, ExceljsService],
})
export class AppModule {}
