import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Product } from 'src/models/product';
import { TokenService } from 'src/tokens/token.service';
import { HttpsProxyAgent } from 'https-proxy-agent';

@Injectable()
export class VintedService {
  constructor(
    private readonly httpService: HttpService,
    private readonly tokenService: TokenService
  ) {}
  // accessToken =
  //   'eyJraWQiOiJFNTdZZHJ1SHBsQWp1MmNObzFEb3JIM2oyN0J1NS1zX09QNVB3UGlobjVNIiwiYWxnIjoiUFMyNTYifQ.eyJhcHBfaWQiOjQsImF1ZCI6ImZyLmNvcmUuYXBpIiwiY2xpZW50X2lkIjoid2ViIiwiZXhwIjoxNzYyNzk2OTAwLCJpYXQiOjE3NjI3ODk3MDAsImlzcyI6InZpbnRlZC1pYW0tc2VydmljZSIsInB1cnBvc2UiOiJhY2Nlc3MiLCJzY29wZSI6InB1YmxpYyIsInNpZCI6ImFmMzMwZTc1LTE3NjI3ODk3MDAifQ.Y2Yw8jkpWWY91c4q6KhBMBjk5oG1-RNVsK6n7YWq8zoIxaRbCcJATubVV1i31ahFTqgsDp0OM_6qpwXtPxgMlGGYwsnedW75K_fHquPmgrI6Le6iqzn7Wff5bJjML_yzlrw_oZ-SQUfHeqQXEiTIqxACUVTHMDz3Y3-j1QmThQ3Lv3-NBNlwkuHLG7lEnfS0iv4THqIUzcVkNMg2p1tBBOvX01uGivAfHho_5G01KbhCT1SRiuYKehM2v0SkZ-uQnBxn4tWlcj12QpGG8xQryoONpL4qU4EInt-hBgIjR48lCg9c4gn3x1W-pLsqOWMj2neuc2FuSf2LgREoZkaK3Q';
  // refreshToken =
  //   'eyJraWQiOiJFNTdZZHJ1SHBsQWp1MmNObzFEb3JIM2oyN0J1NS1zX09QNVB3UGlobjVNIiwiYWxnIjoiUFMyNTYifQ.eyJhcHBfaWQiOjQsImF1ZCI6ImZyLmNvcmUuYXBpIiwiY2xpZW50X2lkIjoid2ViIiwiZXhwIjoxNzYzMzk0NTAwLCJpYXQiOjE3NjI3ODk3MDAsImlzcyI6InZpbnRlZC1pYW0tc2VydmljZSIsInB1cnBvc2UiOiJyZWZyZXNoIiwic2NvcGUiOiJwdWJsaWMiLCJzaWQiOiJhZjMzMGU3NS0xNzYyNzg5NzAwIn0.ggKPj7dTVVmnU_m0GLEOt48euxx2UgJ7uPZGCILHA7PkCG4IpMun5erUNnaZy0CHCg1HKRgOKDU38ci28VRQ9bjDgTkOXg0o4Hp9z1SLRH2t408pn8MEDMtK5Xo2MxfD166WX6_Q1jpwAe79imqYUq1pWOxguxfXnV2QZ2r8tSNlXhLX_uy54wOf0iJpFrPBnGoCpLLfwOobEO1FkFGOqRCi7H__tyjhbylmPmoc_LLhV26d7Mg_wJrhxVcUQzwNZDJnXDCbEGcgq6MiVMgVLjuGc7gr6gtEv3_OQxI1hkHHOM_xvncEGPOhRA-YHt2rA9ex9uh4eBufUAg7FzBiJA';
  cookies = (accessToken: string, refreshToken: string) =>
    // '_gcl_au=1.1.1770437083.1760876445; ' +
    // '_ga=GA1.1.1824766488.1760876446; ' +
    // '__ps_r=_; ' +
    // '__ps_lu=https://www.vinted.lt/; ' +
    // '__ps_did=pscrb_0476c92b-8e41-4366-c38a-f3da50c8d1b3; ' +
    // '__ps_fva=1760876445690; ' +
    // '_fbp=fb.1.1760876445837.449774060601285638; ' +
    // 'is_shipping_fees_applied_info_banner_dismissed=true; ' +
    // 'domain_selected=true; ' +
    // 'v_sid=9673a8a1-1760876441; ' +
    // '__cf_bm=0mjE.V5IzLb._42k3ljQCumPWse1YonQkqt3vk62cb4-1761392420-1.0.1.1-k1blANRHqoTMp.yJvi4afnfJ01NVGB2A3QL6tCmVMjH15DCcB4WUCcV0KdRpTwYAitdxMn8PlubXrMckjTJfDvirOcARlNcgbOGp5.A_RZsm.LcZ6Tb1wS_zfW2HBDIn; ' +
    // 'cf_clearance=zRlQm8R1CPUOdXxDRCIewOGAn_dj4JZdg4XM8dpV2i0-1761392421-1.2.1.1-DXNsaQi9w7S1PgEHMINM4A76U3pfzY45OquIo0H2vz1BZJSNd2ZlXrf8aMW4_x7wEyznZJA3KLhpexJsOvB3chnyCC76kvqZ0xQTbKWJtgHWsprRMf03rfIX7RjSNCmV3cnvZRV8v0L.B0IkEfhpfmr5BaFKsCxEs704Oo9x3gGQbCVDMHm0_Pm68U7cszw5gKKuoP6jWizUb6562rLk2VOdJnY5Bl5VfMc0NefUunw; ' +
    'access_token_web=' + accessToken + '; ' + 'refresh_token_web=' + refreshToken + '; ';
  // 'homepage_session_id=4e9ba52f-7bc1-48db-bbe3-e3306c6297b1; ' +
  // 'viewport_size=1536; ' +
  // '__ps_sr=_; ' +
  // '__ps_slu=https://www.vinted.lt/session-refresh?ref_url=%2F; ' +
  // 'banners_ui_state=SUCCESS; ' +
  // 'OptanonConsent=isGpcEnabled=0&datestamp=Sat+Oct+25+2025+14%3A40%3A32+GMT%2B0300+(Eastern+European+Summer+Time)&version=202508.2.0&browserGpcFlag=0&isIABGlobal=false&consentId=e1c5f357-43aa-4d0b-8682-b760a3f17188&identifierType=Cookie+Unique+Id&isAnonUser=1&hosts=&interactionCount=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1%2CC0005%3A1%2CV2STACK42%3A1%2CC0035%3A1%2CC0038%3A1&genVendors=V2%3A1%2CV1%3A1%2C&intType=1&geolocation=LT%3BVL&AwaitingReconsent=false; ' +
  // '_vinted_fr_session=ODdIcjFzMzNuZGtWem52aFRWYjVDN2IxcUs5RitoblFsMzE1V2JpbUl0dFhMTHgxYkJ2THlKL2MzdEs3OXJwRjZsL0xhb3dXeDJ0cWlubnVZR096V3k1bVYwUGJWaGFZNE1BUVRveUd4aW9DZWdVNlhEbi82TWlqY1g0NkZxclIwdWE4OGFPRkxtSVlXZVRyNFN0bWFEaFQ4WW1ZK0cwTDJGQ1Znalg0RVN6bUxIU08vUWY4TWxhaHVFZjVpRGlXTmVzNFpYNEJYK215VE9lcTNMZUZkdXpXbHFqVTdldm1nRUFKTWdCb0dQdz0tLU5valVqcXo2eEg1WERRQUpnL3dFaGc9PQ%3D%3D--a61c934291a57e85a085f381027b761f5372ad3e; ' +
  // '_ga_TJGLC0BDY0=GS2.1.s1761392424$o4$g1$t1761392470$j14$l0$h0; ' +
  // '_ga_ZJHK1N3D75=GS2.1.s1761392424$o4$g1$t1761392470$j14$l0$h0';

