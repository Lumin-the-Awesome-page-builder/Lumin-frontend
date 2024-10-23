import { Collection } from '@/editor/utils/Collection';
import Attribute from '@/editor/core/attribute/Attribute';

export default class AttributeCollection extends Collection<Attribute> {
  add(attribute: Attribute) {
    this.set(attribute.htmlName, attribute);
  }

  append(attribute: Attribute) {
    let cur = this.get(attribute.htmlName);
    if (!cur) cur = { htmlName: '', value: '' };
    attribute.value = cur.value + ' ' + attribute.value;
    this.add(attribute);
  }

  static empty(): AttributeCollection {
    return new AttributeCollection();
  }
}
