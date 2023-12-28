export const errorText = 'Some error occurred'

export const registerPageContent = {
  html: '<b>Hello!</b><br/>Please confirm your email by clicking on the link below:<br/><a href="http://localhost:5173/confirm-email/##token##">Confirm email</a>. If it doesn\'t work, copy and paste the following link in your browser:<br/>http://localhost:5173/confirm-email/##token##',
  subject: 'Confirm your email',
}

export const forgotPageContent = {
  html: '<h1>Hello!</h1><p>Click <a href="http://localhost:5173/reset-password/##token##">here</a> to recover your password</p>',
  subject: 'Recover your password',
}

export const notFoundPageContent = {
  link: 'Back to home page',
  text: 'Sorry! Page not found!',
}

export const ProfilePageContent = {
  profile: {
    logoutButton: 'Logout',
    title: 'Personal Information',
  },
}
