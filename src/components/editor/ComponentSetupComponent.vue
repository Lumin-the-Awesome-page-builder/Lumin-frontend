<template>
  <template v-if="componentSelected">
    <template v-if="componentNameAvailable">
      <ComponentName @changed='propUpdated("component-name")' :prop="component.props.get('component-name')" />
      <n-button @click="saveWidget" color="#7b7bfe" ghost>Сохранить как виджет</n-button>
      
      <n-divider />
    </template>
    
    <ImageSrc @changed='propUpdated("image-src")' v-if="imageSrcComponentAvailable" :prop="component.props.get('image-src')" />
    <InputName @changed='propUpdated("input-name")' v-if="inputNameComponentAvailable" :prop="component.props.get('input-name')" />
    <FormName @changed='propUpdated("form-name")' v-if="formNameComponentAvailable" :prop="component.props.get('form-name')" />
    <InputType @changed='propUpdated("input-type")' v-if="inputTypeComponentAvailable" :prop="component.props.get('input-type')" />
    <FormManagementType @changed='propUpdated("form-management-type")' v-if="formManagementTypeComponentAvailable" :prop="component.props.get('form-management-type')" />

    <ContentComponent @changed='propUpdated("content")' v-if="contentComponentAvailable" :prop="component.props.get('content')" />
    <PureContentComponent @changed='propUpdated("pure")' v-if="pureContentComponentAvailable" :prop="component.props.get('pure-content')" />
    
    <LinkColorComponent @changed='propUpdated("link-color")' v-if="linkColorAvailable" :prop="component.props.get('link-color')" />
    <LinkOpacityComponent @changed='propUpdated("link-opacity")' v-if="linkOpacityAvailable" :prop="component.props.get('link-opacity')" />
    <LinkUnderlineOffsetComponent @changed='propUpdated("link-offset")' v-if="linkUnderlineOffsetAvailable" :prop="component.props.get('link-offset')" />
    <LinkUnderlineOpacityComponent @changed='propUpdated("link-underline-opacity")' v-if="linkUnderlineOpacityAvailable" :prop="component.props.get('link-underline-opacity')" />
    
    <FontComponent @changed='propUpdated("font")' v-if="fontAvailable" :prop="component.props.get('font')" />
    <InlineTextComponent @changed='propUpdated("inline-text")' v-if="inlineTextAvailable" :prop="component.props.get('inline-text')" />
    <LeadParagraphComponent @changed='propUpdated("lead-paragraph")' v-if="leadParagraphAvailable" :prop="component.props.get('lead-paragraph')" />
    <LineHeightComponent @changed='propUpdated("line-height")' v-if="lineHeightAvailable" :prop="component.props.get('line-height')" />
    <ListInlineComponent @changed='propUpdated("list-inline")' v-if="listInlineAvailable" :prop="component.props.get('list-inline')" />
    <ListUnstyledComponent @changed='propUpdated("list-unstyled")' v-if="listUnstyledAvailable" :prop="component.props.get('list-unstyled')" />
    <MonospaceComponent @changed='propUpdated("font-monospace")' v-if="monospaceAvailable" :prop="component.props.get('font-monospace')" />
    <TextAlignComponent @changed='propUpdated("text-align")' v-if="textAlignAvailable" :prop="component.props.get('text-align')" />
    <TextTransformComponent @changed='propUpdated("text-transform")' v-if="textTransformAvailable" :prop="component.props.get('text-transform')" />
    <TextDecorationComponent @changed='propUpdated("text-decoration")' v-if="textDecorationAvailable" :prop="component.props.get('text-decoration')" />
    
    <FlexDirectionComponent @changed='propUpdated("flex-direction")' v-if="flexDirectionAvailable" :prop="component.props.get('flex-direction')" />
    <AlignContentComponent @changed='propUpdated("align-content")' v-if="alignContentAvailable" :prop="component.props.get('align-content')" />
    <AlignItemsComponent @changed='propUpdated("align-items")' v-if="alignItemsAvailable" :prop="component.props.get('align-items')" />
    <JustifyContentComponent @changed='propUpdated("justify-content")' v-if="justifyContentAvailable" :prop="component.props.get('justify-content')" />
    <GutterComponent @changed='propUpdated("gap")' v-if="gutterAvailable" :prop="component.props.get('gap')" />
    <ColWidthComponent @changed='propUpdated("col")' v-if="colWidthAvailable" :prop="component.props.get('col')" />
    
    <BorderRadiusComponent @changed='propUpdated("border-radius")' v-if="borderRadiusAvailable" :prop="component.props.get('border-radius')" />
    <ImgFluidComponent @changed='propUpdated("img-fluid")' v-if="imgFluidAvailable" :prop="component.props.get('img-fluid')" />
  </template>
  <div v-else class='not-selected-title'>
    Блок не выбран
  </div>
