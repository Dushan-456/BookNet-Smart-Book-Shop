/*
  Warnings:

  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Address` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `DOB` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `Designation` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `Gender` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `Image` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `Mobile` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Profile" DROP CONSTRAINT "Profile_UserId_fkey";

-- DropIndex
DROP INDEX "public"."Profile_UserId_key";

-- AlterTable
ALTER TABLE "public"."Profile" DROP CONSTRAINT "Profile_pkey",
DROP COLUMN "Address",
DROP COLUMN "DOB",
DROP COLUMN "Designation",
DROP COLUMN "Gender",
DROP COLUMN "Image",
DROP COLUMN "Mobile",
DROP COLUMN "UserId",
DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "designation" TEXT,
ADD COLUMN     "dob" TIMESTAMP(3),
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "mobile" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Profile_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "public"."Profile"("userId");

-- AddForeignKey
ALTER TABLE "public"."Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
