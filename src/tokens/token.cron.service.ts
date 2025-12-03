import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TokenService } from './token.service';
import { VintedService } from 'src/products/vinted.service';

@Injectable()
export class TokenCronService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly vintedService: VintedService
  ) {}

  // Run every minute
  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleCron() {
    const tokens = await this.vintedService.refreshTokens();
    console.log('saving access token: ', tokens.data.access_token);
    await this.tokenService.saveTokens(1, tokens.data.access_token, tokens.data.refresh_token);
  }
}
