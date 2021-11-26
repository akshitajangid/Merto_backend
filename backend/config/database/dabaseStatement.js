exports.databaseSetupStatements = (
  "CREATE TABLE IF NOT EXISTS `category` (\
    `id` int(11) NOT NULL AUTO_INCREMENT,\
    `parent_id` int(11) DEFAULT 0,\
    `name` varchar(255) NOT NULL,\
    `icon` varchar(255) NOT NULL,\
    `icon_base64` text NOT NULL,\
    `createdAt` datetime NOT NULL DEFAULT current_timestamp(),\
    `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),\
    PRIMARY KEY (`id`)\
   );\
   CREATE TABLE IF NOT EXISTS `content` (\
    `id` int(11) NOT NULL AUTO_INCREMENT,\
    `title` text DEFAULT NULL,\
    `slug` varchar(45) DEFAULT NULL,\
    `content` text DEFAULT NULL,\
    `createdAt` datetime DEFAULT current_timestamp(),\
    `updatedAt` datetime DEFAULT current_timestamp(),\
    PRIMARY KEY (`id`)\
   );\
   CREATE TABLE IF NOT EXISTS `help` (\
    `id` int(11) NOT NULL AUTO_INCREMENT,\
    `question` varchar(255) NOT NULL,\
    `answer` text NOT NULL,\
    `createdAt` datetime NOT NULL DEFAULT current_timestamp(),\
    `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),\
    PRIMARY KEY (`id`)\
   );\
   CREATE TABLE IF NOT EXISTS `form` (\
    `id` int(11) NOT NULL AUTO_INCREMENT,\
    `category_id` int(111) NOT NULL,\
    `name` varchar(255) NOT NULL,\
    `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,\
    PRIMARY KEY (`id`),\
    KEY `FK_form_category_id` (`category_id`),\
    CONSTRAINT `FK_form_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE\
   );\
   CREATE TABLE IF NOT EXISTS `input_table` (\
    `id` int(11) NOT NULL AUTO_INCREMENT,\
    `form_id` int(11) NOT NULL,\
    `type` varchar(255) DEFAULT NULL,\
    `label` varchar(255) DEFAULT NULL,\
    `hint` varchar(255) DEFAULT NULL,\
    `maxLength` varchar(255) DEFAULT NULL,\
    `minLength` varchar(255) DEFAULT NULL,\
    PRIMARY KEY (`id`),\
    KEY `FK_input_form_id` (`form_id`),\
    CONSTRAINT `FK_input_form_id` FOREIGN KEY (`form_id`) REFERENCES `form` (`id`) ON DELETE CASCADE ON UPDATE CASCADE\
   );\
   CREATE TABLE IF NOT EXISTS `options` (\
    `id` int(11) NOT NULL AUTO_INCREMENT,\
    `input_id` int(11) NOT NULL,\
    `title` varchar(255) NOT NULL,\
    `value` varchar(255) NOT NULL,\
    PRIMARY KEY (`id`),\
    KEY `FK_options_input_id` (`input_id`),\
    CONSTRAINT `FK_options_input_id` FOREIGN KEY (`input_id`) REFERENCES `input_table` (`id`) ON DELETE CASCADE ON UPDATE CASCADE\
   );\
   CREATE TABLE IF NOT EXISTS `users` (\
    `id` int(11) NOT NULL AUTO_INCREMENT,\
    `socialId` varchar(45) DEFAULT NULL,\
    `name` varchar(65) DEFAULT NULL,\
    `email` varchar(65) DEFAULT NULL,\
    `password` varchar(255) NOT NULL,\
    `profile` varchar(255) DEFAULT NULL,\
    `authType` tinyint(1) DEFAULT NULL COMMENT '1 for facebook 2 for gmail 3 for normal(email)',\
    `isVerified` tinyint(1) DEFAULT 0 COMMENT '1 for verified 0 for not verified',\
    `isActive` tinyint(1) DEFAULT 1 COMMENT '1 for active 0 for active',\
    `otp` int(11) DEFAULT NULL,\
    `otp_expired` varchar(255) DEFAULT NULL,\
    `device_type` tinyint(4) NOT NULL,\
    `device_token` varchar(255) NOT NULL,\
    `createdAt` datetime DEFAULT current_timestamp(),\
    `updatedAt` datetime DEFAULT current_timestamp(),\
    PRIMARY KEY (`id`)\
   );\
   	CREATE TABLE IF NOT EXISTS `admin` (\
    `id` int(11) NOT NULL AUTO_INCREMENT,\
    `name` varchar(255) NOT NULL,\
    `email` varchar(255) NOT NULL,\
    `password` varchar(255) NOT NULL,\
    `profile` varchar(255) NOT NULL,\
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),\
    PRIMARY KEY (`id`)\
   );\
   CREATE TABLE IF NOT EXISTS `form_input_type` (\
    `id` int(11) NOT NULL AUTO_INCREMENT,\
    `type` varchar(255) NOT NULL,\
    `name` varchar(255) NOT NULL,\
    `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,\
    PRIMARY KEY (`id`)\
   );"
);

