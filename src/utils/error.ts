const ERROR_CODES = {
  EMAIL_NOT_FOUND: "Пользователь с таким Email не найден",
  INVALID_PASSWORD: "Неверный пароль",
  auth: "Пожалуйста войдите в систему"
} as const

export function error(code?: keyof typeof ERROR_CODES) {
  const defaultError = "Неизвестная ошибка"

  if (!code) {
    return defaultError
  }
  return ERROR_CODES[code] ?? defaultError
}