class ErrorDTO {
  private status: string | number;
  private message: string;

  constructor(_status: string | number, _message: string) {
    this.status = _status;
    this.message = _message;
  }
}

export default ErrorDTO;
