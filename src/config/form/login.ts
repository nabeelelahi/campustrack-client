export const loginFields = [
    {
        title: 'Email',
        name: 'email',
        // icon: 'icons/email.png',
        rules: [{ required: true, message: 'Please input your email!' }],
        type: 'text',
    },
    {
        title: 'Password',
        name: 'password',
        // icon: 'icons/lock.png',
        rules: [{ required: true, message: 'Please input your password!' }],
        type: 'password',
    },
]