export type AttributeObject = {
  name: string;
  value: string;
};

export default class Attribute {
  constructor(
    public htmlName: string,
    public value: string = '',
  ) {}
}
