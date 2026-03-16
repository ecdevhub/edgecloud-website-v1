-- EdgeCloud Blog — Initial Schema
-- mysql -u root -p edgecloud_blog < db/migrations/0001_init.sql

CREATE DATABASE IF NOT EXISTS `edgecloud_blog`
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `edgecloud_blog`;

CREATE TABLE IF NOT EXISTS `authors` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `bio` TEXT,
  `avatar` VARCHAR(500),
  `role` ENUM('admin','editor','author') NOT NULL DEFAULT 'author',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(120) NOT NULL UNIQUE,
  `description` TEXT,
  `color` VARCHAR(20) DEFAULT '#00A2FF',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `tags` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(80) NOT NULL,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `posts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(300) NOT NULL,
  `slug` VARCHAR(340) NOT NULL UNIQUE,
  `excerpt` TEXT,
  `content` TEXT NOT NULL,
  `content_html` MEDIUMTEXT,
  `featured_image` VARCHAR(600),
  `featured_image_alt` VARCHAR(300),
  `meta_title` VARCHAR(160),
  `meta_description` VARCHAR(320),
  `canonical_url` VARCHAR(600),
  `og_image` VARCHAR(600),
  `no_index` BOOLEAN DEFAULT FALSE,
  `author_id` INT NOT NULL,
  `category_id` INT,
  `status` ENUM('draft','published','archived') NOT NULL DEFAULT 'draft',
  `published_at` TIMESTAMP NULL,
  `scheduled_at` TIMESTAMP NULL,
  `view_count` INT NOT NULL DEFAULT 0,
  `reading_time` INT DEFAULT 0,
  `is_featured` BOOLEAN DEFAULT FALSE,
  `allow_comments` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE INDEX `posts_slug_idx` (`slug`),
  INDEX `posts_status_idx` (`status`),
  FULLTEXT INDEX `posts_search_idx` (`title`, `excerpt`),
  FOREIGN KEY (`author_id`) REFERENCES `authors`(`id`),
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `post_tags` (
  `post_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`post_id`, `tag_id`),
  FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `post_views` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `post_id` INT NOT NULL,
  `ip` VARCHAR(60),
  `user_agent` VARCHAR(500),
  `referer` VARCHAR(600),
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `post_views_post_idx` (`post_id`),
  FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `comments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `post_id` INT NOT NULL,
  `parent_id` INT,
  `author_name` VARCHAR(120) NOT NULL,
  `author_email` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `status` ENUM('pending','approved','spam') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `media` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `filename` VARCHAR(300) NOT NULL,
  `original_name` VARCHAR(300),
  `url` VARCHAR(600) NOT NULL,
  `mime_type` VARCHAR(100),
  `size` INT,
  `width` INT,
  `height` INT,
  `alt` VARCHAR(300),
  `uploaded_by` INT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`uploaded_by`) REFERENCES `authors`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `settings` (
  `key` VARCHAR(120) PRIMARY KEY,
  `value` TEXT,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed
INSERT IGNORE INTO `categories` (`name`, `slug`, `color`) VALUES
  ('Compliance','compliance','#00A2FF'),('Engineering','engineering','#00C9A7'),
  ('Cloud','cloud','#7C3AED'),('MarTech','martech','#F59E0B'),
  ('Finance','finance','#059669'),('Product News','product-news','#DC2626');

INSERT IGNORE INTO `tags` (`name`, `slug`) VALUES
  ('DPA','dpa'),('M-Pesa','mpesa'),('WooCommerce','woocommerce'),
  ('Kubernetes','kubernetes'),('SACCO','sacco'),('Email Marketing','email-marketing'),
  ('Kenya','kenya'),('East Africa','east-africa'),('Data Protection','data-protection');

INSERT IGNORE INTO `settings` (`key`, `value`) VALUES
  ('blog_title','EdgeCloud Resources'),
  ('blog_description','Practical guides for Kenya''s digital builders'),
  ('posts_per_page','9'),('allow_comments','true'),('comment_moderation','true');
