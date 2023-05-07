import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { CatsModule } from 'src/cats/cats.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }), //strategy에 대한 기본적인 설정 역할
    //session -> session cookie 사용 여부

    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1y' },
    }), //로그인에 사용

    forwardRef(() => CatsModule), //CatsModule에 exports 된 모든 것을 사용 가능
    //"모듈 전달 참조" -> 모듈 간의 순환 종속성을 해결하기 위한 함수 사용
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
