export const usernameValidator = (username: string): boolean => {
  return /^[A-Za-z0-9_]{5,10}$/.test(username)
}

export const passwordValidator = (password: string): boolean => {
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-={}[\]:;"'<>,.?/]/.test(password);
  const isValid = /^[A-Za-z0-9!@#$%^&*()_+\-={}[\]:;"'<>,.?/]{10,64}$/.test(password);
  return hasLetter && hasNumber && hasSpecialChar && isValid;
}