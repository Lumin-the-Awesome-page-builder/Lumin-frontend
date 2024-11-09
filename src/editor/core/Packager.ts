import { App } from '@/editor/App.ts';
import { ComponentObject } from '@/editor/core/component/Component.ts';

export default class Packager {
  constructor(public app: App) {}

  public createDemoPage(bodyContent: HTMLElement[], stylesOnMount: HTMLElement[]): HTMLElement {
    const htmlPage = document.createElement('html');

    const body = document.createElement('body');
    bodyContent.forEach((item) => {
      body.appendChild(item)
    })

    const head = document.createElement('head');
    const stylesLink = document.createElement('link');
    stylesLink.rel = 'stylesheet';
    stylesLink.href =
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
    head.appendChild(stylesLink);

    stylesOnMount.forEach(
      (el) => (head.innerHTML += el.outerHTML),
    );

    htmlPage.appendChild(head);
    htmlPage.appendChild(body);

    return htmlPage;
  }

  public blob(state: ComponentObject[] | null = null): Blob {
    let bodyContent = []

    if (state == null) {
      const tree = this.app.buildTree(this.app.initState);
      bodyContent = Object.keys(tree).map((key) => tree[key].render(true));
    } else {
      const tree = this.app.buildTree(state);
      bodyContent = Object.keys(tree).map((key) => tree[key].render(true));
    }

    return new Blob([this.createDemoPage(bodyContent, Object.values(this.app.pureStyles)).outerHTML], { type: 'text/html' });
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
