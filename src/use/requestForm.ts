import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

export interface IRequest {
  fio?: string;
  phone?: string;
  amount?: number;
  status: 'done' | 'cancelled' | 'active' | 'pending';
}

export function useRequestForm(fn: (values: IRequest) => void) {
  const { handleSubmit, isSubmitting } = useForm<IRequest>({
    initialValues: {
      status: 'active',
    }
  })

  const { value: fio, errorMessage: fError, handleBlur: fBlur } = useField(
    'fio',
    yup
      .string()
      .trim()
      .required()
  )

  const { value: phone, errorMessage: pError, handleBlur: pBlur } = useField(
    'phone',
    yup
      .string()
      .trim()
      .required()
  )

  const { value: amount, errorMessage: aError, handleBlur: aBlur } = useField(
    'amount',
    yup
      .number()
      .required()
      .min(0)
  )

  const { value: status } = useField('status')

  const onSubmit = handleSubmit(fn)

  return {
    fio, fError, fBlur,
    phone, pError, pBlur,
    amount, aError, aBlur,
    status,
    onSubmit,
    isSubmitting,
  }
}