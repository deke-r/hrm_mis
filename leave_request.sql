-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 27, 2024 at 06:13 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hrm_2`
--

-- --------------------------------------------------------

--
-- Table structure for table `leave_request`
--

CREATE TABLE `work_from_home_request` (
  `request_id` int(55) NOT NULL,
  `candidate_id` int(55) NOT NULL,
  `candidate_name` varchar(55) NOT NULL,
  `candidate_mail` varchar(110) NOT NULL,
  `from_date` date DEFAULT NULL,
  `to_date` date DEFAULT NULL,
  `multi_date` varchar(255) DEFAULT NULL,
  `no_of_days` int(11) DEFAULT NULL,
  `leave_type` varchar(100) NOT NULL,
  `day_type` varchar(55) DEFAULT NULL,
  `half_day_type` varchar(55) DEFAULT NULL,
  `mail_to` varchar(100) NOT NULL,
  `mail_cc` varchar(100) NOT NULL,
  `attachment` varchar(100) DEFAULT NULL,
  `reason_for_leave` varchar(255) NOT NULL,
  `status` varchar(55) NOT NULL,
  `leave_req_sent_date` datetime DEFAULT NULL,
  `accept_reject_date` datetime DEFAULT NULL,
  `remarks` varchar(110) NOT NULL,
  `accept_reject_by` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leave_request`
--

INSERT INTO `work_from_home_request` (`request_id`, `candidate_id`, `candidate_name`, `candidate_mail`, `from_date`, `to_date`, `multi_date`, `no_of_days`, `leave_type`, `day_type`, `half_day_type`, `mail_to`, `mail_cc`, `attachment`, `reason_for_leave`, `status`, `leave_req_sent_date`, `accept_reject_date`, `remarks`, `accept_reject_by`) VALUES
(145, 1067, 'Bhavishya Chauhan', 'bhavishya.chauhan@manthanitsolutions.in', '2024-06-22', '2024-06-22', '', 1, 'Emergency leave', 'Half day', 'Second half', 'narender@manthanitsolutions.in	', '', NULL, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, dolor incidunt quia, doloremque fuga provident facere amet dicta rerum consectetur, deserunt adipisci eum facilis illum pariatur. Iste natus laborum expedita?Lorem, ipsum dolor sit amet cons', 'pending', '2024-06-22 06:18:50', NULL, '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `leave_request`
--
ALTER TABLE `work_from_home_request`
  ADD PRIMARY KEY (`request_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `leave_request`
--
ALTER TABLE `work_from_home_request`
  MODIFY `request_id` int(55) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
