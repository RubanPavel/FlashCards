import { toast } from 'react-toastify'

import { CardsPageData, PacksPageData } from '@/assets/types'

const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_U_P : import.meta.env.VITE_U_D

export const errorText = 'Some error occurred'
export const optionsToast = { position: toast.POSITION.BOTTOM_CENTER, theme: 'dark' } as const

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
  toastInfo: '',
}

export const CheckEmailPage = {
  button: 'Back to Sign In',
  info: 'We’ve sent an Email with instructions to',
  title: 'Check Email',
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

export const modalCommon = {
  cancelButton: 'Cancel',
  imageButton: 'Change Cover',
  imageInfo: 'Cover',
  imageSpan: 'No Image',
  inputLabel: 'Name Pack',
  isPrivate: 'Private Pack',
}

export const packsPageData: PacksPageData = {
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
  emptyTable: 'No results found for your query.',
  modals: {
    addPack: {
      submitButton: 'Add New Pack',
      title: 'Add New Pack',
    },
    deletePack: {
      info: 'All cards will be deleted.',
      question: {
        main: 'Do you really want to remove',
        span: 'pack',
      },
      submitButton: 'Delete Pack',
      title: 'Delete Pack',
    },
    editPack: {
      submitButton: 'Save Changes',
      title: 'Edit Pack',
    },
  },
  packsTable: {
    columnsData: [
      { id: '1', sort: 'name', title: 'Name' },
      { id: '2', sort: 'cardsCount', title: 'Cards' },
      { id: '3', sort: 'updated', title: 'Last Updated' },
      { id: '4', sort: 'created', title: 'Create by' },
      { id: '5', sort: '', title: '' },
    ],
    modalTitle: 'Delete Pack',
  },
}

export const cardsPageData: CardsPageData = {
  modals: {
    deleteCard: {
      info: 'Your card will be deleted.',
      question: {
        main: 'Do you really want to remove',
        span: 'card',
      },
      submitButton: 'Delete Card',
      title: 'Delete Card',
    },
  },
}

export const LearnPageData = {
  learnCard: {
    answer: 'Answer:',
    buttonEnd: 'End study session',
    buttonNext: 'Next Question',
    buttonShow: 'Show Answer',
    question: 'Question:',
    rateTitle: 'Rate yourself:',
    tryInfo: 'Number of attempts to answer the question:',
  },
  title: 'Learn',
}

export const radioOptions = [
  'Did not know',
  'Forgot',
  'A lot of though',
  'Confused',
  'Knew the answer',
]

export const toastInfo = {
  addDeckToast: `Your deck added successfully`,
  createPasswordToast: 'New password successfully created.',
  deleteDeckToast: 'Pack deleted successfully',
  forgotPasswordToast: 'Instructions have been sent to your email address',
  giveGradeToast: 'Thank you for your grade',
  loginToast: 'Login successful',
  logoutToast: 'Logout successful',
  registerToast: 'Registration successful',
  updateDeckToast: `Your deck updated successfully`,
  updateUserToast: 'User information updated successfully',
  verifyMailToast: 'Verification email sent successfully',
}
