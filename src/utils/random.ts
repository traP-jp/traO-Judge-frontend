export const generateRandomString = (length: number): string => {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const maxValidValue = 4294967295 - (4294967296 % characters.length)
  let randomString = ''
  while (randomString.length < length) {
    const randomValues = new Uint32Array(length - randomString.length)
    crypto.getRandomValues(randomValues)
    for (const randomValue of randomValues) {
      if (randomValue <= maxValidValue) {
        randomString += characters.charAt(randomValue % characters.length)
      }
    }
  }
  return randomString
}