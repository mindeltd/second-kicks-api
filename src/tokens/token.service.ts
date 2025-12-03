import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenEntity } from 'src/entities/TokenEntity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly repo: Repository<TokenEntity>
  ) {}

  async saveTokens(id: number, accessToken: string, refreshToken: string): Promise<TokenEntity> {
    let token = await this.repo.findOneBy({ id });

    if (token) {
      token.accessToken = accessToken;
      token.refreshToken = refreshToken;
    } else {
      token = this.repo.create({ id, accessToken, refreshToken });
    }

    return this.repo.save(token);
  }

  async getTokens(): Promise<TokenEntity | null> {
    return this.repo.findOne({ where: { id: 1 } });
  }
}
