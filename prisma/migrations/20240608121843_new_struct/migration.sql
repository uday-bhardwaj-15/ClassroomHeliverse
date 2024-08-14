/*
  Warnings:

  - Added the required column `course` to the `Program` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Program` ADD COLUMN `course` VARCHAR(191) NOT NULL;
