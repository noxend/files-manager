CREATE TABLE IF NOT EXISTS `users_roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `user_name` VARCHAR(255) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `users_role_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC) VISIBLE,
  INDEX `fk_User_Role1_idx` (`users_role_id` ASC) VISIBLE,
  CONSTRAINT `fk_User_Role1`
    FOREIGN KEY (`users_role_id`)
    REFERENCES `users_roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `folders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `folder_name` VARCHAR(45) NOT NULL,
  `parent_folder_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_Folder_Folder1_idx` (`parent_folder_id` ASC) VISIBLE,
  CONSTRAINT `fk_Folder_Folder1`
    FOREIGN KEY (`parent_folder_id`)
    REFERENCES `folders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `files` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `file_name` VARCHAR(45) NOT NULL,
  `file_path` VARCHAR(45) NOT NULL,
  `file_size` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `users_files_access` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `users_files` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `file_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `access_id` INT NOT NULL,
  `folder_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_UsersFile_File1_idx` (`file_id` ASC) VISIBLE,
  INDEX `fk_UsersFile_User1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_UsersFile_Access1_idx` (`access_id` ASC) VISIBLE,
  INDEX `fk_UsersFile_Folder1_idx` (`folder_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_UsersFile_File1`
    FOREIGN KEY (`file_id`)
    REFERENCES `files` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_UsersFile_User1`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_UsersFile_Access1`
    FOREIGN KEY (`access_id`)
    REFERENCES `users_files_access` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_UsersFile_Folder1`
    FOREIGN KEY (`folder_id`)
    REFERENCES `folders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `shared_files_confirmation_link` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `hash` VARCHAR(255) NOT NULL,
  `is_confirmed` TINYINT NOT NULL,
  `users_file_id` INT NOT NULL,
  `expired_at` DATETIME NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_SharedFile_UsersFile1_idx` (`users_file_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_SharedFile_UsersFile1`
    FOREIGN KEY (`users_file_id`)
    REFERENCES `users_files` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;