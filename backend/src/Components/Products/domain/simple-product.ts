import { InvalidInputException } from '@Shared/domain';

export const SIMPLE_PRODUCT_EXCEPTIONS = {
  InvalidId: {
    statusCode: 5000,
    statusMessage: 'Products:Domain:InvalidId'
  },
  InvalidName: {
    statusCode: 5001,
    statusMessage: 'Products:Domain:InvalidName'
  }
};
export class SimpleProduct {
  private constructor(
    public readonly id: string,
    public readonly name: string
  ) {}

  static fromPrimitives(values: { id: string; name: string }): SimpleProduct {
    const id = SimpleProduct.verifyId(values.id);
    const name = SimpleProduct.verifyId(values.name);
    return new SimpleProduct(id, name);
  }

  protected static verifyId(id: string): string {
    if (!id) throw InvalidInputException.fromStatusParams(SIMPLE_PRODUCT_EXCEPTIONS.InvalidId);
    return id;
  }

  protected static verifyName(name: string): string {
    if (!name) throw InvalidInputException.fromStatusParams(SIMPLE_PRODUCT_EXCEPTIONS.InvalidName);
    return name;
  }
}
