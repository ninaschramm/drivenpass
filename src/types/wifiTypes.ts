import { wifi } from "@prisma/client";

export type IWifi = Omit<wifi, "id" | "userId">