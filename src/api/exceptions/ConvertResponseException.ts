export default class ConvertResponseException extends DOMException {
  constructor() {
    super(`Convert response failed`);
  }
}
