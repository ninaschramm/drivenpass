/*
  Warnings:

  - Added the required column `password` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "cardType" AS ENUM ('Debit', 'Credit', 'Both');

-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "cardType" "cardType" NOT NULL DEFAULT 'Both',
ADD COLUMN     "password" INTEGER NOT NULL,
ADD COLUMN     "virtual" BOOLEAN NOT NULL DEFAULT false;
