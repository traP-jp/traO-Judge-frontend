export const usernameVlidator = (username:string): boolean => {
  return /^[A-Za-z_]{5, 10}$/.test(username)
}

export const passwordValidator = (password:string): boolean => {
  return /^[A-Za-z_]{5, 10}$/.test(password) // TODO: 使える記号や文字数を確認する
}