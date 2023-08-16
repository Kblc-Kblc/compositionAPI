<template>
  <div>
    <el-collapse v-model="collapse" accordion>
      <el-collapse-item class="collapse-item" title="Показатели" name="1">
        <div>
          <router-link class="link" to="/value-indicators">Значения показателей</router-link>
        </div>
        <div>
          <router-link class="link" to="/status-indicators">Статус показателей</router-link>
        </div>
        <div>
          <router-link class="link" to="/applications">Заявки</router-link>
        </div>
      </el-collapse-item>
      <el-collapse-item class="collapse-item" title="Справочники" name="2">
        <div><router-link class="link" to="/specialties">Специальности</router-link></div>
        <div><router-link class="link" to="/organizations">Организации</router-link></div>
        <div><router-link class="link" to="/territories">Территории</router-link></div>
      </el-collapse-item>
      <el-collapse-item class="collapse-item" title="Администрирование" name="3">
        <div>Content of item 3</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'NavigationIndicators',
  setup() {
    const collapse = ref(localStorage.getItem('collapse') || '1')

    watch(collapse, (newCollapse) => {
      localStorage.setItem('collapse', newCollapse)
    })

    return {
      collapse
    }
  }
}
</script>

<style lang="scss" scoped>
.el-collapse {
  --el-collapse-header-bg-color: var(--el-bg-color-page);
  --el-collapse-border-color: none;
  --el-collapse-content-bg-color: var(--el-bg-color-page);
  :deep(.el-collapse-item__content) {
    padding-left: 10px;
  }
}

.link {
  text-decoration: none;
  color: var(--color-text);
}

.router-link-active {
  color: var(--active-color);
}

.collapse-item {
  :deep(.el-collapse-item__header) {
    font-size: 16px;
    line-height: 1.5;
    font-style: normal;
  }
}

.collapse-item {
  :deep(.el-collapse-item__content) {
    padding-bottom: 1rem;
    div {
      padding-bottom: 0.5rem;
      &:last-child {
        padding-bottom: 0;
      }
    }
  }
}
</style>
