import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { CatsRepository } from 'src/cats/cats.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //Header: base64 인코딩 토큰의 타입과 알고리즘
  //Payload: base64 인코딩 데이터 (Key-Value)
  //Signature: Header/Payload를 조합하고 비밀 키로 서명한 후, base64로 인코딩
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      //JWT 설정
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Header의 Token으로부터 추출
      secretOrKey: 'secretKey', //환경변수로 저장
      ignoreExpiration: false, //만료기간 (Back -> Front로 넘어가게 될 때, 보안 위험을 이유로 만료 기간을 설정)
    });
  }

  async validate(payload: Payload) {
    //인증
    //password를 가지고 오지 않고 조회하는 것이 좋음 -> 보안상의 이유
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub,
    );

    if (cat) {
      return cat; // request.user
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
