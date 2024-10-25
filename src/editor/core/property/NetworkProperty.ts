import Property from '@/editor/core/property/Property.ts';

export default abstract class NetworkProperty extends Property {
  public abstract fetch_url: string;
  public abstract append_url: string;
}
