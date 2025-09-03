-- AlterTable
ALTER TABLE "public"."Profile" ADD COLUMN     "Address" TEXT,
ADD COLUMN     "DOB" TIMESTAMP(3),
ADD COLUMN     "Designation" TEXT,
ADD COLUMN     "FirstName" TEXT,
ADD COLUMN     "Gender" TEXT,
ADD COLUMN     "LastName" TEXT,
ADD COLUMN     "Mobile" TEXT,
ALTER COLUMN "Image" DROP NOT NULL;
