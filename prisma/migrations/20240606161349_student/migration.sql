-- DropIndex
DROP INDEX `User_email_key` ON `User`;

-- AlterTable
ALTER TABLE `User` MODIFY `email` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Student` (
    `id` VARCHAR(191) NOT NULL,
    `studentname` VARCHAR(191) NOT NULL,
    `program` VARCHAR(191) NOT NULL,
    `universityno` VARCHAR(191) NOT NULL,
    `section` VARCHAR(191) NOT NULL,
    `mail` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Student_universityno_key`(`universityno`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
