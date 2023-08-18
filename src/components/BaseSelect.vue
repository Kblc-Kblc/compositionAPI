<template>
  <div>
    <v-select
      v-model="saveVmodel"
      :options="options"
      :value="modelValue"
      :placeholder="placeholder"
      :label="label"
      :clearable="false"
      :filterable="false"
      :searchable="searchable"
      class="select"
      @open="onOpen"
      @search="searchValue"
      @close="onClose"
      @option:selected="emitUpdate"
    >
      <template #option="option">
        <div v-if="isName">
          <span>{{ option.name }}</span>
        </div>

        <div v-else-if="tooltip">
          <el-tooltip class="box-item" effect="dark" :content="option.name" placement="left">
            <div>{{ option.id }}</div>
          </el-tooltip>
        </div>

        <div v-else-if="option.icon">
          <component :is="option.icon" class="icon-option"></component>
        </div>

        <div v-else>
          <span>{{ option.id }}</span>
        </div>
      </template>
      <template #selected-option="option">
        <component :is="option.icon" class="icon-selected"></component>
      </template>
      <template #list-footer>
        <li v-show="hasNextPage" ref="load" class="loader">Загрузка опций...</li>
      </template>
    </v-select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import vSelect from 'vue-select'
import { Select, CloseBold } from '@element-plus/icons-vue'
import _ from 'lodash'

export default defineComponent({
  name: 'BaseSelect',
  components: {
    'v-select': vSelect,
    Select,
    CloseBold
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    modelValue: [Number, String, Object, Array, null],
    isName: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'id'
    },
    placeholder: {
      type: String,
      default: 'Выберите значение'
    },
    searchable: {
      type: Boolean,
      default: false
    },
    tooltip: {
      type: Boolean,
      default: false
    },
    storeId: {
      type: Object,
      default: {}
    }
  },
  emits: [
    'update:modelValue',
    'search-value',
    'load-more-data',
    'close-select',
    'update:model-value',
    'update-store',
    'open-select'
  ],
  data() {
    return {
      observer: null,
      mutationObserver: null,
      search: '',
      saveVmodel: ''
    }
  },
  computed: {
    hasNextPage() {
      return this.options.length > 24
    }
  },
  watch: {
    options: {
      immediate: true,
      handler: 'handleOptionsChange'
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(this.infiniteScroll)
    this.saveVmodel = this.modelValue
  },
  methods: {
    async handleOptionsChange() {
      if (this.hasNextPage) {
        await this.$nextTick()
        if (this.$refs.load) {
          this.observer.observe(this.$refs.load)

          this.mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.addedNodes.length) {
                const ul = this.$refs.load.parentNode
                const heightOfNewItem = 28
                const numberOfNewItems = 25
                const addedHeight = heightOfNewItem * numberOfNewItems
                ul.scrollTop = ul.scrollHeight - addedHeight
              }
            })
          })
          this.mutationObserver.observe(this.$refs.load.parentNode, {
            childList: true
          })
        }
      }
    },
    searchValue: _.debounce(function (query) {
      this.$emit('search-value', query)
    }, 1000),
    async onOpen() {
      this.$emit('open-select')
    },
    onClose() {
      this.observer.disconnect()

      if (this.mutationObserver) {
        this.mutationObserver.disconnect()
      }

      this.$emit('close-select')
    },
    infiniteScroll([{ isIntersecting }]) {
      if (isIntersecting) {
        new Promise((resolve) => {
          this.$emit('load-more-data')
          this.$nextTick(resolve)
        })
      }
    },
    emitUpdate(event) {
      this.$emit('update-store', {
        e: event,
        storeId: this.storeId
      })
    }
  },
  beforeUnmount() {
    this.observer.disconnect()
  }
})
</script>

<style lang="scss" scoped>
.select {
  :deep(.vs__dropdown-toggle) {
    background-color: var(--bg-filter);
    border: none;
  }
  :deep(.vs__search) {
    font-family: inherit;
  }

  :deep(.vs__dropdown-menu) {
    font-size: 14px;
    font-family: inherit;
  }

  :deep(.vs__selected) {
    font-size: 14px;
    font-family: inherit;
  }
}

.icon-option {
  height: 18px;
  padding-top: 6px;
}

.icon-selected {
  height: 18px;
}
</style>
