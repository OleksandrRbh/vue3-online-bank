import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import {computed, watch} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export function useLoginForm () {
  const store = useStore()
  const router = useRouter()

  const { handleSubmit, isSubmitting, submitCount } = useForm()

  const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
    'email',
    yup
      .string()
      .trim()
      .required('This field is required')
      .email('Enter correct email please')
  )

  const MIN_LENGTH = 6

  const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
    'password',
    yup
      .string()
      .trim()
      .required('This field is required')
      .min(MIN_LENGTH, `Min length of value must be ${MIN_LENGTH} symbols`)
  )

  const isTooManyAttempts = computed(() => submitCount.value >= 3)

  watch(isTooManyAttempts, val => {
    if (val) {
      setTimeout(() => {
        submitCount.value = 0
      }, 5000)
    }
  })

  const onSubmit = handleSubmit(async values => {
    console.log('Form values: ', values)
    try {
      await store.dispatch('auth/login', values)
      router.push('/')
    } catch (err) {
    }
  })

  return {
    email,
    password,
    eError,
    pError,
    eBlur,
    pBlur,
    onSubmit,
    isSubmitting,
    isTooManyAttempts
  }
}
