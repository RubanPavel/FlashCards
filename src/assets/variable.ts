import { PacksPageData } from '@/assets/types'

const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_U_P : import.meta.env.VITE_U_D

export const errorText = 'Some error occurred'

export const dateOptions: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
}

export const contentLayoutData = {
  buttonLogin: 'Sign In',
  buttonRegister: 'Sign Up',
}

export const registerPageData = {
  html: `<b>Hello!</b><br/>Please confirm your email by clicking on the link below:<br/><a href="${apiUrl}/verify-email/##token##">Confirm email</a>. If it doesn't work, copy and paste the following link in your browser:<br/>${apiUrl}/verify-email/##token##`,
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
    text: "Don't have an account?",
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
  html: `<h1>Hello!</h1><p>Click <a href="${apiUrl}/reset-password/##token##">here</a> to recover your password</p>`,
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
  info: 'New password successfully created.',
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

export const packsPageData: PacksPageData = {
  columnsData: [
    { id: '1', sort: 'name', title: 'Name' },
    { id: '2', sort: 'cardsCount', title: 'Cards' },
    { id: '3', sort: 'updated', title: 'Last Updated' },
    { id: '4', sort: 'created', title: 'Create by' },
    { id: '5', sort: '', title: '' },
  ],
  controls: {
    buttonDelete: 'Clear Filter',
    modal: {
      title: 'Add New Pack',
      trigger: 'Add New Pack',
    },
    sliderTitle: 'Number of cards',
    tabSwitcherLabel: 'Show packs cards',
    tabsData: [
      { id: '1', value: 'My Cards' },
      { id: '2', value: 'All Cards' },
    ],
    title: 'Packs list',
  },
}
