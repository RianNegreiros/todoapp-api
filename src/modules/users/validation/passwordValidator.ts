class passwordValidator {
  isValid(password: string): boolean {
      const passwordRegexp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      return passwordRegexp.test(password)
  }
}

export default new passwordValidator()