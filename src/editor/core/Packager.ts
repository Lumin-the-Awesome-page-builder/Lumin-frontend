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

    console.log(htmlPage);

    return new Blob([htmlString], { type: 'text/html' });
  }

  public json() {
    const topLevelChildren = Array.from(
      document.getElementById(this.app.mountPoint).children,
    );

    return JSON.stringify(
      topLevelChildren
        .map((el) => {
          const key = Array.from(el.attributes).filter((el) =>
            el.name.startsWith(`data-${this.app.identifiersSalt}-`),
          );
          if (key.length) return this.app.state[key[0].name];
          else return null;
        })
        .filter((el) => el)
        .map((el) => ({ [el.key]: el.toJson() }))
        .reduce((prev, current) => Object.assign(prev, current)),
    );
  }
}
