import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { RefreshTokenResponse, VintedService } from './vinted.service';
import { TokenService } from 'src/tokens/token.service';

export class AddTokensDto {
  accessToken: string;
  refreshToken: string;
}

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productService: ProductsService,
    private readonly vintedService: VintedService,
    private readonly tokenService: TokenService
  ) {}

  @Get()
  async getProducts(): Promise<string> {
    return JSON.stringify(await this.productService.getSortedItems());
  }

  @Get('/getAndSaveProducts')
  async getAndSaveProducts(): Promise<string> {
    await this.productService.getItemsFromVintedAndSave();
    return 'Ok';
  }

  @Get('/refresh')
  async refreshTokens(): Promise<RefreshTokenResponse> {
    return this.vintedService.refreshTokens();
  }

  @Post('/addTokens')
  async addTokens(@Body() body: AddTokensDto): Promise<string> {
    const { accessToken, refreshToken } = body;

    await this.tokenService.saveTokens(1, accessToken, refreshToken);

    return 'ok';
  }
}
