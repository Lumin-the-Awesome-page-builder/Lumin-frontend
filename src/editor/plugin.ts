import { App } from '@/editor/App';
import Container from '@/editor/components/Container';
import FlexDirectionProp from '@/editor/properties/FlexDirectionProp.ts';
import FlexProp from '@/editor/properties/FlexProp.ts';
import GutterProp from '@/editor/properties/GutterProp.ts';
import { App as AppVue } from 'vue';
import FlexWrapProp from '@/editor/properties/FlexWrapProp.ts';

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

const editor = new App();

editor.use('container', Container);

editor.useProp(FlexDirectionProp);
editor.useProp(FlexWrapProp);
editor.useProp(FlexProp);
editor.useProp(GutterProp);


const Editor = {
  install(app: AppVue) {
    app.config.globalProperties.$mount_editor = (
      root: string,
      identifiersSalt: string,
      json: string = jsonData,
    ): App => {
      editor.init(root, identifiersSalt, JSON.parse(json));

      editor.run();

      return editor;
    }
  }
}

export default Editor