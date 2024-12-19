import Property from "../core/property/Property";

export default class InputTypeProp extends Property {
    static name: string = 'input-type';
  
    defaultValue: any[] = ['text', 'button'];
    availableValues: Record<any, any>[] = [
      {
        'text': 'text',
        'email': 'email',
        'date': 'date',
        'button': 'button'
      },
      {
        'button': 'button'
      }
    ];
  
    getName(): string {
      return InputTypeProp.name;
    }

    apply() {
      this.component.specific = {
        ...this.component.specific,
        type: this.value[0],
        text: this.value[1]
      }
      this.component.htmlElement.type = this.value[0];
      if (this.value[0] == 'button') {
        const value = this.value[1] ? this.value[1] : this.defaultValue[1];
        this.component.htmlElement.value = value;
      }
    }

    clear() {
      this.component.specific = {
        ...this.component.specific,
        type: this.defaultValue[0],
        text: this.value[1]
      }
      this.component.htmlElement.type = this.defaultValue[0];
      this.component.htmlElement.value = "";
    }
}