import { credentials } from "@prisma/client";

export type ICredential = Omit<credentials, "id" | "userId">