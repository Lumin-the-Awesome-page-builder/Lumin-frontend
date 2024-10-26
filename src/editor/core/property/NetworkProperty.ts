import Property from '@/editor/core/property/Property.ts';
import axios from 'axios';
import Component from '@/editor/core/component/Component.ts';

export default abstract class NetworkProperty<T> extends Property {
  public abstract fetch_url: string;
  public abstract append_url: string;
  public values: Record<string, T>;
  protected onInit: boolean;

  constructor(public value: string) {
    super(value);
    this.onInit = true;
    setTimeout(() => {
      console.error('Prop fetching timeout reached.');
      this.values = {};
      this.onInit = false;
    }, 10000);
    this.fetch().finally(() => (this.onInit = false));
  }

  override apply(target: Component) {
    while (this.onInit) {}
    if (this.values) return super.apply(target);
    else throw new DOMException('You need to call fetch() before');
  }

  async fetch() {
    this.values = await axios({
      url: this.fetch_url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer {token}',
      },
    })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.error(`Failed to fetch prop values: ${err}`);
        return {};
      });
  }

  async append(data: T) {
    await axios({
      url: this.append_url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer {token}',
      },
      data,
    }).catch((err) => {
      console.error(`Failed to append prop value: ${err}`);
    });
    await this.fetch();
  }
}
