-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 25, 2021 at 05:17 AM
-- Server version: 8.0.26-0ubuntu0.20.04.2
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `merto`
--

-- --------------------------------------------------------

--
-- Table structure for table `merto_tbl_app_content`
--

CREATE TABLE `merto_tbl_app_content` (
  `id` int NOT NULL,
  `about_us` text NOT NULL,
  `terms` text NOT NULL,
  `privacy` text NOT NULL,
  `creted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `merto_tbl_bet`
--

CREATE TABLE `merto_tbl_bet` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `leadge_id` varchar(255) NOT NULL,
  `team1_id` varchar(255) NOT NULL,
  `team2_id` varchar(255) NOT NULL,
  `bet_name` varchar(255) NOT NULL,
  `slip_no` varchar(255) NOT NULL,
  `timestamp` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `merto_tbl_contact`
--

CREATE TABLE `merto_tbl_contact` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `merto_tbl_fav_competition`
--

CREATE TABLE `merto_tbl_fav_competition` (
  `id` int NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `competition_id` varchar(255) NOT NULL,
  `timestamp` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `merto_tbl_fav_leagues`
--

CREATE TABLE `merto_tbl_fav_leagues` (
  `id` int NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `leagues_id` varchar(255) NOT NULL,
  `timestamp` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `merto_tbl_fav_team`
--

CREATE TABLE `merto_tbl_fav_team` (
  `id` int NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `team_id` varchar(255) NOT NULL,
  `timestamp` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `merto_tbl_follow_teams`
--

CREATE TABLE `merto_tbl_follow_teams` (
  `id` int NOT NULL,
  `team_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `timestamp` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `merto_tbl_help`
--

CREATE TABLE `merto_tbl_help` (
  `id` int NOT NULL,
  `queston` varchar(255) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `merto_tbl_league`
--

CREATE TABLE `merto_tbl_league` (
  `ai` int NOT NULL,
  `@id` varchar(255) DEFAULT NULL,
  `@country` varchar(255) DEFAULT NULL,
  `@name` varchar(255) DEFAULT NULL,
  `@season` varchar(255) DEFAULT NULL,
  `@date_start` varchar(255) DEFAULT NULL,
  `@date_end` varchar(255) DEFAULT NULL,
  `@iscup` varchar(255) DEFAULT NULL,
  `@live_lineups` varchar(255) DEFAULT NULL,
  `@live_stats` varchar(255) DEFAULT NULL,
  `@path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `merto_tbl_live_match_data`
--

CREATE TABLE `merto_tbl_live_match_data` (
  `auto_id` int NOT NULL,
  `@date` varchar(255) DEFAULT NULL,
  `@formatted_date` varchar(255) DEFAULT NULL,
  `localteam_id` varchar(255) DEFAULT NULL,
  `vistiorteam_id` varchar(255) DEFAULT NULL,
  `json` longtext,
  `live_score_id` varchar(255) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `merto_tbl_live_score`
--

CREATE TABLE `merto_tbl_live_score` (
  `auto_id` int NOT NULL,
  `@sport` varchar(255) DEFAULT NULL,
  `@updated` varchar(255) DEFAULT NULL,
  `@name` varchar(255) DEFAULT NULL,
  `@gid` varchar(255) DEFAULT NULL,
  `@id` varchar(255) DEFAULT NULL,
  `@file_group` varchar(255) DEFAULT NULL,
  `@iscup` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `merto_tbl_match_setting`
--

CREATE TABLE `merto_tbl_match_setting` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `show_postponed_match` enum('0','1') NOT NULL,
  `poll` enum('0','1') NOT NULL,
  `off_the_woodwork` enum('0','1') NOT NULL,
  `injuries` enum('0','1') NOT NULL,
  `substitutions` enum('0','1') NOT NULL,
  `penalties` enum('0','1') NOT NULL,
  `yellow_cards` enum('0','1') NOT NULL,
  `red_cards` enum('0','1') NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `merto_tbl_notification_setting`
--

CREATE TABLE `merto_tbl_notification_setting` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `match_reminder` enum('0','1') NOT NULL,
  `lineup` enum('0','1') NOT NULL,
  `match_start` enum('0','1') NOT NULL,
  `goals` enum('0','1') NOT NULL,
  `video_highlights` enum('0','1') NOT NULL,
  `red_card` enum('0','1') NOT NULL,
  `half_time_result` enum('0','1') NOT NULL,
  `full_time_result` enum('0','1') NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `merto_tbl_player`
--

CREATE TABLE `merto_tbl_player` (
  `ai` int NOT NULL,
  `id` varchar(255) NOT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `lname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `image` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `position` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `team` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `team_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `merto_tbl_team`
--

CREATE TABLE `merto_tbl_team` (
  `ai` int NOT NULL,
  `id` varchar(255) DEFAULT NULL,
  `is_national_team` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `venue_name` varchar(255) DEFAULT NULL,
  `venue_id` varchar(255) DEFAULT NULL,
  `venue_image` longtext,
  `image` longtext,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `merto_tbl_users`
--

CREATE TABLE `merto_tbl_users` (
  `user_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `device_type` varchar(255) NOT NULL,
  `device_token` varchar(255) NOT NULL,
  `social_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `language` varchar(255) NOT NULL,
  `login_type` varchar(255) NOT NULL,
  `active_time` varchar(255) NOT NULL,
  `otp` int DEFAULT NULL,
  `otp_expire_time` varchar(255) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `merto_tbl_app_content`
--
ALTER TABLE `merto_tbl_app_content`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `merto_tbl_bet`
--
ALTER TABLE `merto_tbl_bet`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `merto_tbl_contact`
--
ALTER TABLE `merto_tbl_contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `merto_tbl_fav_competition`
--
ALTER TABLE `merto_tbl_fav_competition`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `merto_tbl_fav_leagues`
--
ALTER TABLE `merto_tbl_fav_leagues`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `merto_tbl_fav_team`
--
ALTER TABLE `merto_tbl_fav_team`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `merto_tbl_follow_teams`
--
ALTER TABLE `merto_tbl_follow_teams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `merto_tbl_help`
--
ALTER TABLE `merto_tbl_help`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `merto_tbl_league`
--
ALTER TABLE `merto_tbl_league`
  ADD PRIMARY KEY (`ai`);

--
-- Indexes for table `merto_tbl_live_match_data`
--
ALTER TABLE `merto_tbl_live_match_data`
  ADD PRIMARY KEY (`auto_id`);

--
-- Indexes for table `merto_tbl_live_score`
--
ALTER TABLE `merto_tbl_live_score`
  ADD PRIMARY KEY (`auto_id`);

--
-- Indexes for table `merto_tbl_match_setting`
--
ALTER TABLE `merto_tbl_match_setting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `merto_tbl_notification_setting`
--
ALTER TABLE `merto_tbl_notification_setting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `merto_tbl_player`
--
ALTER TABLE `merto_tbl_player`
  ADD PRIMARY KEY (`ai`);

--
-- Indexes for table `merto_tbl_team`
--
ALTER TABLE `merto_tbl_team`
  ADD PRIMARY KEY (`ai`);

--
-- Indexes for table `merto_tbl_users`
--
ALTER TABLE `merto_tbl_users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `merto_tbl_app_content`
--
ALTER TABLE `merto_tbl_app_content`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `merto_tbl_bet`
--
ALTER TABLE `merto_tbl_bet`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `merto_tbl_contact`
--
ALTER TABLE `merto_tbl_contact`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `merto_tbl_fav_competition`
--
ALTER TABLE `merto_tbl_fav_competition`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `merto_tbl_fav_leagues`
--
ALTER TABLE `merto_tbl_fav_leagues`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `merto_tbl_fav_team`
--
ALTER TABLE `merto_tbl_fav_team`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `merto_tbl_follow_teams`
--
ALTER TABLE `merto_tbl_follow_teams`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `merto_tbl_help`
--
ALTER TABLE `merto_tbl_help`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `merto_tbl_league`
--
ALTER TABLE `merto_tbl_league`
  MODIFY `ai` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `merto_tbl_live_match_data`
--
ALTER TABLE `merto_tbl_live_match_data`
  MODIFY `auto_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `merto_tbl_live_score`
--
ALTER TABLE `merto_tbl_live_score`
  MODIFY `auto_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `merto_tbl_match_setting`
--
ALTER TABLE `merto_tbl_match_setting`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `merto_tbl_notification_setting`
--
ALTER TABLE `merto_tbl_notification_setting`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `merto_tbl_player`
--
ALTER TABLE `merto_tbl_player`
  MODIFY `ai` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `merto_tbl_team`
--
ALTER TABLE `merto_tbl_team`
  MODIFY `ai` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `merto_tbl_users`
--
ALTER TABLE `merto_tbl_users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
