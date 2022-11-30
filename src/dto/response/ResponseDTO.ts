class ResponseBasicDTO {
  private status: boolean;
  private message: string;
  private data: any;

  constructor(status: boolean, message: string, data: any) {
    this.status = status || true;
    this.message = message;
    this.data = data;
  }
}

export default ResponseBasicDTO;
