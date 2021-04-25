import { computed, watch } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useStore } from 'vuex'
import { IUser } from '@/store/module/auth.module'
import { useRouter } from 'vue-router'

export function useLoginForm() {
  const store = useStore()
  const router = useRouter()

  const { handleSubmit, isSubmitting, submitCount } = useForm<IUser>()

  const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
    'email',
    yup
      .string()
      .trim()
      .required()
      .email()
  )
  const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
    'password',
    yup
      .string()
      .trim()
      .required()
      .min(6)
  )

  const isTooManyAttempts = computed(() => submitCount.value >= 3)

  watch(isTooManyAttempts, (value) => {
    if (value) {
      setTimeout(() => submitCount.value = 0, 10 * 1000)
    }
  })

  const onSubmit = handleSubmit(async (values) => {
    await store.dispatch('auth/login', values)
    router.push('/')
  })

  return {
    onSubmit,
    isSubmitting,
    email,
    password,
    eError,
    pError,
    eBlur,
    pBlur,
    isTooManyAttempts
  }
}