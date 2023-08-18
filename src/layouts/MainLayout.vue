<template>
  <el-container class="main-layout">
    <el-aside width="250px" class="aside">
      <el-container direction="vertical">
        <user-info class="user-info"></user-info>
        <navigation-indicators class="navigation-indicators"></navigation-indicators>
      </el-container>
    </el-aside>

    <el-container direction="vertical">
      <el-header height="100px">
        <el-row justify="space-between" class="header-wrapper">
          <div class="header-title">
            <h1>{{ headerTitle }}</h1>
          </div>
          <div class="header-change-theme">
            <div class="custom-switch" @click="toggleDarkMode">
              <el-icon v-if="isDarkMode"><Moon /></el-icon>
              <el-icon v-else><Sunny /></el-icon>
            </div>
          </div>
        </el-row>
      </el-header>

      <el-main>
        <router-view name="content"></router-view>
      </el-main>
    </el-container>

    <el-aside width="250px" class="aside">
      <el-container direction="vertical">
        <user-navigation class="user-navigation"></user-navigation>
        <router-view name="aside"></router-view>
      </el-container>
    </el-aside>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from 'vue'
import NavigationIndicators from '@/components/NavigationIndicators.vue'
import UserInfo from '@/components/UserInfo.vue'
import UserNavigation from '@/components/UserNavigation.vue'
import { Moon, Sunny } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    NavigationIndicators,
    UserInfo,
    UserNavigation,
    Moon,
    Sunny
  },
  props: {
    headerTitle: {
      type: String as PropType<string>,
      default: ''
    }
  },
  setup() {
    const isDarkMode = ref<boolean>(localStorage.getItem('darkMode') === 'true')

    const updateDarkModeClass = () => {
      if (isDarkMode.value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value
      localStorage.setItem('darkMode', String(isDarkMode.value))
      updateDarkModeClass()
    }

    onMounted(updateDarkModeClass)
    return {
      toggleDarkMode,
      isDarkMode
    }
  }
})
</script>

<style lang="scss" scoped>
.el-main {
  --el-main-padding: 1rem;
  background-color: var(--el-bg-color-page);
  height: 100%;
  border-right: 1px solid var(--border-color);
  border-left: 1px solid var(--border-color);
  overflow: hidden;
}

.main-layout {
  height: 100%;
}

.user-info {
  height: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 2rem;

  border-bottom: 1px solid var(--border-color);
}

.navigation-indicators {
  padding: 1rem 2rem;
}

.el-aside {
  background-color: var(--el-bg-color-page);
}

.user-navigation {
  height: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 2rem;

  border-bottom: 1px solid var(--border-color);
}

.el-header {
  background-color: var(--el-bg-color-page);
  line-height: 60px;
  border-bottom: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
  border-left: 1px solid var(--border-color);
  display: flex;
  align-items: center;
}

.custom-switch {
  cursor: pointer;
}

.header-title {
  font-size: 2rem;
  color: var(--el-text-color-primary);
}

.header-wrapper {
  width: 100%;
}
</style>
