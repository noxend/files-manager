ALTER TABLE `files` 
CHANGE COLUMN `file_name` `file_name` VARCHAR(45) NOT NULL ,
CHANGE COLUMN `file_path` `file_path` VARCHAR(45) NOT NULL ,
CHANGE COLUMN `file_size` `file_size` VARCHAR(45) NOT NULL ;
