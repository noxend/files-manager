ALTER TABLE `files` 
CHANGE COLUMN `file_name` `original_name` VARCHAR(255) NOT NULL ,
CHANGE COLUMN `file_path` `file_name` VARCHAR(255) NOT NULL ;