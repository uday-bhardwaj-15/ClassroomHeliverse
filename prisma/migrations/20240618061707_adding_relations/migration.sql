/*
  Warnings:

  - A unique constraint covering the columns `[programId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Student_programId_key` ON `Student`(`programId`);

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `Program`(`pId`) ON DELETE RESTRICT ON UPDATE CASCADE;
