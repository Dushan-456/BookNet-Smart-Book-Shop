-- DropForeignKey
ALTER TABLE "public"."Profile" DROP CONSTRAINT "Profile_UserId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Profile" ADD CONSTRAINT "Profile_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
