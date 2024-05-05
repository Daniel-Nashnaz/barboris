/*
  Warnings:

  - Made the column `appointment_id` on table `typesHaircuts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "typesHaircuts" ALTER COLUMN "appointment_id" SET NOT NULL;
