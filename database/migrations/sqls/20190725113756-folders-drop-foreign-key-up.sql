ALTER TABLE `folders` 
DROP FOREIGN KEY `fk_Folder_Folder1`;
ALTER TABLE `folders` 
DROP COLUMN `parent_folder_id`,
DROP INDEX `fk_Folder_Folder1_idx`;

ALTER TABLE `folders` 
ADD COLUMN `parent_folder_id` INT NULL AFTER `updated_at`;
