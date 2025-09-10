export const userForm = [
  {
    label: "Name",
    name: "name",
    rules: [{ required: true, message: "Please enter user's name!" }],
    type: "text",
  },
  {
    label: "Email",
    name: "email",
    rules: [
      { required: true, message: "Please enter user's email!" },
      { type: "email", message: "The input is not valid E-mail!" },
    ],
    type: "text",
  },
  // {
  //     label: "Password",
  //     name: "password",
  //     type: "password",
  //     value: 'Bjm@123',
  //     rules: [
  //         { required: true, message: "Please enter user's password!" },
  //     ],
  //     disabled: true
  //   },
  {
    label: "Address",
    name: "address",
    rules: [
      { required: true, message: "Please enter user's address!" },
    ],
    type: "text",
  },
  {
    label: "Mobile no.",
    name: "mobile_no",
    rules: [
      { required: true, message: "Please enter user's mobile number!" },
    ],
    type: "text",
  },
  {
    label: "Role",
    name: "role",
    rules: [
      { required: true, message: "Please select a role" },
    ],
    options: [
      { value: 'student', label: 'Student' },
      { value: 'parent', label: 'Parent' },
      { value: 'teacher', label: 'Teacher' },
      { value: 'staff', label: 'Staff' },
    ],
    type: "select",
  },
];
