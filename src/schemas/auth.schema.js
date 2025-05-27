const z = require("zod");

const registerSchema = z.object({
  name: z
    .string({
      required_error: "Username is required",
    })
    .min(2, {
      message: "Username must be at least 2 characters",
    }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),

 
});

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});

module.exports = { registerSchema, loginSchema };
