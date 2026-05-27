-- Adatbázis létrehozása
CREATE DATABASE IF NOT EXISTS `webshop_db`
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Adatbázis kiválasztása
USE `webshop_db`;

-- USERS tábla
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(100) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

-- TRAVELS tábla
CREATE TABLE IF NOT EXISTS `products` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `img_url` VARCHAR(255),
    `price` DECIMAL(10, 2) NOT NULL,
    `stock` INT NOT NULL
) ENGINE=InnoDB;

-- USERS adatok beszúrása
INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin123'),
(2, 'testuser', 'test123');
