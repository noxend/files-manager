ALTER TABLE `files` 
CHANGE COLUMN `original_name` `file_name` VARCHAR(255) NOT NULL ,
CHANGE COLUMN `file_name` `file_path` VARCHAR(255) NOT NULL ;