-- CreateTable
CREATE TABLE `Clienti` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ragioneSociale` VARCHAR(100) NULL,
    `nome` VARCHAR(191) NULL,
    `cognome` VARCHAR(191) NULL,
    `partitaIva` INTEGER NULL,
    `indirizzo` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `note` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FattureVendita` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero` INTEGER NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `pezzi` INTEGER NOT NULL,
    `iva` INTEGER NOT NULL,
    `listino` DOUBLE NOT NULL,
    `sconto` DOUBLE NULL,
    `totale` DOUBLE NOT NULL,
    `note` TEXT NULL,
    `clientiId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fornitori` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ragioneSociale` VARCHAR(100) NULL,
    `nome` VARCHAR(191) NULL,
    `cognome` VARCHAR(191) NULL,
    `partitaIva` INTEGER NULL,
    `indirizzo` VARCHAR(191) NOT NULL,
    `scontoFornitore` DOUBLE NULL,
    `telefono` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `note` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FattureAcquisti` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero` INTEGER NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `pezzi` INTEGER NOT NULL,
    `iva` INTEGER NOT NULL,
    `listino` DOUBLE NOT NULL,
    `sconto` DOUBLE NULL,
    `totale` DOUBLE NOT NULL,
    `note` TEXT NULL,
    `fornitoriId` INTEGER NULL,
    `pagamentoId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prodotti` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descrizione` TEXT NULL,
    `pezzi` INTEGER NOT NULL,
    `prezzoVendita` DOUBLE NOT NULL,
    `prezzoAcquisto` DOUBLE NOT NULL,
    `listino` DOUBLE NULL,
    `note` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pagamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `scadenza` VARCHAR(191) NOT NULL,
    `note` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FornitoriToProdotti` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FornitoriToProdotti_AB_unique`(`A`, `B`),
    INDEX `_FornitoriToProdotti_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FattureVendita` ADD CONSTRAINT `FattureVendita_clientiId_fkey` FOREIGN KEY (`clientiId`) REFERENCES `Clienti`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FattureAcquisti` ADD CONSTRAINT `FattureAcquisti_fornitoriId_fkey` FOREIGN KEY (`fornitoriId`) REFERENCES `Fornitori`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FattureAcquisti` ADD CONSTRAINT `FattureAcquisti_pagamentoId_fkey` FOREIGN KEY (`pagamentoId`) REFERENCES `Pagamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FornitoriToProdotti` ADD CONSTRAINT `_FornitoriToProdotti_A_fkey` FOREIGN KEY (`A`) REFERENCES `Fornitori`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FornitoriToProdotti` ADD CONSTRAINT `_FornitoriToProdotti_B_fkey` FOREIGN KEY (`B`) REFERENCES `Prodotti`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
