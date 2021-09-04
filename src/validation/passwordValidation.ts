class passwordValidator {
  isValid(password: string, confirmPassword: string): boolean {
    if(password === confirmPassword) {
      const passwordRegexp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      return passwordRegexp.test(password)
    }
    return false
  }
}

export default new passwordValidator()