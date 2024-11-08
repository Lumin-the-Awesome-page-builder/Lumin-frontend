import { App } from '@/editor/App';
import Container from '@/editor/components/Container';
import FlexDirectionProp from '@/editor/properties/FlexDirectionProp.ts';
import FlexProp from '@/editor/properties/FlexProp.ts';
import GutterProp from '@/editor/properties/GutterProp.ts';
import { App as AppVue } from 'vue';
import FlexWrapProp from '@/editor/properties/FlexWrapProp.ts';
import Pure from '@/editor/components/Pure.ts';
import Text from '@/editor/components/Text.ts';
import Header from '@/editor/components/Header.ts';
import Image from '@/editor/components/Image.ts';
import Link from '@/editor/components/Link.ts';
import AlignItemsProp from '@/editor/properties/AlignItemsProp.ts';
import AlignContentProp from '@/editor/properties/AlignContentProp.ts';
import ColWidthProp from '@/editor/properties/ColWidthProp.ts';
import JustifyContentProp from '@/editor/properties/JustifyContentProp.ts';
import FontProp from '@/editor/properties/text/FontProp.ts';
import InlineTextProp from '@/editor/properties/text/InlineTextProp.ts';
import LeadParagraphProp from '@/editor/properties/text/LeadParagraphProp.ts';
import LineHeightProp from '@/editor/properties/text/LineHeightProp.ts';
import MonoSpaceProp from '@/editor/properties/text/MonoSpaceProp.ts';
import TextAlignProp from '@/editor/properties/text/TextAlignProp.ts';
import TextTransformProp from '@/editor/properties/text/TextTransformProp.ts';
import LinkOpacityProp from '@/editor/properties/link/LinkOpacityProp.ts';
import LinkColorProp from '@/editor/properties/link/LinkColorProp.ts';
import LinkUnderlineOffsetProp from '@/editor/properties/link/LinkUnderlineOffsetProp.ts';
import LinkUnderlineOpacityProp from '@/editor/properties/link/LinkUnderlineOpacityProp.ts';
import ImgFluidProp from '@/editor/properties/ImgFluidProp.ts';
import BorderRadiusProp from '@/editor/properties/BorderRadiusProp.ts';
import ContentProp from '@/editor/properties/ContentProp.ts';
import { PureContentProp } from '@/editor/properties/PureContentProp.ts';

export function getEditorInstance() {
  const editor = new App();

  // Components registration
  editor.use('container', Container);
  editor.use('pure', Pure);
  editor.use('text', Text);
  editor.use('header', Header);
  editor.use('image', Image);
  editor.use('link', Link);

  // Props registration

  // Common
  editor.useProp(BorderRadiusProp);

  // Container
  editor.useProp(FlexDirectionProp);
  editor.useProp(FlexWrapProp);
  editor.useProp(FlexProp);
  editor.useProp(GutterProp);
  editor.useProp(AlignItemsProp);
  editor.useProp(AlignContentProp);
  editor.useProp(ColWidthProp);
  editor.useProp(JustifyContentProp);

  // Text, Link, Header
  editor.useProp(FontProp);
  editor.useProp(InlineTextProp);
  editor.useProp(LeadParagraphProp);
  editor.useProp(LineHeightProp);
  editor.useProp(MonoSpaceProp);
  editor.useProp(TextAlignProp);
  editor.useProp(TextTransformProp);

  // Link
  editor.useProp(LinkOpacityProp);
  editor.useProp(LinkColorProp);
  editor.useProp(LinkUnderlineOffsetProp);
  editor.useProp(LinkUnderlineOpacityProp);

  // Image
  editor.useProp(ImgFluidProp);

  // Content
  editor.useProp(ContentProp);
  editor.useProp(PureContentProp);

  return editor;
}

const Editor = {
  install(app: AppVue) {
    app.config.globalProperties.$mount_editor = (
      root: string,
      identifiersSalt: string,
      json: string = '[]',
    ): App => {
      const editor = getEditorInstance();

      editor.init(root, identifiersSalt, JSON.parse(json));

      editor.mount();

      return editor;
    };
  },
};

export default Editor;
