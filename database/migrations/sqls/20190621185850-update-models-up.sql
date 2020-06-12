ALTER TABLE `users_roles` 
CHANGE COLUMN `updated_at` `updated_at` DATETIME NULL,
DROP INDEX `id_UNIQUE`;

ALTER TABLE `users` 
CHANGE COLUMN `updated_at` `updated_at` DATETIME NULL,
DROP INDEX `id_UNIQUE`;

ALTER TABLE `folders` 
CHANGE COLUMN `updated_at` `updated_at` DATETIME NULL,
DROP INDEX `id_UNIQUE`;

ALTER TABLE `files` 
CHANGE COLUMN `updated_at` `updated_at` DATETIME NULL,
DROP INDEX `id_UNIQUE`;

ALTER TABLE `users_files_access` 
CHANGE COLUMN `updated_at` `updated_at` DATETIME NULL,
DROP INDEX `id_UNIQUE`;

ALTER TABLE `users_files` 
CHANGE COLUMN `updated_at` `updated_at` DATETIME NULL,
DROP INDEX `id_UNIQUE`;

ALTER TABLE `shared_files_confirmation_link` 
CHANGE COLUMN `updated_at` `updated_at` DATETIME NULL,
DROP INDEX `id_UNIQUE`;

