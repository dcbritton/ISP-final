-- MySQL's generated statements for my tables
-- Use used the MySQL workbench UI to make the tables rather than my own create statements

CREATE TABLE `blogs` (
  `blog_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `owner_name` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`blog_id`),
  KEY `owner_name` (`owner_name`),
  KEY `category_id` (`category`)
);


CREATE TABLE `post_likes` (
  `post_id` int NOT NULL,
  `owner_name` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`,`owner_name`),
  KEY `owner_name` (`owner_name`),
  CONSTRAINT `fk_post_likes` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE,
  CONSTRAINT `post_likes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
  CONSTRAINT `post_likes_ibfk_2` FOREIGN KEY (`owner_name`) REFERENCES `users` (`username`),
  CONSTRAINT `post_likes_ibfk_3` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE
);

CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`username`)
);
