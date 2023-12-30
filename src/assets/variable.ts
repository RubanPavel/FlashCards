export const errorText = 'Some error occurred'

export const contentLayoutData = {
  button: 'Sign In',
}

export const registerPageData = {
  html: '<b>Hello!</b><br/>Please confirm your email by clicking on the link below:<br/><a href="http://localhost:5173/confirm-email/##token##">Confirm email</a>. If it doesn\'t work, copy and paste the following link in your browser:<br/>http://localhost:5173/confirm-email/##token##',
  signUp: {
    button: 'Sign Up',
    info: 'Already have an account?',
    inputs: {
      confirmPassword: 'Confirm password',
      email: 'Email',
      password: 'Password',
    },
    link: 'Sign In',
    title: 'Sign Up',
  },
  subject: 'Confirm your email',
}

export const loginPageData = {
  signIn: {
    button: 'Sign In',
    checkbox: 'Remember me',
    forgotLink: 'Forgot Password?',
    inputs: {
      email: 'Email',
      password: 'Password',
    },
    link: 'Sign Up',
    text: 'Don&apos;t have an account?',
    title: 'Sign In',
  },
}

export const forgotPasswordPageData = {
  forgotPassword: {
    button: 'Send instructions',
    info: 'Did you remember your password?',
    inputs: {
      email: 'Email',
    },
    link: 'Try logging in',
    text: 'Enter your email address and we will send you further instructions',
    title: 'Forgot your password?',
  },
  html: '<h1>Hello!</h1><p>Click <a href="http://localhost:5173/reset-password/##token##">here</a> to recover your password</p>',
  subject: 'Recover your password',
}

export const createPasswordPageData = {
  createPassword: {
    button: 'Create New Password',
    info: 'Create new password and we will send you further instructions to email',
    inputs: {
      password: 'Password',
    },
    title: 'Create new password',
  },
}

export const notFoundPageData = {
  link: 'Back to home page',
  text: 'Sorry! Page not found!',
}

export const profilePageData = {
  profile: {
    editAvatar: {
      button: 'Save Changes',
    },
    logoutButton: 'Logout',
    profileForm: {
      button: 'Save Changes',
      input: 'Nickname',
    },
    title: 'Personal Information',
  },
}

export const verifyEmailPageData = {
  confirmEmail: {
    link: 'Proceed to Login',
    text: 'Thank you for registering with our service. Your email address has been successfully verified.',
    title: 'Email Verified',
  },
}
