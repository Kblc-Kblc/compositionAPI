<template>
  <login-layout>
    <div class="login-container">
      <el-card class="login-card">
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-position="top"
          class="login-form"
          @submit.prevent="submitForm"
        >
          <el-form-item :error="errors.email" label="Email" prop="email">
            <el-input v-model="form.email" placeholder="Email" />
          </el-form-item>
          <el-form-item :error="errors.password" label="Password" prop="password">
            <el-input v-model="form.password" type="password" placeholder="Password" />
          </el-form-item>
          <el-form-item class="center">
            <el-button type="primary" native-type="submit">Войти</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </login-layout>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth/auth'
import { useRouter } from 'vue-router'
import LoginLayout from '@/layouts/LoginLayout.vue'
import { ElNotification } from 'element-plus'


interface FormComponent {
  validate: (callback: (valid: boolean) => void) => void;
}

export default defineComponent({
  name: 'Login',
  components: { LoginLayout },
  setup() {
    const router = useRouter()
    const auth = useAuthStore()

    const form = ref({
      email: '',
      password: ''
    })

    const formRef = ref<FormComponent | null>(null)

    const errors = reactive({ email: '', password: '' })

    const rules = ref({
      email: [
        { required: true, message: 'Введите адрес электронной почты', trigger: 'blur' },
        {
          type: 'email',
          message: 'Введите корректный адрес электронной почты',
          trigger: 'blur,change'
        }
      ],
      password: [
        { required: true, message: 'Введите пароль', trigger: 'blur' },
        {
          min: 4,
          max: 12,
          message: 'Длина пароля должна быть от 4 до 12 символов',
          trigger: 'blur,change'
        }
      ]
    })

    const submitForm = async () => {
      if (formRef.value) {
      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          try {
            await auth.login({ email: form.value.email, password: form.value.password })
            router.push('/value-indicators')
          } catch {
            errors.email = 'Неверный логин или пароль'
            errors.password = 'Неверный логин или пароль'
          }
        } else {
          ElNotification({
            title: 'Ошибка',
            message: 'Заполните поля',
            type: 'error'
          })
          return false
        }
      })
    }
    }

    return {
      form,
      formRef,
      rules,
      submitForm,
      errors
    }
  }
})
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('@/assets/image/1.svg') no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
}

.login-card {
  width: 300px;
}

.center :deep(.el-form-item__content) {
  display: block;
  text-align: center;
}
</style>
