import Property from "../core/property/Property";

export default class InputTypeProp extends Property {
    static name: string = 'input-type';
  
    defaultValue: any[] = ['text'];
    availableValues: Record<any, any>[] = [
      {
        'text': 'text',
        'email': 'email',
        'date': 'date'
      },
    ];
  
    getName(): string {
      return InputTypeProp.name;
    }

    apply() {
      this.component.specific = {
        ...this.component.specific,
        type: this.value[0]
      }
      this.component.htmlElement.type = this.value[0];
      console.log("APPLY INPUT TYPE!!!!", this.component);
    }

    clear() {
      this.component.specific = {
        ...this.component.specific,
        type: this.defaultValue[0]
      }
      this.component.htmlElement.type = this.defaultValue[0];
    }
}