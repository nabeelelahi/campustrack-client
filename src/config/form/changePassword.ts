export const changePasswordForm = [
    {
        title: 'Old Password',
        name: 'oldPassword',
        // icon: 'icons/lock.png',
        rules: [
            { required: true, message: "Please enter your old password!" },
            {
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Password must include uppercase, lowercase, number, and special character!"
            }
        ],
        type: 'password',
    },
    {
        title: 'New password',
        name: 'newPassword',
        // icon: 'icons/lock.png',
        rules: [
            { required: true, message: "Please enter your password!" },
            {
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Password must include uppercase, lowercase, number, and special character!"
            }
        ],
        type: 'password',
    },
    {
        title: 'Confirm Password',
        name: 'confirmpassword',
        // icon: 'icons/lock.png',
        rules: [{ required: true, message: 'Please input your confirm password!' }],
        type: 'password',
    },
]