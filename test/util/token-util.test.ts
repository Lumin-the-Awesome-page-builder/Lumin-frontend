import { describe, beforeEach, it, expect, vi } from 'vitest';
import { TokenUtil } from '@/utils/token.util.ts';
import AuthorizedUserDto from '@/api/modules/auth/dto/authorized-user.dto.ts';
import TokenPairDto from '@/api/modules/auth/dto/token-pair.dto.ts';

describe('Token Util tests', () => {
  let removeItemMock;
  let setItemMock;
  let getItemMock;
  let tokenUtil;
  beforeEach(() => {
    removeItemMock = vi.fn();
    setItemMock = vi.fn();
    getItemMock = vi.fn();
    tokenUtil = new TokenUtil();
    //@ts-ignore
    tokenUtil.accessToken = 'accessToken';
    //@ts-ignore
    tokenUtil.refreshToken = 'refreshToken';
    //@ts-ignore
    tokenUtil.authorizedUserDto = new AuthorizedUserDto(1, 'name', 'login', 1);
    vi.stubGlobal('localStorage', {
      removeItem: removeItemMock,
      setItem: setItemMock,
      getItem: getItemMock,
    });
  });

  it('Test isAuthorized', () => {
    //@ts-ignore
    const result = tokenUtil.isAuthorized();

    expect(result).equal(tokenUtil.accessToken && tokenUtil.refreshToken);
  });

  it('Test getAccess', () => {
    const result = tokenUtil.getAccess();

    expect(result).equal(tokenUtil.accessToken);
  });

  it('Test getRefresh', () => {
    const result = tokenUtil.getRefresh();

    expect(result).equal(tokenUtil.refreshToken);
  });

  it('Test getAuthorized', () => {
    const result = tokenUtil.getAuthorized();

    expect(result).equal(tokenUtil.authorizedUserDto);
  });

  describe('Test getAuthorizedId', () => {
    it('Token has authorizedUserDto', () => {
      const result = tokenUtil.getAuthorizedId();

      expect(result).equal(tokenUtil.authorizedUserDto.id);
    });

    it('Token has not authorizedUserDto', () => {
      tokenUtil.authorizedUserDto = null;

      const result = tokenUtil.getAuthorizedId();

      expect(result).equal(null);
    });
  });

  describe('Test getAuthorizedName', () => {
    it('Token has authorizedUserDto', () => {
      const result = tokenUtil.getAuthorizedName();

      expect(result).equal(tokenUtil.authorizedUserDto.name);
    });

    it('Token has not authorizedUserDto', () => {
      tokenUtil.authorizedUserDto = null;

      const result = tokenUtil.getAuthorizedName();

      expect(result).equal(null);
    });
  });

  describe('Test loadTokens', () => {
    it('LocalStorage has accessTokenKey and refreshTokenKey', () => {
      const spy = vi.spyOn(JSON, 'parse');
      const getItemMock = vi.fn(
        () => '{"id":1,"name":"name","login":"login","lastLogin":1}',
      );
      vi.stubGlobal('localStorage', {
        getItem: getItemMock,
      });

      tokenUtil.loadTokens();

      expect(getItemMock).toBeCalledTimes(5);
      expect(spy).toBeCalledWith(
        '{"id":1,"name":"name","login":"login","lastLogin":1}',
      );
    });
    it('LocalStorage has not accessTokenKey and refreshTokenKey', () => {
      const spy = vi.spyOn(JSON, 'parse');
      const getItemMock = vi.fn(() => false);
      vi.stubGlobal('localStorage', {
        getItem: getItemMock,
      });

      tokenUtil.loadTokens();

      expect(getItemMock).toBeCalledTimes(3);
      expect(spy).toBeCalledWith(false);
    });
  });

  it('Test login', () => {
    const loadTokensMock = vi.fn();
    tokenUtil.loadTokens = loadTokensMock;
    const tokenPairDto = new TokenPairDto('accessToken', 'refreshToken');

    tokenUtil.login(tokenPairDto);

    expect(setItemMock).toBeCalledTimes(2);
    expect(setItemMock).toBeCalledWith(
      tokenUtil.accessTokenKey,
      tokenPairDto.accessToken,
    );
    expect(setItemMock).toBeCalledWith(
      tokenUtil.refreshTokenKey,
      tokenPairDto.refreshToken,
    );
    expect(loadTokensMock).toBeCalledTimes(1);
  });

  it('Test setAuthorized', () => {
    const authorizedUserDto = new AuthorizedUserDto(
      2,
      'new_name',
      'new_login',
      2,
    );
    const json = JSON.stringify(authorizedUserDto);

    tokenUtil.setAuthorized(authorizedUserDto);

    expect(setItemMock).toBeCalledWith(tokenUtil.authorizedUserKey, json);
    expect(tokenUtil.authorizedUserDto).toEqual({
      id: 2,
      name: 'new_name',
      login: 'new_login',
      lastLogin: 2,
    });
  });

  it('Test logout', () => {
    tokenUtil.accessTokenKey = 'access';
    tokenUtil.refreshTokenKey = 'refresh';
    tokenUtil.authorizedUserKey = 'authUserKey';
    tokenUtil.authByYandexKey = 'authByYandexKey';

    tokenUtil.logout();

    expect(tokenUtil.accessToken).toBe(null);
    expect(tokenUtil.refreshToken).toBe(null);
    expect(removeItemMock).toBeCalledTimes(4);
    expect(removeItemMock).toBeCalledWith(tokenUtil.accessTokenKey);
    expect(removeItemMock).toBeCalledWith(tokenUtil.refreshTokenKey);
    expect(removeItemMock).toBeCalledWith(tokenUtil.authorizedUserKey);
    expect(removeItemMock).toBeCalledWith(tokenUtil.authByYandexKey);
  });
});