</template>

<script lang="ts">
import InlineTextComponent from '@/components/editor/UI/text/InlineTextComponent.vue';
import LeadParagraphComponent from '@/components/editor/UI/text/LeadParagraphComponent.vue';
import LineHeightComponent from '@/components/editor/UI/text/LineHeightComponent.vue';
import ListInlineComponent from '@/components/editor/UI/text/ListInlineComponent.vue';
import ListUnstyledComponent from '@/components/editor/UI/text/ListUnstyledComponent.vue';
import MonospaceComponent from '@/components/editor/UI/text/MonospaceComponent.vue';
import TextAlignComponent from '@/components/editor/UI/text/TextAlignComponent.vue';
import TextTransformComponent from '@/components/editor/UI/text/TextTransformComponent.vue';
import AlignItemsComponent from '@/components/editor/UI/AlignItemsComponent.vue';
import AlignContentComponent from '@/components/editor/UI/AlignContentComponent.vue'
import BorderRadiusComponent from '@/components/editor/UI/BorderRadiusComponent.vue';
import ColWidthComponent from '@/components/editor/UI/ColWidthComponent.vue';
import FlexDirectionComponent from '@/components/editor/UI/FlexDirectionComponent.vue';
import GutterComponent from '@/components/editor/UI/GutterComponent.vue';
import ImgFluidComponent from '@/components/editor/UI/ImgFluidComponent.vue';
import JustifyContentComponent from '@/components/editor/UI/JustifyContentComponent.vue';
import LinkColorComponent from '@/components/editor/UI/link/LinkColorComponent.vue';
import LinkOpacityComponent from '@/components/editor/UI/link/LinkOpacityComponent.vue';
import LinkUnderlineOffsetComponent from '@/components/editor/UI/link/LinkUnderlineOffsetComponent.vue';
import LinkUnderlineOpacityComponent from '@/components/editor/UI/link/LinkUnderlineOpacityComponent.vue';
import FontComponent from '@/components/editor/UI/text/FontComponent.vue';
import TextDecorationComponent from '@/components/editor/UI/text/TextDecorationComponent.vue';
import ContentComponent from '@/components/editor/UI/ContentComponent.vue'
import useComponentSetupStore from '@/store/component-setup.store.ts';
import LinkColorProp from '@/editor/properties/link/LinkColorProp.ts';
import LinkOpacityProp from '@/editor/properties/link/LinkOpacityProp.ts';
import JustifyContentProp from '@/editor/properties/JustifyContentProp.ts';
import ImgFluidProp from '@/editor/properties/ImgFluidProp.ts';
import GutterProp from '@/editor/properties/GutterProp.ts';
import FlexDirectionProp from '@/editor/properties/FlexDirectionProp.ts';
import ColWidthProp from '@/editor/properties/ColWidthProp.ts';
import BorderRadiusProp from '@/editor/properties/BorderRadiusProp.ts';
import AlignItemsProp from '@/editor/properties/AlignItemsProp.ts';
import AlignContentProp from '@/editor/properties/AlignContentProp.ts';
import TextDecorationProp from '@/editor/properties/text/TextDecorationProp.ts';
import TextTransformProp from '@/editor/properties/text/TextTransformProp.ts';
import TextAlignProp from '@/editor/properties/text/TextAlignProp.ts';
import MonoSpaceProp from '@/editor/properties/text/MonoSpaceProp.ts';
import ListUnstyledProp from '@/editor/properties/text/ListUnstyledProp.ts';
import ListInlineProp from '@/editor/properties/text/ListInlineProp.ts';
import LineHeightProp from '@/editor/properties/text/LineHeightProp.ts';
import LeadParagraphProp from '@/editor/properties/text/LeadParagraphProp.ts';
import InlineTextProp from '@/editor/properties/text/InlineTextProp.ts';
import FontProp from '@/editor/properties/text/FontProp.ts';
import LinkUnderlineOpacityProp from '@/editor/properties/link/LinkUnderlineOpacityProp.ts';
import LinkUnderlineOffsetProp from '@/editor/properties/link/LinkUnderlineOffsetProp.ts';
import ContentProp from '@/editor/properties/ContentProp.ts';
import PureContentComponent from '@/components/editor/UI/PureContentComponent.vue';
import { PureContentProp } from '@/editor/properties/PureContentProp.ts';
import ComponentName from '@/components/editor/UI/ComponentName.vue';
import useEditorStore from '@/store/editor.store.ts';
import ComponentNameProp from '@/editor/properties/ComponentNameProp.ts';
import InputName from './UI/InputName.vue';
import FormName from './UI/FormName.vue';
import InputType from './UI/InputType.vue';
import FormManagementType from './UI/FormManagementType.vue';
import FormManagementTypeProp from '@/editor/properties/FormManagementTypeProp';
import InputTypeProp from '@/editor/properties/InputTypeProp';
import FormNameProp from '@/editor/properties/FormNameProp';
import InputNameProp from '@/editor/properties/InputNameProp';
import ImageSrc from './UI/ImageSrcComponent.vue';
import ImageSrcProp from '@/editor/properties/ImageSrcProp';


