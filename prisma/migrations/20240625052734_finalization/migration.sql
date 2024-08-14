/*
  Warnings:

  - You are about to drop the column `subject` on the `Classes` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `Classes` table. All the data in the column will be lost.
  - You are about to drop the column `classId` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uNo]` on the table `Attendence` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subjectId]` on the table `Classes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Attendence` ADD COLUMN `date` VARCHAR(191) NULL,
    MODIFY `classId` INTEGER NULL,
    ALTER COLUMN `Status` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Classes` DROP COLUMN `subject`,
    DROP COLUMN `teacherId`,
    MODIFY `subjectId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Student` DROP COLUMN `classId`,
    ADD COLUMN `cId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Subject` ADD COLUMN `teacherId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Attendence_uNo_key` ON `Attendence`(`uNo`);

-- CreateIndex
CREATE UNIQUE INDEX `Classes_subjectId_key` ON `Classes`(`subjectId`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_cId_key` ON `Student`(`cId`);

-- AddForeignKey
ALTER TABLE `Attendence` ADD CONSTRAINT `Attendence_uNo_fkey` FOREIGN KEY (`uNo`) REFERENCES `Student`(`uNo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Classes` ADD CONSTRAINT `Classes_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Student`(`cId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Classes`(`subjectId`) ON DELETE RESTRICT ON UPDATE CASCADE;
