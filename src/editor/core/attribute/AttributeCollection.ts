import {Collection} from "@/editor/utils/Collection";
import Attribute from "@/editor/core/attribute/Attribute";

export default class AttributeCollection extends Collection<Attribute> {
  add(attribute: Attribute) {
    this.set(attribute.htmlName, attribute)
  }

  static empty(): AttributeCollection {
    return new AttributeCollection()
  }
}