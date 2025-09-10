export const articleForm = [
    {
      label: "Title",
      name: "title",
      rules: [{ required: true, message: "Please enter title!" }],
      type: "text",
    },
    {
      label: "Tag",
      name: "tag",
      rules: [{ required: true, message: "Please enter a tag!" }],
      type: "text",
    },
    {
      label: "Description",
      name: "description",
      rules: [{ required: true, message: "Please enter description!" }],
      type: "textarea",
    },
  ];
  