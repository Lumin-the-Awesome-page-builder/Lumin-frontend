export enum PropertyType {}

export type PropertyObject = {
  name: string,
  value: any
}

export default abstract class Property {
  public abstract name: string
  public abstract title: string
  public abstract description: string
  public abstract value: any
  public abstract type: PropertyType
  public abstract defaultValue: string
}