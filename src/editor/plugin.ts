import { App } from '@/editor/App';
import Container from '@/editor/components/Container';
import FlexDirectionProp from '@/editor/properties/FlexDirectionProp.ts';
import FlexProp from '@/editor/properties/FlexProp.ts';
import FlexWrapProp from '@/editor/properties/FlexWrapProp.ts';
import GutterProp from '@/editor/properties/GutterProp.ts';
import { App as AppVue } from 'vue';

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
      json: string = "[]",
    ): App => {
      editor.init(root, identifiersSalt, JSON.parse(json));

      editor.run();

      return editor;
    }
  }
}

export default Editor