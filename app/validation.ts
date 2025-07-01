import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

export const validatorLogin = withZod(z.object({
    email: z.string().min(1, { message: "Email is required" }).email(" Must be a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
}));

export const validatorTodo = withZod(z.object({
    text: z.string().min(1, { message: "Text is required" }),
    body: z.string().min(1, { message: "Body is required" }),
}))