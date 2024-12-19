import Property from "../core/property/Property";

export default class InputNameProp extends Property {
    static name: string = 'input-name';
  
    defaultValue: any[] = ['input-name'];
    availableValues: Record<any, any>[] = [
      {
        'input-name': 'input-name'
      },
    ];
  
    getName(): string {
      return InputNameProp.name;
    }

    apply() {
      this.component.specific = {
        ...this.component.specific,
        name: this.value[0]
      }
      this.component.htmlElement.name = this.value[0];
    }

    clear() {
      this.component.specific = {
        ...this.component.specific,
        name: this.defaultValue[0]
      }
      this.component.htmlElement.name = this.defaultValue[0];
    }
}