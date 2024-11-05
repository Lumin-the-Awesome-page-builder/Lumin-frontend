<template>
  <!--        <LinkColorComponent :prop="component.props.get('link-color')" />-->
  <!--        <LinkOpacityComponent :prop="component.props.get('link-opacity')" />-->
  <!--        <LinkUnderlineOffsetComponent :prop="component.props.get('link-offset')" />-->
  <!--        <LinkUnderlineOpacityComponent :prop="component.props.get('link-underline-opacity')" />-->
  <!--        -->
  <!--        <FontComponent :prop="component.props.get('font')" />-->
<!--  <InlineTextComponent :prop="component.props.get('inline-text')" />-->
<!--  <LeadParagraphComponent :prop="component.props.get('lead-paragraph')" />-->
<!--  <LineHeightComponent :prop="component.props.get('line-height')" />-->
<!--  <ListInlineComponent :prop="component.props.get('list-inline')" />-->
<!--  <ListUnstyledComponent :prop="component.props.get('list-unstyled')" />-->
<!--  <MonospaceComponent :prop="component.props.get('font-monospace')" />-->
<!--  <TextAlignComponent :prop="component.props.get('text-align')" />-->
<!--  <TextTransformComponent :prop="component.props.get('text-transform')" />-->
  <!--        -->
<!--  <AlignContentComponent :prop="component.props.get('align-content')" />-->
<!--  <AlignItemsComponent :prop="component.props.get('align-items')" />-->
  <BorderRadiusComponent :prop="component.props.get('border-radius')" />
  <ColWidthComponent :prop="component.props.get('col')" />
  <FlexDirectionComponent :prop="component.props.get('flex-direction')" />
  <GutterComponent :prop="component.props.get('gap')" />
  <ImgFluidComponent :prop="component.props.get('img-fluid')" />
  <JustifyContentComponent :prop="component.props.get('justify-content')" />
</template>

<script lang="ts">
import InlineTextComponent from '@/components/editor/UI/text/InlineTextComponent.vue';
import LeadParagraphComponent from '@/components/editor/UI/text/LeadParagraphComponent.vue';
import LineHeightComponent from '@/components/editor/UI/text/LineHeightComponent.vue';
import Container from '@/editor/components/Container.ts';
import LinkColorProp from '@/editor/properties/link/LinkColorProp.ts';
import LinkOpacityProp from '@/editor/properties/link/LinkOpacityProp.ts';
import LinkUnderlineOffsetProp from '@/editor/properties/link/LinkUnderlineOffsetProp.ts';
import LinkUnderlineOpacityProp from '@/editor/properties/link/LinkUnderlineOpacityProp.ts';
import FontProp from '@/editor/properties/text/FontProp.ts';
import InlineTextProp from '@/editor/properties/text/InlineTextProp.ts';
import LeadParagraphProp from '@/editor/properties/text/LeadParagraphProp.ts';
import LineHeightProp from '@/editor/properties/text/LineHeightProp.ts';
import ListInlineProp from '@/editor/properties/text/ListInlineProp.ts';
import ListInlineComponent from '@/components/editor/UI/text/ListInlineComponent.vue';
import ListUnstyledProp from '@/editor/properties/text/ListUnstyledProp.ts';
import ListUnstyledComponent from '@/components/editor/UI/text/ListUnstyledComponent.vue';
import MonoSpaceProp from '@/editor/properties/text/MonoSpaceProp.ts';
import MonospaceComponent from '@/components/editor/UI/text/MonospaceComponent.vue';
import TextAlignComponent from '@/components/editor/UI/text/TextAlignComponent.vue';
import TextAlignProp from '@/editor/properties/text/TextAlignProp.ts';
import TextTransformComponent from '@/components/editor/UI/text/TextTransformComponent.vue';
import TextTransformProp from '@/editor/properties/text/TextTransformProp.ts';
import AlignItemsComponent from '@/components/editor/UI/AlignItemsComponent.vue';
import AlignItemsProp from '@/editor/properties/AlignItemsProp.ts';
import AlignContentProp from '@/editor/properties/AlignContentProp.ts';
import AlignContentComponent from '@/components/editor/UI/AlignContentComponent.vue'
import BorderRadiusComponent from '@/components/editor/UI/BorderRadiusComponent.vue';
import BorderRadiusProp from '@/editor/properties/BorderRadiusProp.ts';
import ColWidthComponent from '@/components/editor/UI/ColWidthComponent.vue';
import ColWidthProp from '@/editor/properties/ColWidthProp.ts';
import FlexDirectionComponent from '@/components/editor/UI/FlexDirectionComponent.vue';
import FlexDirectionProp from '@/editor/properties/FlexDirectionProp.ts';
import GutterComponent from '@/components/editor/UI/GutterComponent.vue';
import GutterProp from '@/editor/properties/GutterProp.ts';
import ImgFluidComponent from '@/components/editor/UI/ImgFluidComponent.vue';
import JustifyContentComponent from '@/components/editor/UI/JustifyContentComponent.vue';
import ImgFluidProp from '@/editor/properties/ImgFluidProp.ts';
import JustifyContentProp from '@/editor/properties/JustifyContentProp.ts';

export default {
  name: 'ComponentSetupComponent',
  components: {
    JustifyContentComponent,
    ImgFluidComponent,
    GutterComponent,
    FlexDirectionComponent,
    ColWidthComponent,
    BorderRadiusComponent,
    AlignItemsComponent,
    AlignContentComponent,
    TextTransformComponent,
    TextAlignComponent,
    MonospaceComponent,
    ListUnstyledComponent,
    ListInlineComponent,
    InlineTextComponent, LeadParagraphComponent, LineHeightComponent
  },
  setup() {
    const component = new Container()
    component.setProps([
      new LinkColorProp([null], component),
      new LinkOpacityProp([null, 10], component),
      new LinkUnderlineOffsetProp([null], component),
      new LinkUnderlineOpacityProp([null, null], component),
      
      new FontProp([null, null], component),
      new InlineTextProp([null, null], component),
      new LeadParagraphProp([null], component),
      new LineHeightProp([66], component),
      new ListInlineProp([null], component),
      new ListUnstyledProp([null], component),
      new MonoSpaceProp([null], component),
      new TextAlignProp([null], component),
      new TextTransformProp([null], component),
      
      new AlignItemsProp([null], component),
      new AlignContentProp([null], component),
      new BorderRadiusProp([null], component),
      new ColWidthProp([null], component),
      new FlexDirectionProp([null], component),
      new GutterProp([null], component),
      new ImgFluidProp([null], component),
      new JustifyContentProp([null], component)
    ])
    
    return {
      component
    }
  }
}
</script>

<style scoped>

</style>