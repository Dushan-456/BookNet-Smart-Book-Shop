/*
  Warnings:

  - You are about to drop the column `FirstName` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `LastName` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Profile" DROP COLUMN "FirstName",
DROP COLUMN "LastName";
