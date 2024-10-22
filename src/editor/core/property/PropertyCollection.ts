import Property from "@/editor/core/property/Property";
import {Collection} from "@/editor/utils/Collection";

export default class PropertyCollection extends Collection<Property> {
  constructor(properties: Record<string, Property> = {}) {
    super(properties);
  }

  static empty() {
    return new PropertyCollection()
  }
}