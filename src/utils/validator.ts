import isEmail from 'validator/lib/isEmail'

export const usernameValidator = (username: string): [boolean, string] => {
  if (username.length < 1) {
    return [false, '必須項目です。']
  }
  if (username.length > 32) {
    return [false, 'ユーザー名が長すぎます。32字以下にしてください。']
  }
  if (/[^A-Za-z0-9_-]/.test(username)) {
    return [false, '半角英数字とアンダースコア、ハイフン以外の文字が含まれています。']
  }
  if (/^[-_](.*[-_])?$/.test(username)) {
    return [false, 'アンダースコア、ハイフンを最初と最後に用いることはできません。']
  }
  if (/^[_-]/.test(username)) {
    return [false, 'アンダースコア、ハイフンを最初に用いることはできません。']
  }
  if (/[_-]$/.test(username)) {
    return [false, 'アンダースコア、ハイフンを最後に用いることはできません。']
  }
  return [true, '']
}

export const passwordValidator = (password: string): [boolean, string] => {
  if (password.length < 1) {
    return [false, '必須項目です。']
  }
  if (password.length > 64) {
    return [false, 'パスワードが長すぎます。64字以下にしてください。']
  }
  if (password.length < 8) {
    return [false, 'パスワードが短すぎます。8字以上にしてください。']
  }
  if (/[^A-Za-z0-9@$!%*?&]/.test(password)) {
    return [false, '半角英数字と記号(@, $, !, %, *, ?, &)以外の文字が含まれています。']
  }
  if (!/[a-z]|[A-Z]/.test(password)) {
    return [false, '大文字と小文字の英字をそれぞれ1字以上使用してください。']
  }
  if (!/[A-Z]/.test(password)) {
    return [false, '英大文字を1字以上使用してください。']
  }
  if (!/[a-z]/.test(password)) {
    return [false, '英小文字を1字以上使用してください。']
  }
  return [true, '']
}

export const emailValidator = (email: string): [boolean, string] => {
  if (email.length < 1) {
    return [false, 'メールアドレスが入力されていません。']
  }
  if (!isEmail(email)) {
    return [false, 'メールアドレスの形式が正しくありません。']
  }
  return [true, '']
}
