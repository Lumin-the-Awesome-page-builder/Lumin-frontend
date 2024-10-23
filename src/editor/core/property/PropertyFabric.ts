import Property, { PropertyObject } from '@/editor/core/property/Property';

export default abstract class PropertyFabric {
  abstract build(propertyObject: PropertyObject): Property;
}