export default <any> {
  name: 'ComponentSetupComponent',
  components: {
    ImageSrc,
    InputName,
    FormName,
    InputType,
    FormManagementType,
    ComponentName,
    PureContentComponent,
    TextDecorationComponent,
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
    InlineTextComponent,
    LeadParagraphComponent,
    LineHeightComponent,
    LinkColorComponent,
    LinkOpacityComponent,
    LinkUnderlineOffsetComponent,
    LinkUnderlineOpacityComponent,
    FontComponent,
    ContentComponent
  },
  setup() {
    const componentSetupStore = useComponentSetupStore()

    return {
      componentSetupStore,
      editorStore: useEditorStore()
    }
  },
  methods: {
    async saveWidget() {
      const result = await this.componentSetupStore.saveWidget();
      if (result)
        result.toastIfError(this.notificationStore);
    },
    propUpdated(prop_name) {
      const value = this.component.props.get(prop_name).value;
      console.log(prop_name, value)
      this.componentSetupStore.patchProp(prop_name, value, this.component)
    },
    isAvailable(name) {
      return this.component.availableProps.includes(name)
    }
  },
  computed: {
    component() {
      return this.componentSetupStore.component;
    },
    componentSelected() {
      console.log(this.component)
      return this.component != null;
    },
    imageSrcComponentAvailable() {
      return this.isAvailable(ImageSrcProp.name)
    },
    inputNameComponentAvailable() {
      return this.isAvailable(InputNameProp.name)
    },
    formNameComponentAvailable() {
      return this.isAvailable(FormNameProp.name)
    },
    inputTypeComponentAvailable() {
      return this.isAvailable(InputTypeProp.name);
    },
    formManagementTypeComponentAvailable() {
      return this.isAvailable(FormManagementTypeProp.name);
    },
    linkColorAvailable() {
      return this.isAvailable(LinkColorProp.name);
    },
    linkOpacityAvailable() {
      return this.isAvailable(LinkOpacityProp.name);
    },
    linkUnderlineOffsetAvailable() {
      return this.isAvailable(LinkUnderlineOffsetProp.name);
    },
    linkUnderlineOpacityAvailable() {
      return this.isAvailable(LinkUnderlineOpacityProp.name);
    },
    fontAvailable() {
      return this.isAvailable(FontProp.name);
    },
    inlineTextAvailable() {
      return this.isAvailable(InlineTextProp.name);
    },
    leadParagraphAvailable() {
      return this.isAvailable(LeadParagraphProp.name);
    },
    lineHeightAvailable() {
      return this.isAvailable(LineHeightProp.name);
    },
    listInlineAvailable() {
      return this.isAvailable(ListInlineProp.name);
    },
    listUnstyledAvailable() {
      return this.isAvailable(ListUnstyledProp.name);
    },
    monospaceAvailable() {
      return this.isAvailable(MonoSpaceProp.name);
    },
    textAlignAvailable() {
      return this.isAvailable(TextAlignProp.name);
    },
    textTransformAvailable() {
      return this.isAvailable(TextTransformProp.name);
    },
    textDecorationAvailable() {
      return this.isAvailable(TextDecorationProp.name);
    },
    alignContentAvailable() {
      return this.isAvailable(AlignContentProp.name);
    },
    alignItemsAvailable() {
      return this.isAvailable(AlignItemsProp.name);
    },
    borderRadiusAvailable() {
      return this.isAvailable(BorderRadiusProp.name);
    },
    colWidthAvailable() {
      return this.isAvailable(ColWidthProp.name);
    },
    flexDirectionAvailable() {
      return this.isAvailable(FlexDirectionProp.name);
    },
    gutterAvailable() {
      return this.isAvailable(GutterProp.name);
    },
    imgFluidAvailable() {
      return this.isAvailable(ImgFluidProp.name);
    },
    justifyContentAvailable() {
      return this.isAvailable(JustifyContentProp.name);
    },
    contentComponentAvailable() {
      return this.isAvailable(ContentProp.name)
    },
    pureContentComponentAvailable() {
      return this.isAvailable(PureContentProp.name)
    },
    componentNameAvailable() {
      return this.isAvailable(ComponentNameProp.name)
    }
  }
}
</script>

<style scoped>

.not-selected-title {
  font-size: 18px;
  color: #6f6c99;
}
</style>