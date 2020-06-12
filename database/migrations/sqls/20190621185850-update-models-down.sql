ALTER TABLE `users_roles`
CHANGE COLUMN `updated_at` `updated_at` DATETIME NOT NULL,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE;

ALTER TABLE `users`
CHANGE COLUMN `updated_at` `updated_at` DATETIME NOT NULL,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE;

ALTER TABLE `folders`
CHANGE COLUMN `updated_at` `updated_at` DATETIME NOT NULL,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE;

ALTER TABLE `files`
CHANGE COLUMN `updated_at` `updated_at` DATETIME NOT NULL,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE;

ALTER TABLE `users_files_access`
CHANGE COLUMN `updated_at` `updated_at` DATETIME NOT NULL,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE;

ALTER TABLE `users_files`
CHANGE COLUMN `updated_at` `updated_at` DATETIME NOT NULL,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE;

ALTER TABLE `shared_files_confirmation_link`
CHANGE COLUMN `updated_at` `updated_at` DATETIME NOT NULL,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE;