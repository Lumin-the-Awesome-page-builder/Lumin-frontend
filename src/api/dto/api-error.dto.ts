export default class ApiErrorDto {
  constructor(
    public httpStatusCode: number,
    public httpStatusText: string,
    public data: string | null,
  ) {}

  public showServerErrorToast(notificationStore, message: string | null) {
    if (
      notificationStore &&
      notificationStore.error &&
      typeof notificationStore.error === 'function'
    ) {
      if (message) {
        notificationStore.error({
          content: message,
          meta: 'Ошибка сервера. Попробуйте ещё раз.',
          duration: 2500,
          keepAliveOnHover: true,
        });
      } else {
        notificationStore.error({
          content: 'Что-то пошло не так.',
          meta: 'Ошибка сервера. Попробуйте ещё раз.',
          duration: 2500,
          keepAliveOnHover: true,
        });
      }
    }
  }
}
