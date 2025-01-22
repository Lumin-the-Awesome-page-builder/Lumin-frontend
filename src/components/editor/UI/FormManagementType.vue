<template>
    <div class="wrapContainer">
      <OptionHeadingComponent
        title="Form Type"
        popoverTitle="Тип обработчика формы"
        popoverText="Вы можете выбрать собственный обработчик, если у вас он есть или воспользоваться встроенным сборщиком данных с форм, в случае со встроенным сборщиком у вас будет возможность отслеживать собираемые данные в личном кабинете."
      />
        <n-dropdown type="divider" trigger="click" :menu-props="menuProps" :options="options" class="input" @select="handleSelect">
            <n-button class="btn" id="hover-btn">{{ valueLabel }}</n-button>
        </n-dropdown>
    </div>
    <template v-if="value == 'self'">
        <div class="wrapContainer">
            <OptionHeadingComponent
                title="Get Url"
                popoverTitle="URL для получения данных отправленных через форму"
                popoverText="Этот url будет использоваться для аггрегации данных ваших форм в личном кабинете. Мы нигде не храним ваши данные, так что можете не переживать за их безопасность."
            />
            <n-input class="change-btn" v-model:value="valueGet" type="text" @change="changeGetUrl"></n-input>
        </div>
        <div class="wrapContainer">
            <OptionHeadingComponent
                title="Save Url"
                popoverTitle="URL для отправки данных через форму"
                popoverText="Мы автоматически создадим обработчики для ваших форм и этот URL будет использоваться для сохранении данных, при отправке формы."
            />
            <n-input class="change-btn" v-model:value="valueSave" type="text" @change="changeSaveUrl"></n-input>
        </div>
    </template>
  </template>
  
<script lang="ts">
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import FormManagementTypeProp from '@/editor/properties/FormManagementTypeProp';
  
  
export default {
    name: 'FormManagementType',
    components: { OptionHeadingComponent },
    emits: ['changed'],
    props: {
      prop: {
        type: FormManagementTypeProp
      }
    },
    data: () => ({
        valueGet: "",
        valueSave: "",
        value: "",
        valueLabel: "",
        menuProps: () => ({
            style: {
                width: '15rem',
                textAlign: 'center',
            },
            placement: 'bottom-end'
        }),
        optionsKeyToLabel: {
            self: 'Собственный',
            service: 'Встроенный',
        },
        options: [
            {
                label: 'Собственный',
                key: 'self',
            },
            {
                label: 'Встроенный',
                key: 'service',
            }
        ]
    }),
    mounted() {
        this.value = this.prop.value[0];
        this.valueSave = this.prop.value[1];
        this.valueGet = this.prop.value[2];
        this.valueLabel = this.optionsKeyToLabel[this.value];
    },
    methods: {
        handleSelect(key) {
            this.valueLabel = this.optionsKeyToLabel[key];
            this.value = key
            this.prop.setValue(this.value, 0)
            this.$emit('changed')
        },
        changeGetUrl() {
            this.prop.setValue(this.value, 0)
            this.prop.setValue(this.valueSave, 1)
            this.$emit('changed')
        },
        changeSaveUrl() {
            this.prop.setValue(this.value, 0)
            this.prop.setValue(this.valueSave, 1)
            this.prop.setValue(this.valueGet, 2)
            this.$emit('changed')
        }
    },
  };
  </script>
  
  <style scoped>
    .wrapContainer {
      margin-bottom: 1.5rem;
    }
    .change-btn {
      margin-top: .5rem;
    }
  </style>