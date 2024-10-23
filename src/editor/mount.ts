import { App } from '@/editor/App';
import Container from '@/editor/components/Container';
import FlexDirectionProp from '@/editor/properties/FlexDirectionProp.ts';
import FlexProp from '@/editor/properties/FlexProp.ts';
import FlexWrap from '@/editor/properties/FlexWrap.ts';
import GutterProp from '@/editor/properties/GutterProp.ts';

const jsonData = JSON.stringify([
  {
    key: 'data-123-div-1729624518542',
    name: 'container',
    attrs: [],
    props: [
      { name: 'flex', value: 'flex' },
      { name: 'flex-wrap', value: 'flex-wrap' },
      { name: 'gap', value: 'g2' },
    ],
    content: null,
    children: [
      {
        key: 'data-123-div-1729624518123',
        name: 'container',
        attrs: [],
        props: [{ name: 'flex', value: 'flex' }],
        content: 'Test content',
      },
      {
        key: 'data-123-div-1729624518545',
        name: 'container',
        attrs: [],
        props: [{ name: 'flex', value: 'flex' }],
        content: 'Test content',
      },
      {
        key: 'data-123-div-1729624518547',
        name: 'container',
        attrs: [],
        props: [{ name: 'flex', value: 'flex' }],
        content: '',
      },
    ],
  },
]);

const app = new App();

app.use('container', Container);

app.useProp(FlexDirectionProp);
app.useProp(FlexWrap);
app.useProp(FlexProp);
app.useProp(GutterProp);

export default function mount(
  root: string,
  identifiersSalt: string,
  json: string = jsonData,
): App {
  app.init(root, identifiersSalt, JSON.parse(json));

  app.run();

  return app;
}
