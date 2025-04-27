-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 09. 09:45
-- Kiszolgáló verziója: 10.4.27-MariaDB
-- PHP verzió: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

DROP DATABASE IF EXISTS szepsegeden;

CREATE DATABASE szepsegeden CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `szepsegeden`;

CREATE TABLE `days` (
  `daynumber` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `worker_id` int(11) NOT NULL,
  `guest_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `datetime` date NOT NULL,
  `appointment` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `duration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `passwd_hash` blob NOT NULL,
  `passwd_salt` blob NOT NULL,
  `surname` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `phonenumber` varchar(20) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

CREATE TABLE `userservices` (
  `user_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

CREATE TABLE `workinghours` (
  `user_id` int(11) NOT NULL,
  `daynumber` int(11) NOT NULL,
  `opening_time` varchar(10) NOT NULL,
  `closing_time` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

ALTER TABLE `days`
  ADD PRIMARY KEY (`daynumber`);

ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `workerid` (`worker_id`),
  ADD KEY `guestid` (`guest_id`),
  ADD KEY `serviceid` (`service_id`);

ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `service`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roleid` (`role_id`);

ALTER TABLE `userservices`
  ADD KEY `userid_userservices` (`user_id`),
  ADD KEY `serviceid_service` (`service_id`);

ALTER TABLE `workinghours`
  ADD KEY `userid_user` (`user_id`),
  ADD KEY `daynumber` (`daynumber`);

ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `reservation`
  ADD CONSTRAINT `guestid` FOREIGN KEY (`guest_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `serviceid` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`),
  ADD CONSTRAINT `workerid` FOREIGN KEY (`worker_id`) REFERENCES `user` (`id`);

ALTER TABLE `user`
  ADD CONSTRAINT `roleid` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);

ALTER TABLE `userservices`
  ADD CONSTRAINT `serviceid_service` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`),
  ADD CONSTRAINT `userid_userservices` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `workinghours`
  ADD CONSTRAINT `daynumber` FOREIGN KEY (`daynumber`) REFERENCES `days` (`daynumber`),
  ADD CONSTRAINT `userid_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

COMMIT;
