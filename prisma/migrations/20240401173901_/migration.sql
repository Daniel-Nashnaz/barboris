/*
  Warnings:

  - Made the column `name` on table `barbers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `barbers` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "customers_name_key";

-- AlterTable
ALTER TABLE "barbers" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "barbershops" ALTER COLUMN "phone_number" DROP NOT NULL;

-- CreateTable
CREATE TABLE "typesHaircuts" (
    "id" SERIAL NOT NULL,
    "appointment_id" INTEGER,
    "type_haircut" SMALLINT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "typesHaircuts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "typesHaircuts" ADD CONSTRAINT "typesHaircuts_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
