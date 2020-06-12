ALTER TABLE `files` 
CHANGE COLUMN `file_name` `file_name` VARCHAR(255) NOT NULL ,
CHANGE COLUMN `file_path` `file_path` VARCHAR(255) NOT NULL ,
CHANGE COLUMN `file_size` `file_size` INT NOT NULL ;
