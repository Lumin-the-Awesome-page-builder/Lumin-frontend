import { App } from '@/editor/App.ts';
import { ComponentObject } from '@/editor/core/component/Component.ts';

export default class Packager {
  constructor(public app: App) {}

  public createDemoPage(
    bodyContent: HTMLElement[],
    stylesOnMount: HTMLElement[],
  ): HTMLElement {
    const htmlPage = document.createElement('html');

    const body = document.createElement('body');
    bodyContent.forEach((item) => {
      body.appendChild(item);
    });

    const head = document.createElement('head');
    const stylesLink = document.createElement('link');
    stylesLink.rel = 'stylesheet';
    stylesLink.href =
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
    head.appendChild(stylesLink);

    stylesOnMount.forEach((el) => (head.innerHTML += el.outerHTML));

    htmlPage.appendChild(head);
    htmlPage.appendChild(body);

    body.innerHTML += `<script>
            document.addEventListener("DOMContentLoaded", () => {
                const listeners = {}
                const forms = document.querySelectorAll("form[data-form]");
                forms.forEach((el) => {
                    const formId = el.attributes['data-form'].value
                    const sendUrl = el.attributes['data-form-url'].value
                    listeners[formId] = {
                        fieldsData: {},
                        fieldsList: []
                    }
                    const fields = el.children;
                    for (let i = 0; i < fields.length; i++) {
                        const el = fields[i];
                        if (el.type == 'button') {
                            console.log(el);
                            el.addEventListener("click", () => {
                                const data = {}
                                listeners[formId].fieldsList.forEach(field => {
                                    data[field.name] = field.html.value;
                                })
                                fetch(sendUrl, {
                                    method: 'POST', 
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        data: JSON.stringify(data)
                                    })
                                })
                            })
                        } else {
                            listeners[formId].fieldsList.push({name: el.name, html: el})
                        }
                    }
                })
            })
        </script>`;

    return htmlPage;
  }

  public blob(state: Record<string, ComponentObject> | null = null): Blob {
    let bodyContent = [];

    if (state == null) {
      const tree = this.app.buildTree(this.app.initState);
      bodyContent = Object.keys(tree).map((key) => tree[key].render(true));
    } else {
      const tree = this.app.buildTree(state);
      bodyContent = Object.keys(tree).map((key) => tree[key].render(true));
    }

    return new Blob(
      [
        this.createDemoPage(bodyContent, Object.values(this.app.pureStyles))
          .outerHTML,
      ],
      { type: 'text/html' },
    );
  }

  public json() {
    const tree = Object.keys(this.app.root).map((el) => ({
      [el]: this.app.root[el].toJson(),
    }));

    let data = { setup: { rootOrdering: [] } };

    if (tree.length) {
      data = tree.reduce((prev, current) => Object.assign(prev, current));
      data.setup = { rootOrdering: [...this.app.rootOrdering] };
    }

    return JSON.stringify(data);
  }
}
