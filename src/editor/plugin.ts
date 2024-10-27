import { App } from '@/editor/App';
import Container from '@/editor/components/Container';
import FlexDirectionProp from '@/editor/properties/FlexDirectionProp.ts';
import FlexProp from '@/editor/properties/FlexProp.ts';
import GutterProp from '@/editor/properties/GutterProp.ts';
import { App as AppVue } from 'vue';
import FlexWrapProp from '@/editor/properties/FlexWrapProp.ts';
import Pure from '@/editor/components/Pure.ts';

const editor = new App();

editor.use('container', Container);
editor.use('pure', Pure);

editor.useProp(FlexDirectionProp);
editor.useProp(FlexWrapProp);
editor.useProp(FlexProp);
editor.useProp(GutterProp);

const Editor = {
  install(app: AppVue) {
    app.config.globalProperties.$mount_editor = (
      root: string,
      identifiersSalt: string,
      json: string = '[]',
    ): App => {
      editor.init(root, identifiersSalt, JSON.parse(json));

      editor.mount();

      return editor;
    };
  },
};

export default Editor;
