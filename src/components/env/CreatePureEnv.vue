<template>
  <div class="page-header">
    <h2 class="page-heading">Создание конфигурации</h2>
  </div>

  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    class="cm-component"
    height="800px"
    width="100%" />
</template>

<script lang="ts">
import Codemirror from "codemirror-editor-vue3";
import { yaml } from "@codemirror/lang-yaml";
import "codemirror/mode/yaml/yaml"
import "codemirror/addon/display/placeholder";

export default {
    name: "CreatePureEnv",
    components: { Codemirror },
    data: () => ({
        code: "",
        cmOptions: {
            extensions: [yaml], 
            mode: "yaml",
        },
    })
}
</script>
<style>

.CodeMirror {
    font-size: 20px;
}

</style>