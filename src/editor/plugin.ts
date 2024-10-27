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
import AlignSelfProp from '@/editor/properties/AlignSelfProp.ts';
import ColWidthProp from '@/editor/properties/ColWidthProp.ts';
import JustifyContentProp from '@/editor/properties/JustifyContentProp.ts';
import FontWeightProp from '@/editor/properties/text/FontWeightProp.ts';
import InlineTextProps from '@/editor/properties/text/InlineTextProps.ts';
import LeadParagraphProp from '@/editor/properties/text/LeadParagraphProp.ts';
import LineHeightProp from '@/editor/properties/text/LineHeightProp.ts';
import MonoSpaceProp from '@/editor/properties/text/MonoSpaceProp.ts';
import TextAlignProp from '@/editor/properties/text/TextAlignProp.ts';
import TextTransformProp from '@/editor/properties/text/TextTransformProp.ts';
import LinkOpacityProp from '@/editor/properties/link/LinkOpacityProp.ts';
import LinkUnderlineProp from '@/editor/properties/link/LinkUnderlineProp.ts';
import LinkUnderlineOffsetProp from '@/editor/properties/link/LinkUnderlineOffsetProp.ts';
import LinkUnderlineOpacity from '@/editor/properties/link/LinkUnderlineOpacity.ts';
import ImgFluidProp from '@/editor/properties/ImgFluidProp.ts';
import BorderRadiusProp from '@/editor/properties/BorderRadiusProp.ts';

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
editor.useProp(AlignSelfProp);
editor.useProp(ColWidthProp);
editor.useProp(JustifyContentProp);

// Text, Link, Header
editor.useProp(FontWeightProp);
editor.useProp(InlineTextProps);
editor.useProp(LeadParagraphProp);
editor.useProp(LineHeightProp);
editor.useProp(MonoSpaceProp);
editor.useProp(TextAlignProp);
editor.useProp(TextTransformProp);

// Link
editor.useProp(LinkOpacityProp);
editor.useProp(LinkUnderlineProp);
editor.useProp(LinkUnderlineOffsetProp);
editor.useProp(LinkUnderlineOpacity);

// Image
editor.useProp(ImgFluidProp);

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
