import AuthInputDto from '@/api/modules/auth/dto/login/auth-input.dto';
import ApiResponseDto from '@/api/dto/api-response.dto';
import TokenPairDto from '@/api/modules/auth/dto/token-pair.dto';
import ApiRequestDto from '@/api/dto/api-request.dto';
import AuthorizedUserDto from '@/api/modules/auth/dto/authorized-user.dto';
import ApiModelUtil from '@/utils/api-model.util';
import TokenUtil from '@/utils/token.util';

export class AuthModel extends ApiModelUtil {
  constructor() {
    super('/auth');
  }

  public async auth(
    authInputDto: AuthInputDto,
  ): Promise<ApiResponseDto<TokenPairDto>> {
    const tokenPair = await this.unauthorizedRequest<TokenPairDto>(
      new ApiRequestDto('', 'POST', authInputDto),
    );
    if (tokenPair.success) {
      TokenUtil.login(tokenPair.getData());
      const authorizedUserDto = await this.requestAuthorizedData();
      TokenUtil.setAuthorized(authorizedUserDto.getData());
    }
    return tokenPair;
  }

  public async requestAuthorizedData(): Promise<
    ApiResponseDto<AuthorizedUserDto>
  > {
    return await this.authorizedRequest(
      new ApiRequestDto('/authorized', 'GET'),
    );
  }
}

export default new AuthModel();
