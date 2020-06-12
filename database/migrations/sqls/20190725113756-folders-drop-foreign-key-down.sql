ALTER TABLE `folders` 
DROP COLUMN `parent_folder_id`;

ALTER TABLE `folders` 
ADD COLUMN `parent_folder_id` INT NOT NULL AFTER `folder_name`;

ALTER TABLE `folders` 
ADD INDEX `fk_Folder_Folder1_idx` (`parent_folder_id` ASC) VISIBLE;

ALTER TABLE `folders` 
ADD CONSTRAINT `fk_Folder_Folder1`
  FOREIGN KEY (`parent_folder_id`)
  REFERENCES `folders` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
