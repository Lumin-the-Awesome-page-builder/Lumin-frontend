export default class ApiErrorDto {
  constructor(
    public httpStatusCode: number,
    public httpStatusText: string,
    public data: string | null,
  ) {}

  public showServerErrorToast(toast, nextTick) {
    const errorMessage = String(this.data);
    const errorDetail = `Что-то пошло не так. Пожалуйста, свяжитесь с администратором.
    <p style="font-weight: 600; text-decoration: underline; cursor: pointer;">${errorMessage}</p>`;
    toast.add({
      severity: 'error',
      summary: 'Произошла ошибка',
      detail: errorDetail,
      life: 10000,
    });

    nextTick(() => {
      const toastElement = document.querySelector('.p-toast-detail');
      if (toastElement) {
        toastElement.innerHTML = errorDetail;

        const errorMessageElement = toastElement.querySelector('p');
        errorMessageElement.addEventListener('click', () => {
          navigator.clipboard.writeText(errorMessage);
          toast.add({
            severity: 'success',
            summary: 'Ошибка скопирована в буфер обмена',
            life: 2000,
          });
        });
      }
    });
  }
}
