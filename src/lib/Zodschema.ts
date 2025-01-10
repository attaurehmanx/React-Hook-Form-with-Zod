import { z } from 'zod'

export const Zodformschema = z.object({
    name:z.string().min(4, "minimum 4 character"),
    email:z.string().email("email is required"),
    password:z.string().min(8, "minimum 8 character").regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, "must be 1 lowercase, 1 uppercase, 1 digit and 1 special character."),
    confirmpassword:z.string(),
}).refine( (data) => data.password === data.confirmpassword, {
    message: "Password is not matching",
    path: ["confirmpassword"],
});

export type Inputs = z.infer<typeof Zodformschema>;