  headers = (cookies: string) => ({
    accept: 'application/json, text/plain, */*,image/webp',
    'accept-language': 'lt-LT,lt;q=0.9,en;q=0.8',
    // priority: 'u=3',
    // referer:
    //   'https://www.vinted.lt/catalog?catalog[]=1231&size_ids[]=787&size_ids[]=788&size_ids[]=789&page=4&time=1761392458',
    // 'sec-ch-ua': '"Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"',
    // 'sec-ch-ua-mobile': '?0',
    // 'sec-ch-ua-platform': '"Windows"',
    // 'sec-fetch-dest': 'empty',
    // 'sec-fetch-mode': 'cors',
    // 'sec-fetch-site': 'same-origin',
    // 'user-agent':
    //   'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
    // 'x-anon-id': 'e1c5f357-43aa-4d0b-8682-b760a3f17188',
    // 'x-csrf-token': '75f6c9fa-dc8e-4e52-a000-e09dd4084b3e',
    // 'x-money-object': 'true',

    cookie: cookies,
  });

  async getItems(): Promise<Product[]> {
    // const url =
    //   'https://www.vinted.lt/api/v2/catalog/items?page=1&per_page=960&search_text=&catalog_ids=1231&order=relevance&size_ids=787,788,789&brand_ids=&status_ids=&color_ids=&material_ids=';

    const url =
      'https://www.vinted.lt/api/v2/catalog/items?page=1&per_page=50&time=1764789874&search_text=&catalog_ids=1231&order=relevance&size_ids=787,788,789=&brand_ids=53,2703,14,139,1775,535,11445,5977,2369,44,162,1195,309,2239,110434,51021,3203,283953&status_ids=&color_ids=&material_ids=';

    // 'https://www.vinted.lt/catalog?catalog[]=1231&brand_ids[]=53&brand_ids[]=14&brand_ids[]=1775&brand_ids[]=5977&brand_ids[]=1195&brand_ids[]=139&brand_ids[]=15457&brand_ids[]=11445&brand_ids[]=2239&brand_ids[]=2369&page=1&per_page=960&time=1764704008&size_ids[]=788&size_ids[]=789&size_ids[]=790';

    const tokens = await this.tokenService.getTokens();
    if (!tokens) throw new Error('No tokens found');
    const { accessToken, refreshToken } = tokens;
    console.log('Will call Vinted API');
    console.log('accessToken:', accessToken);
    console.log('refreshToken:', refreshToken);

    const response: VintedResponse = await firstValueFrom(
      this.httpService.get(url, {
        headers: this.headers(this.cookies(accessToken, refreshToken)),
        httpsAgent: agent,
      })
    );

    const products: Product[] = response.data.items.map((item) => ({
      id: item.id,
      price: {
        amount: item.price.amount,
      },
      url: item.url,
      photo: {
        url: item.photo?.url ?? '',
      },
      favourite_count: item.favourite_count,
      brand_title: item.brand_title,
      item_box: { second_line: item?.item_box?.second_line ?? '' },
    }));

    return products;
  }

  async refreshTokens() {
    const url = 'https://www.vinted.lt/web/api/auth/refresh';

    const tokens = await this.tokenService.getTokens();
    if (!tokens) throw new Error('No tokens found');
    const { accessToken, refreshToken } = tokens;

    const response: RefreshTokenResponse = await firstValueFrom(
      this.httpService.post(url, null, {
        headers: this.headers(this.cookies(accessToken, refreshToken)),
        httpsAgent: agent,
      })
    );

    const responseToken: RefreshTokenResponse = {
      data: {
        refresh_token: response.data.refresh_token,
        access_token: response.data.access_token,
      },
    };

    return responseToken;
  }
}

const agent = new HttpsProxyAgent(
  `http://customer-mindeltd_KKgyl-cc-US:Secondkicks+123@pr.oxylabs.io:7777`
);

interface VintedResponse {
  data: {
    items: Product[];
  };
}

export interface RefreshTokenResponse {
  data: {
    refresh_token: string;
    access_token: string;
  };
}
