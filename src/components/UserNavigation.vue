<template>
  <div>
    <el-dropdown v-if="user" trigger="click">
      <span class="user-name">
        {{ user.email }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogout">Выход</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <span v-else>Пользователь</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth/auth'
import { useRouter, RouteLocationRaw } from 'vue-router'
import api from '@/api/index'
import { ArrowDown } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'UserNavigation',
  components: { ArrowDown },
  setup() {
    const user = ref<any>(null) //!заменить 'any' на более конкретный тип
    const authStore = useAuthStore()
    const router = useRouter()

    onMounted(async () => {
      try {
        const response = await api.auth.me()
        user.value = response.data.data
      } catch (error) {
        console.error(error)
      }
    })

    const handleLogout = async () => {
      try {
        await authStore.logout()
        user.value = null
        const route: RouteLocationRaw = { name: 'Login' }
        router.push(route)
      } catch (error) {
        console.error(error)
      }
    }

    return {
      user,
      handleLogout
    }
  }
})
</script>

<style scoped>
.user-name {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
