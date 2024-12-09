import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule, // Import UserModule
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key', // Replace with a secure key // Fetch it from keystore
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest-auth'), // Minimal connection string 
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
