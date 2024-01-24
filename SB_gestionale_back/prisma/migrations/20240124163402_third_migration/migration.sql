/*
  Warnings:

  - You are about to drop the column `cognome` on the `fornitori` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `fornitori` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `fornitori` DROP COLUMN `cognome`,
    DROP COLUMN `nome`,
    MODIFY `partitaIva` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `_FattureVenditaToProdotti` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FattureVenditaToProdotti_AB_unique`(`A`, `B`),
    INDEX `_FattureVenditaToProdotti_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FattureAcquistiToProdotti` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FattureAcquistiToProdotti_AB_unique`(`A`, `B`),
    INDEX `_FattureAcquistiToProdotti_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_FattureVenditaToProdotti` ADD CONSTRAINT `_FattureVenditaToProdotti_A_fkey` FOREIGN KEY (`A`) REFERENCES `FattureVendita`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FattureVenditaToProdotti` ADD CONSTRAINT `_FattureVenditaToProdotti_B_fkey` FOREIGN KEY (`B`) REFERENCES `Prodotti`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FattureAcquistiToProdotti` ADD CONSTRAINT `_FattureAcquistiToProdotti_A_fkey` FOREIGN KEY (`A`) REFERENCES `FattureAcquisti`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FattureAcquistiToProdotti` ADD CONSTRAINT `_FattureAcquistiToProdotti_B_fkey` FOREIGN KEY (`B`) REFERENCES `Prodotti`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
