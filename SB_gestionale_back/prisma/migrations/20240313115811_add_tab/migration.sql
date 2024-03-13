-- AlterTable
ALTER TABLE `fattureacquisti` MODIFY `data` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `fatturevendita` ADD COLUMN `pagamentoId` INTEGER NULL,
    MODIFY `data` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `prodotti` ADD COLUMN `immagine` VARCHAR(191) NULL,
    MODIFY `prezzoVendita` DOUBLE NULL,
    MODIFY `prezzoAcquisto` DOUBLE NULL;

-- CreateTable
CREATE TABLE `_ClientiToProdotti` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ClientiToProdotti_AB_unique`(`A`, `B`),
    INDEX `_ClientiToProdotti_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FattureVendita` ADD CONSTRAINT `FattureVendita_pagamentoId_fkey` FOREIGN KEY (`pagamentoId`) REFERENCES `Pagamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClientiToProdotti` ADD CONSTRAINT `_ClientiToProdotti_A_fkey` FOREIGN KEY (`A`) REFERENCES `Clienti`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClientiToProdotti` ADD CONSTRAINT `_ClientiToProdotti_B_fkey` FOREIGN KEY (`B`) REFERENCES `Prodotti`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
