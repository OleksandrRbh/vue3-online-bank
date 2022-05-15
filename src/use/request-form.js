import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

export function useRequestForm (fn) {
  const { isSubmitting, handleSubmit } = useForm({
    initialValues: {
      status: 'active'
    }
  })

  const { value: fio, errorMessage: fError, handleBlur: fBlur } = useField(
    'fio',
    yup.string()
      .trim()
      .required('Enter client`s fullname')
  )

  const { value: phone, errorMessage: pError, handleBlur: pBlur } = useField(
    'phone',
    yup.string()
      .trim()
      .required('Phone cant`t be empty')
  )

  const { value: amount, errorMessage: aError, handleBlur: aBlur } = useField(
    'amount',
    yup.number()
      .required('Enter amount')
      .min(0, 'Amount must be less than 0')
  )

  const { value: status } = useField('status')

  const onSubmit = handleSubmit(fn)

  return {
    status,
    isSubmitting,
    onSubmit,
    fio,
    fError,
    fBlur,
    phone,
    pError,
    pBlur,
    amount,
    aError,
    aBlur
  }
}
