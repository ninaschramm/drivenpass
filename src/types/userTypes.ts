import { users } from "@prisma/client";

export type IUser = Omit<users, "id">