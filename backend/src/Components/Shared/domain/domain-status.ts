export class DomainStatus {
  private constructor(
    public readonly statusCode: number,
    public readonly statusMessage: string
  ) {}
  static create(statusCode: number, statusMessage: string): DomainStatus {
    return new DomainStatus(statusCode, statusMessage);
  }
  static success() {
    return new DomainStatus(0, 'Ok');
  }
  toPrimitives() {
    return {
      statusCode: this.statusCode,
      statusMessage: this.statusMessage
    };
  }
}
