import { notes } from "@prisma/client";

export type INote = Omit<notes, "id" | "userId">