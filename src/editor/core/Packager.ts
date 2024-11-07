import { App } from '@/editor/App.ts';
import { ComponentObject } from '@/editor/core/component/Component.ts';

export default class Packager {
  constructor(public app: App) {}

  public blob(state: ComponentObject[] | null = null): Blob {
    const htmlPage = document.createElement('html');

    const body = document.createElement('body');
    if (state == null) {
      const tree = this.app.buildTree(this.app.initState);
      Object.keys(tree).forEach((key) =>
        body.appendChild(tree[key].render(true)),
      );
    } else {
      const tree = this.app.buildTree(state);
      Object.keys(tree).forEach((key) =>
        body.appendChild(tree[key].render(true)),
      );
    }

    const head = document.createElement('head');
    const stylesLink = document.createElement('link');
    stylesLink.rel = 'stylesheet';
    stylesLink.href =
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
    head.appendChild(stylesLink);

    Object.values(this.app.pureStyles).forEach(
      (el) => (head.innerHTML += el.outerHTML),
    );

    htmlPage.appendChild(head);
    htmlPage.appendChild(body);

    const htmlString = htmlPage.outerHTML;

    return new Blob([htmlString], { type: 'text/html' });
  }

  public json() {
    const tree = Object.keys(this.app.root).map((el) => ({
      [el]: this.app.root[el].toJson(),
    }));

    return tree.length
      ? JSON.stringify(
          tree.reduce((prev, current) => Object.assign(prev, current)),
        )
      : '{}';
  }
}
