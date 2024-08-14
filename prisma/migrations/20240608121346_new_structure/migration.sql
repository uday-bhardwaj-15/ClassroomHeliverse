/*
  Warnings:

  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `program` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `studentname` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `universityno` on the `Student` table. All the data in the column will be lost.
  - You are about to alter the column `section` on the `Student` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uNo]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `programId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uNo` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uNo` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_username_key` ON `User`;

-- AlterTable
ALTER TABLE `Student` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `program`,
    DROP COLUMN `studentname`,
    DROP COLUMN `universityno`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `programId` INTEGER NOT NULL,
    ADD COLUMN `uNo` VARCHAR(191) NOT NULL,
    MODIFY `section` ENUM('A', 'B', 'C') NOT NULL,
    ADD PRIMARY KEY (`uNo`);

-- AlterTable
ALTER TABLE `User` DROP COLUMN `emailVerified`,
    DROP COLUMN `username`,
    ADD COLUMN `uNo` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Program` (
    `pId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `specialization` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`pId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_uNo_key` ON `User`(`uNo`);
