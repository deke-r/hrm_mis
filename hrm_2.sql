-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 26, 2024 at 01:54 PM
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
-- Table structure for table `announcement`
--

CREATE TABLE `announcement` (
  `announcement_id` int(110) NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `announcement` varchar(500) NOT NULL,
  `date_of_add` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcement`
--

INSERT INTO `announcement` (`announcement_id`, `from_date`, `to_date`, `announcement`, `date_of_add`) VALUES
(3, '2024-06-26', '2024-06-28', 'we will conduct a meeting on  2pm today every be ready', '2024-06-26 10:23:47'),
(5, '2024-06-26', '2024-06-26', 'everyone will need to present on main office at 4pm', '2024-06-26 11:12:36');

-- --------------------------------------------------------

--
-- Table structure for table `arn_template`
--

CREATE TABLE `arn_template` (
  `arn_template_id` int(11) NOT NULL,
  `candidate_id` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `place` varchar(50) DEFAULT NULL,
  `signature` tinytext DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `pdf` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `asset_report`
--

CREATE TABLE `asset_report` (
  `report_id` int(11) NOT NULL,
  `candidate_id` int(10) NOT NULL,
  `asset_serial_no` varchar(100) NOT NULL,
  `current_date_time` varchar(20) NOT NULL,
  `problem` varchar(200) NOT NULL,
  `exp_problem` varchar(299) NOT NULL,
  `image` varchar(155) DEFAULT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `assign_interview`
--

CREATE TABLE `assign_interview` (
  `ID` bigint(20) NOT NULL,
  `r_id` int(11) NOT NULL,
  `level` varchar(50) DEFAULT NULL,
  `jdid` varchar(20) DEFAULT NULL,
  `Emp_Name` varchar(40) DEFAULT NULL,
  `Interview_Date` datetime DEFAULT NULL,
  `Candidate_Name` varchar(40) DEFAULT NULL,
  `Mode_of_Interview` varchar(30) DEFAULT NULL,
  `meeting_link` text DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `remarks` varchar(100) DEFAULT NULL,
  `candidate_mobile` varchar(20) DEFAULT NULL,
  `candidate_email` varchar(50) DEFAULT NULL,
  `source_of_profile` varchar(30) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `resume` varchar(100) DEFAULT NULL,
  `score` varchar(100) DEFAULT NULL,
  `assign_by` varchar(100) DEFAULT NULL,
  `assign_dt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `candidate`
--

CREATE TABLE `candidate` (
  `candidate_id` int(11) NOT NULL,
  `r_id` varchar(50) DEFAULT NULL,
  `jd_id` varchar(50) DEFAULT NULL,
  `candidate_name` varchar(50) DEFAULT NULL,
  `candidate_email` varchar(50) DEFAULT NULL,
  `candidate_mobile` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `candidate_login`
--

CREATE TABLE `candidate_login` (
  `candidate_id` int(11) NOT NULL,
  `jd_id` varchar(50) DEFAULT NULL,
  `candidate_name` varchar(150) DEFAULT NULL,
  `candidate_email` varchar(50) NOT NULL,
  `candidate_mobile` varchar(50) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `job_title` varchar(100) DEFAULT NULL,
  `division` varchar(100) DEFAULT NULL,
  `rep_manager_name` varchar(110) NOT NULL,
  `rep_manager_email` varchar(110) NOT NULL,
  `rep_senior_1_email` varchar(110) DEFAULT NULL,
  `rep_senior_2_email` varchar(110) DEFAULT NULL,
  `rep_senior_3_email` varchar(110) DEFAULT NULL,
  `rep_senior_4_email` varchar(110) DEFAULT NULL,
  `appointment_letter` varchar(255) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `date_of_joining` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `candidate_login`
--

INSERT INTO `candidate_login` (`candidate_id`, `jd_id`, `candidate_name`, `candidate_email`, `candidate_mobile`, `password`, `status`, `creation_date`, `location`, `job_title`, `division`, `rep_manager_name`, `rep_manager_email`, `rep_senior_1_email`, `rep_senior_2_email`, `rep_senior_3_email`, `rep_senior_4_email`, `appointment_letter`, `date_of_birth`, `date_of_joining`) VALUES
(1067, 'mis1067', 'Bhavishya Chauhan', 'bhavishya.chauhan@manthanitsolutions.in', '8825182077', '1234', 'Short Listed', NULL, NULL, NULL, NULL, 'Narendra Singh', 'bhavishya.chauhan@manthanitsolutions.in', 'santosh@manthanitsolutions.in', 'smscst@gmail.com', 'neha@manthanitsolutions.in', 'sunanda@manthanitsolutions.in', '', '2022-06-26', '2024-06-24'),
(1078, 'mis1078', 'Yogesh', 'yogesh@manthanitsolutions.in', '8825182077', '1234', 'Short Listed', NULL, NULL, NULL, NULL, 'Narendra Singh', 'bhavishya.chauhan@manthanitsolutions.in', 'santosh@manthanitsolutions.in', 'smscst@gmail.com', 'neha@manthanitsolutions.in', 'sunanda@manthanitsolutions.in', '', '2024-06-26', '2024-06-10');

-- --------------------------------------------------------

--
-- Table structure for table `candidate_personal_details`
--

CREATE TABLE `candidate_personal_details` (
  `candidate_id` int(100) DEFAULT NULL,
  `candidate_image` varchar(300) DEFAULT NULL,
  `candidate_firstname` varchar(150) DEFAULT NULL,
  `candidate_lastname` varchar(150) DEFAULT NULL,
  `communication_address` varchar(300) DEFAULT NULL,
  `permanent_address` varchar(300) DEFAULT NULL,
  `area_pincode` int(20) DEFAULT NULL,
  `mobile_no` varchar(60) DEFAULT NULL,
  `emergency_mobile_no` varchar(60) DEFAULT NULL,
  `telphone_no` varchar(60) DEFAULT NULL,
  `email_id` varchar(150) DEFAULT NULL,
  `date_of_birth` datetime DEFAULT NULL,
  `age` int(10) DEFAULT NULL,
  `gender` varchar(60) DEFAULT NULL,
  `marital_status` varchar(90) DEFAULT NULL,
  `spouse_name` varchar(150) DEFAULT NULL,
  `occupation` varchar(300) DEFAULT NULL,
  `blood_group` varchar(30) DEFAULT NULL,
  `relative_name` varchar(150) DEFAULT NULL,
  `relative_designation` varchar(150) DEFAULT NULL,
  `relative_relationship` varchar(150) DEFAULT NULL,
  `PDF` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `candidate_personal_details`
--

INSERT INTO `candidate_personal_details` (`candidate_id`, `candidate_image`, `candidate_firstname`, `candidate_lastname`, `communication_address`, `permanent_address`, `area_pincode`, `mobile_no`, `emergency_mobile_no`, `telphone_no`, `email_id`, `date_of_birth`, `age`, `gender`, `marital_status`, `spouse_name`, `occupation`, `blood_group`, `relative_name`, `relative_designation`, `relative_relationship`, `PDF`) VALUES
(2, 'outer and inner join.PNG', 'DEMO', 'DEMODEMO', 'jdfka', 'jdfka', 434343, '7897987878', '79879877', '79879879879', '798798797', '2024-05-05 00:00:00', 98, 'Male', 'Single', 'jflak', 'jflak', 'fjal', 'fjal', 'fjl', 'gajl', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `division_master`
--

CREATE TABLE `division_master` (
  `id` bigint(20) NOT NULL,
  `division_type` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `division_master`
--

INSERT INTO `division_master` (`id`, `division_type`) VALUES
(1, 'WWA'),
(2, 'WF'),
(3, 'PU'),
(4, 'MNT'),
(5, 'CC'),
(6, 'R&D'),
(7, 'B2B'),
(8, 'AGRI'),
(9, 'PAINT'),
(10, 'CORPORATE'),
(11, 'LATEX'),
(12, 'POLUMER');

-- --------------------------------------------------------

--
-- Table structure for table `employee_master`
--

CREATE TABLE `employee_master` (
  `id` bigint(20) NOT NULL,
  `EMPLID` varchar(10) DEFAULT NULL,
  `Emp_Name` varchar(200) DEFAULT NULL,
  `emp_email` varchar(155) NOT NULL,
  `COMPANY` varchar(100) DEFAULT NULL,
  `Comp_Name` varchar(100) DEFAULT NULL,
  `Vertical` varchar(10) DEFAULT NULL,
  `SubVertical` varchar(100) DEFAULT NULL,
  `POSITION` varchar(50) DEFAULT NULL,
  `Prefix` varchar(50) DEFAULT NULL,
  `FIRST_NAME` varchar(100) DEFAULT NULL,
  `MIDDLE_NAME` varchar(100) DEFAULT NULL,
  `LAST_NAME` varchar(100) DEFAULT NULL,
  `PAYROLL_STATUS` varchar(20) DEFAULT NULL,
  `BUSINESS_UNIT` varchar(10) DEFAULT NULL,
  `BU_Descr` varchar(100) DEFAULT NULL,
  `DEPTID` varchar(10) DEFAULT NULL,
  `Department` varchar(100) DEFAULT NULL,
  `CostCenterID` varchar(20) DEFAULT NULL,
  `EMP_FUNCTION` varchar(100) DEFAULT NULL,
  `SUB_FUNCTION` varchar(100) DEFAULT NULL,
  `BUSINESS` varchar(100) DEFAULT NULL,
  `PAYGROUP` varchar(20) DEFAULT NULL,
  `PAYGROUP_DESCR` varchar(50) DEFAULT NULL,
  `LOCATION_STATE` varchar(50) DEFAULT NULL,
  `LOCATION` varchar(50) DEFAULT NULL,
  `LOCATION_DESCR` varchar(50) DEFAULT NULL,
  `SEX` varchar(10) DEFAULT NULL,
  `BIRTHDATE` date DEFAULT NULL,
  `QUALIFICATION` varchar(200) DEFAULT NULL,
  `Prev_Exp` decimal(10,2) DEFAULT 0.00,
  `Jub_Exp` decimal(10,2) DEFAULT 0.00,
  `Tot_Exp` decimal(10,2) DEFAULT 0.00,
  `TERM_DATE` date DEFAULT NULL,
  `HIRE_DATE` date DEFAULT NULL,
  `Designation` varchar(200) DEFAULT NULL,
  `JOBCODE` varchar(20) DEFAULT NULL,
  `GRADE` varchar(20) DEFAULT NULL,
  `Supervisor_PositionID` varchar(20) DEFAULT NULL,
  `SUPERVISOR_ID` varchar(10) DEFAULT NULL,
  `SUPERVISOR_NAME` varchar(200) DEFAULT NULL,
  `Sup_EMAIL_ADDR` varchar(200) DEFAULT NULL,
  `Sup_EMAIL_Id_1` varchar(110) DEFAULT NULL,
  `Sup_EMAIL_Id_2` varchar(110) DEFAULT NULL,
  `Sup_EMAIL_Id_3` varchar(110) DEFAULT NULL,
  `Sup_EMAIL_Id_4` varchar(110) DEFAULT NULL,
  `L2_SUPERVISOR_ID` varchar(10) DEFAULT NULL,
  `L2_SUPRVISOR_NAME` varchar(200) DEFAULT NULL,
  `L2_POSITION_NBR` varchar(20) DEFAULT NULL,
  `L2_EMAIL` varchar(200) DEFAULT NULL,
  `Previous_EMPLOYER` varchar(100) DEFAULT NULL,
  `BLOOD_TYPE` varchar(10) DEFAULT NULL,
  `MAR_STATUS` varchar(10) DEFAULT NULL,
  `MARRIAGE_DATE` date DEFAULT NULL,
  `PAN` varchar(20) DEFAULT NULL,
  `EmpBUSSINESS_EMAILID` varchar(200) DEFAULT NULL,
  `EmpPersonal_EMAILID` varchar(200) DEFAULT NULL,
  `BUS_PHONE` varchar(20) DEFAULT NULL,
  `HOME_PHONE` varchar(20) DEFAULT NULL,
  `EMERG_CNTCT` varchar(20) DEFAULT NULL,
  `ADDRESS` varchar(200) DEFAULT NULL,
  `FATHER_NAME` varchar(200) DEFAULT NULL,
  `Password` varchar(20) DEFAULT '123456',
  `is_active` tinyint(1) DEFAULT 1,
  `creation_datetime` datetime DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `modifed_datetime` datetime DEFAULT NULL,
  `modified_by` varchar(50) DEFAULT NULL,
  `first_login_datetime` datetime DEFAULT NULL,
  `last_login_datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_master`
--

INSERT INTO `employee_master` (`id`, `EMPLID`, `Emp_Name`, `emp_email`, `COMPANY`, `Comp_Name`, `Vertical`, `SubVertical`, `POSITION`, `Prefix`, `FIRST_NAME`, `MIDDLE_NAME`, `LAST_NAME`, `PAYROLL_STATUS`, `BUSINESS_UNIT`, `BU_Descr`, `DEPTID`, `Department`, `CostCenterID`, `EMP_FUNCTION`, `SUB_FUNCTION`, `BUSINESS`, `PAYGROUP`, `PAYGROUP_DESCR`, `LOCATION_STATE`, `LOCATION`, `LOCATION_DESCR`, `SEX`, `BIRTHDATE`, `QUALIFICATION`, `Prev_Exp`, `Jub_Exp`, `Tot_Exp`, `TERM_DATE`, `HIRE_DATE`, `Designation`, `JOBCODE`, `GRADE`, `Supervisor_PositionID`, `SUPERVISOR_ID`, `SUPERVISOR_NAME`, `Sup_EMAIL_ADDR`, `Sup_EMAIL_Id_1`, `Sup_EMAIL_Id_2`, `Sup_EMAIL_Id_3`, `Sup_EMAIL_Id_4`, `L2_SUPERVISOR_ID`, `L2_SUPRVISOR_NAME`, `L2_POSITION_NBR`, `L2_EMAIL`, `Previous_EMPLOYER`, `BLOOD_TYPE`, `MAR_STATUS`, `MARRIAGE_DATE`, `PAN`, `EmpBUSSINESS_EMAILID`, `EmpPersonal_EMAILID`, `BUS_PHONE`, `HOME_PHONE`, `EMERG_CNTCT`, `ADDRESS`, `FATHER_NAME`, `Password`, `is_active`, `creation_datetime`, `created_by`, `modifed_datetime`, `modified_by`, `first_login_datetime`, `last_login_datetime`) VALUES
(6591, '16001234', 'Santosh Kumar', '\n\nsantosh@manthanitsolutions.in', 'C10', 'Jubilant Industries Limited', 'JIL', 'Industries', '80004699', 'Mr', 'FISRT NAME', 'MIDDLE NAME', 'LAST NAME', 'Active', '825', '825-CPD Adhesive - Trading', 'I75', 'I75 - CPD-FA-HO(CMN)', 'DM0400', 'Accounts / Finance', 'Accounts - CPD', 'CPD Business', 'C11', 'JACPL', 'Haryana', 'Gurugram', 'Gurugram', 'M', '1967-06-02', 'BCOM - 1988 - Chaudhary Charan Singh Unvrsty  12TH - 1985 -', 0.00, 34.69, 34.69, NULL, '1989-07-14', 'Commercial Head - CPD', '12A1', '12A', '80005030', '16008181', 'Sunanda Mam', 'sunanda@manthanitsolutions.in', 'smscst@gmail.com', NULL, NULL, NULL, '10015275', 'Priyavrat Bhartia', '80030436', 'bhavishya.manthanitsolutions@gmail.com', '', 'A+', 'M', '1989-07-14', '', 'pc.tanwar@jubl.com', 'sanma', '9810572304', '1294106907', '5765655676', 'DGFF', 'DDFGD', '123456', 1, '2024-04-12 06:59:58', '16008288 :Aman', NULL, NULL, NULL, NULL),
(6592, '16001235', 'Narender Singh', 'narender@manthanitsolutions.in	', 'C10', 'MANTHAN IT SOLUTIONS', 'JIL', 'Industries', '80004699', 'Mr', 'FISRT NAME', 'MIDDLE NAME', 'LAST NAME', 'Active', '825', '825-CPD Adhesive - Trading', 'I75', 'I75 - CPD-FA-HO(CMN)', 'DM0400', 'Accounts / Finance', 'Accounts - CPD', 'CPD Business', 'C11', 'JACPL', 'Haryana', 'Gurugram', 'Gurugram', 'M', '1967-06-02', 'BCOM - 1988 - Chaudhary Charan Singh Unvrsty  12TH - 1985 -', 0.00, 34.69, 34.69, NULL, '1989-07-14', 'Commercial Head - CPD', '12A1', '12A', '80005030', '16008181', 'Sunanda Mam', 'santosh@manthanitsolutions.in', 'sunanda@manthanitsolutions.in', 'smscst@gmail.com', NULL, NULL, '10015275', 'Priyavrat Bhartia', '80030436', 'Priyavrat.Bhartia@jubl.com', '', 'A+', 'M', '1989-07-14', '', 'pc.tanwar@jubl.com', 'sanma', '9810572304', '1294106907', '5765655676', 'DGFF', 'DDFGD', '1234', 1, '2024-04-12 06:59:58', '16008288 :Aman', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `forgot_candidate_pass`
--

CREATE TABLE `forgot_candidate_pass` (
  `id` int(11) NOT NULL,
  `candidate_id` varchar(255) NOT NULL,
  `otp` varchar(10) NOT NULL,
  `expiration_time` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hrm_user_login`
--

CREATE TABLE `hrm_user_login` (
  `ID` bigint(20) NOT NULL,
  `EMP_CODE` varchar(10) DEFAULT NULL,
  `EMP_NAME` varchar(50) DEFAULT NULL,
  `ROLE` varchar(15) DEFAULT NULL,
  `PASSWORD` varchar(30) DEFAULT NULL,
  `EMP_DESI` varchar(20) DEFAULT NULL,
  `EMP_Email_ID` varchar(50) DEFAULT NULL,
  `EMP_NUMBER` varchar(10) DEFAULT NULL,
  `EMP_VERTICAL` varchar(10) DEFAULT NULL,
  `REP_MANAGER_ID` varchar(10) DEFAULT NULL,
  `REP_MANAGER_NAME` varchar(50) DEFAULT NULL,
  `REP_MANAGER_Email_ID` varchar(50) DEFAULT NULL,
  `REP_MANAGER_MOBILE` varchar(20) DEFAULT NULL,
  `BRANCH` varchar(20) DEFAULT NULL,
  `ZONE` varchar(20) DEFAULT NULL,
  `STATUS` tinyint(1) DEFAULT 1,
  `F_LOGIN_DATE` datetime DEFAULT NULL,
  `L_LOGIN_DATE` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hrm_user_login`
--

INSERT INTO `hrm_user_login` (`ID`, `EMP_CODE`, `EMP_NAME`, `ROLE`, `PASSWORD`, `EMP_DESI`, `EMP_Email_ID`, `EMP_NUMBER`, `EMP_VERTICAL`, `REP_MANAGER_ID`, `REP_MANAGER_NAME`, `REP_MANAGER_Email_ID`, `REP_MANAGER_MOBILE`, `BRANCH`, `ZONE`, `STATUS`, `F_LOGIN_DATE`, `L_LOGIN_DATE`) VALUES
(38, '101', 'manveer sir', 'ADMIN', '1234', NULL, 'smscst@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2024-06-17 04:43:48', '2024-06-26 05:15:12');

-- --------------------------------------------------------

--
-- Table structure for table `interview_score`
--

CREATE TABLE `interview_score` (
  `id` bigint(20) NOT NULL,
  `r_id` varchar(100) DEFAULT NULL,
  `levels` varchar(10) DEFAULT NULL,
  `jd_id` varchar(100) DEFAULT NULL,
  `score_by` varchar(100) DEFAULT NULL,
  `score_dt` datetime DEFAULT NULL,
  `pdf_file` varchar(100) DEFAULT NULL,
  `total_score` varchar(100) DEFAULT NULL,
  `percentage` varchar(200) DEFAULT NULL,
  `manager_remarks` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jd_creation_master`
--

CREATE TABLE `jd_creation_master` (
  `prefix` varchar(5) NOT NULL DEFAULT 'MIS',
  `jd_id` bigint(20) UNSIGNED NOT NULL,
  `job_title` varchar(100) NOT NULL,
  `function` varchar(100) DEFAULT NULL,
  `business` varchar(100) DEFAULT NULL,
  `about_us` text DEFAULT NULL,
  `role_summary` text DEFAULT NULL,
  `role_nd_responsibilites` text DEFAULT NULL,
  `key_performance` text DEFAULT NULL,
  `education_qualification` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `creation_date` datetime DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `upload_sample` varchar(50) DEFAULT NULL,
  `jd_status` varchar(20) DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leave_request`
--

CREATE TABLE `leave_request` (
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

INSERT INTO `leave_request` (`request_id`, `candidate_id`, `candidate_name`, `candidate_mail`, `from_date`, `to_date`, `multi_date`, `no_of_days`, `leave_type`, `day_type`, `half_day_type`, `mail_to`, `mail_cc`, `attachment`, `reason_for_leave`, `status`, `leave_req_sent_date`, `accept_reject_date`, `remarks`, `accept_reject_by`) VALUES
(145, 1067, 'Bhavishya Chauhan', 'bhavishya.chauhan@manthanitsolutions.in', '2024-06-22', '2024-06-22', '', 1, 'Emergency leave', 'Half day', 'Second half', 'narender@manthanitsolutions.in	', '', NULL, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, dolor incidunt quia, doloremque fuga provident facere amet dicta rerum consectetur, deserunt adipisci eum facilis illum pariatur. Iste natus laborum expedita?Lorem, ipsum dolor sit amet cons', 'pending', '2024-06-22 06:18:50', NULL, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `manage_assets`
--

CREATE TABLE `manage_assets` (
  `asset_id` int(50) NOT NULL,
  `candidate_id` int(10) DEFAULT NULL,
  `asset_type` varchar(50) NOT NULL,
  `asset_brand` varchar(50) NOT NULL,
  `asset_serial_no` varchar(50) NOT NULL,
  `condition_at_assingnment` varchar(50) NOT NULL,
  `assigned_by` varchar(50) NOT NULL,
  `assigned_date` date NOT NULL,
  `img_1` varchar(100) DEFAULT NULL,
  `img_2` varchar(100) DEFAULT NULL,
  `img_3` varchar(100) DEFAULT NULL,
  `img_4` varchar(100) DEFAULT NULL,
  `img_5` varchar(100) DEFAULT NULL,
  `type` varchar(55) NOT NULL,
  `status` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recruitment_master`
--

CREATE TABLE `recruitment_master` (
  `r_id` bigint(20) NOT NULL,
  `jd_id` varchar(15) DEFAULT NULL,
  `location_state` varchar(100) DEFAULT NULL,
  `location_hq` varchar(100) DEFAULT NULL,
  `direct_reporting` varchar(100) DEFAULT NULL,
  `indirect_matrix` varchar(100) DEFAULT NULL,
  `division` varchar(100) DEFAULT NULL,
  `raised_by` varchar(100) DEFAULT NULL,
  `creation_datetime` datetime DEFAULT NULL,
  `jd_requirements` text DEFAULT NULL,
  `reference` varchar(255) DEFAULT '0',
  `level` varchar(50) DEFAULT NULL,
  `team_size` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `request_assets`
--

CREATE TABLE `request_assets` (
  `assets_req_id` int(200) NOT NULL,
  `assets_id` int(200) NOT NULL,
  `candidate_id` int(200) NOT NULL,
  `candidate_name` varchar(200) NOT NULL,
  `asset_type` varchar(200) NOT NULL,
  `mail_to` varchar(200) NOT NULL,
  `mail_cc` varchar(200) NOT NULL,
  `req_remarks` varchar(200) NOT NULL,
  `req_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(100) NOT NULL,
  `reject_remarks` varchar(500) NOT NULL,
  `req_resolved_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `request_assets`
--

INSERT INTO `request_assets` (`assets_req_id`, `assets_id`, `candidate_id`, `candidate_name`, `asset_type`, `mail_to`, `mail_cc`, `req_remarks`, `req_date`, `status`, `reject_remarks`, `req_resolved_date`) VALUES
(36, 68, 1067, 'Bhavishya Chauhan', 'Laptop', 'Vinay@manthanitsolutions.in', 'yogeshmanthanitsolution@gmail.com;ramkeshn311@gmail.com', 'fjakl', '2024-06-22 11:04:42', 'Resolved', '', '2024-06-22 16:57:21'),
(37, 0, 1067, 'Bhavishya Chauhan', 'Laptop', 'Vinay@manthanitsolutions.in', 'yogeshmanthanitsolution@gmail.com;ramkeshn311@gmail.com', 'jfkla', '2024-06-22 11:05:46', 'Rejected', 'Assets not available ', '2024-06-22 17:01:59'),
(38, 0, 1067, 'Bhavishya Chauhan', 'Mouse', 'Vinay@manthanitsolutions.in', 'yogeshmanthanitsolution@gmail.com;ramkeshn311@gmail.com', 'jfkajlafjlfjl', '2024-06-22 11:05:56', 'Open', '', '0000-00-00 00:00:00'),
(39, 69, 1067, 'Bhavishya Chauhan', 'Charger', 'Vinay@manthanitsolutions.in', 'yogeshmanthanitsolution@gmail.com;ramkeshn311@gmail.com', 'Reason demo', '2024-06-22 11:37:11', 'Resolved', '', '2024-06-22 17:09:42'),
(40, 0, 1067, 'Bhavishya Chauhan', 'Laptop', 'Vinay@manthanitsolutions.in', 'santosh@manthanitsolutions.in', 'kafjk', '2024-06-22 11:45:13', 'Open', '', '0000-00-00 00:00:00'),
(41, 0, 1067, 'Bhavishya Chauhan', 'Charger', 'Vinay@manthanitsolutions.in', 'yogeshmanthanitsolution@gmail.com;ramkeshn311@gmail.com', 'falkj', '2024-06-22 11:47:13', 'Open', '', '0000-00-00 00:00:00'),
(46, 0, 1067, 'Bhavishya Chauhan', 'Mobile', 'vinay@manthanitsolutions.in', 'yogeshmanthanitsolution@gmail.com;ramkeshn311@gmail.com', 'jfalk', '2024-06-24 06:11:55', 'Open', '', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `required_document`
--

CREATE TABLE `required_document` (
  `document_id` int(11) NOT NULL,
  `jd_id` varchar(50) DEFAULT NULL,
  `r_id` varchar(50) DEFAULT NULL,
  `sallery_slip` varchar(100) DEFAULT NULL,
  `appointment_letter` varchar(100) DEFAULT NULL,
  `bank_statement` varchar(100) DEFAULT NULL,
  `photo` varchar(100) DEFAULT NULL,
  `educational` varchar(100) DEFAULT NULL,
  `adhar_card` varchar(100) DEFAULT NULL,
  `pan_card` varchar(100) DEFAULT NULL,
  `UAN_card` varchar(100) DEFAULT NULL,
  `employment_application` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `resignation`
--

CREATE TABLE `resignation` (
  `resignation_id` int(11) NOT NULL,
  `candidate_id` int(11) DEFAULT NULL,
  `candidate_name` varchar(100) DEFAULT NULL,
  `candidate_mail` varchar(110) NOT NULL,
  `candidate_reason` text DEFAULT NULL,
  `candidate_attachment` varchar(255) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'open',
  `resignation_date` datetime NOT NULL DEFAULT current_timestamp(),
  `accept_reject_date` datetime NOT NULL,
  `accept_reject_by` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `resignation`
--

INSERT INTO `resignation` (`resignation_id`, `candidate_id`, `candidate_name`, `candidate_mail`, `candidate_reason`, `candidate_attachment`, `status`, `resignation_date`, `accept_reject_date`, `accept_reject_by`) VALUES
(3, 1067, 'Bhavishya Chauhan', '', 'demo11111111111', '500105_20240622_Manager Interview Score (16).pdf', 'Approved', '2024-06-22 15:20:15', '2024-06-25 00:00:00', '101:Yogesh'),
(4, 1067, 'Bhavishya Chauhan', '', 'demo', '584365_20240625_Manager Interview Score (14).pdf', 'Reject', '2024-06-25 14:15:15', '2024-06-26 00:00:00', '16001234:Santosh Kumar'),
(5, 1067, 'Bhavishya Chauhan', '', 'kjkjk', 'Screenshot 2024-06-18 124757.png', 'Reject', '2024-06-26 10:13:29', '2024-06-26 00:00:00', '101:manveer sir'),
(6, 1067, 'Bhavishya Chauhan', '', 'dfh', NULL, 'Reject', '2024-06-26 11:05:42', '2024-06-26 00:00:00', 'Santosh Kumar'),
(7, 1067, 'Bhavishya Chauhan', '', 'khkjh', NULL, 'Reject', '2024-06-26 11:15:31', '2024-06-26 00:00:00', 'Santosh Kumar'),
(8, 1067, 'Bhavishya Chauhan', 'bhavishya.chauhan@manthanitsolutions.in', 'kljkj', NULL, 'Reject', '2024-06-26 11:22:39', '2024-06-26 00:00:00', 'Santosh Kumar'),
(9, 1067, 'Bhavishya Chauhan', 'bhavishya.chauhan@manthanitsolutions.in', 'nkjnj', NULL, 'Reject', '2024-06-26 11:55:35', '2024-06-26 00:00:00', 'Santosh Kumar'),
(10, 1067, 'Bhavishya Chauhan', 'bhavishya.chauhan@manthanitsolutions.in', 'xcjvjkvh', NULL, 'Approved', '2024-06-26 11:58:46', '2024-06-26 00:00:00', 'manveer sir');

-- --------------------------------------------------------

--
-- Table structure for table `resignation_request`
--

CREATE TABLE `resignation_request` (
  `resignation_id` int(55) NOT NULL,
  `candidate_id` int(55) NOT NULL,
  `candidate_name` varchar(110) NOT NULL,
  `candidate_mail` varchar(110) NOT NULL,
  `reason` varchar(500) NOT NULL,
  `resignation_date` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `accepted/rejected_date` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcement`
--
ALTER TABLE `announcement`
  ADD PRIMARY KEY (`announcement_id`);

--
-- Indexes for table `arn_template`
--
ALTER TABLE `arn_template`
  ADD PRIMARY KEY (`arn_template_id`),
  ADD KEY `candidate_id` (`candidate_id`);

--
-- Indexes for table `asset_report`
--
ALTER TABLE `asset_report`
  ADD PRIMARY KEY (`report_id`);

--
-- Indexes for table `assign_interview`
--
ALTER TABLE `assign_interview`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `candidate`
--
ALTER TABLE `candidate`
  ADD PRIMARY KEY (`candidate_id`);

--
-- Indexes for table `candidate_login`
--
ALTER TABLE `candidate_login`
  ADD PRIMARY KEY (`candidate_id`);

--
-- Indexes for table `division_master`
--
ALTER TABLE `division_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_master`
--
ALTER TABLE `employee_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forgot_candidate_pass`
--
ALTER TABLE `forgot_candidate_pass`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hrm_user_login`
--
ALTER TABLE `hrm_user_login`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `interview_score`
--
ALTER TABLE `interview_score`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jd_creation_master`
--
ALTER TABLE `jd_creation_master`
  ADD PRIMARY KEY (`jd_id`),
  ADD UNIQUE KEY `jd_id` (`prefix`,`jd_id`);

--
-- Indexes for table `leave_request`
--
ALTER TABLE `leave_request`
  ADD PRIMARY KEY (`request_id`);

--
-- Indexes for table `manage_assets`
--
ALTER TABLE `manage_assets`
  ADD PRIMARY KEY (`asset_id`);

--
-- Indexes for table `recruitment_master`
--
ALTER TABLE `recruitment_master`
  ADD PRIMARY KEY (`r_id`);

--
-- Indexes for table `request_assets`
--
ALTER TABLE `request_assets`
  ADD PRIMARY KEY (`assets_req_id`);

--
-- Indexes for table `required_document`
--
ALTER TABLE `required_document`
  ADD PRIMARY KEY (`document_id`);

--
-- Indexes for table `resignation`
--
ALTER TABLE `resignation`
  ADD PRIMARY KEY (`resignation_id`),
  ADD KEY `candidate_id` (`candidate_id`);

--
-- Indexes for table `resignation_request`
--
ALTER TABLE `resignation_request`
  ADD PRIMARY KEY (`resignation_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcement`
--
ALTER TABLE `announcement`
  MODIFY `announcement_id` int(110) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `arn_template`
--
ALTER TABLE `arn_template`
  MODIFY `arn_template_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `asset_report`
--
ALTER TABLE `asset_report`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `assign_interview`
--
ALTER TABLE `assign_interview`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `candidate`
--
ALTER TABLE `candidate`
  MODIFY `candidate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `candidate_login`
--
ALTER TABLE `candidate_login`
  MODIFY `candidate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1079;

--
-- AUTO_INCREMENT for table `division_master`
--
ALTER TABLE `division_master`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `employee_master`
--
ALTER TABLE `employee_master`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6593;

--
-- AUTO_INCREMENT for table `forgot_candidate_pass`
--
ALTER TABLE `forgot_candidate_pass`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `hrm_user_login`
--
ALTER TABLE `hrm_user_login`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `interview_score`
--
ALTER TABLE `interview_score`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `jd_creation_master`
--
ALTER TABLE `jd_creation_master`
  MODIFY `jd_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1025;

--
-- AUTO_INCREMENT for table `leave_request`
--
ALTER TABLE `leave_request`
  MODIFY `request_id` int(55) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- AUTO_INCREMENT for table `manage_assets`
--
ALTER TABLE `manage_assets`
  MODIFY `asset_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `recruitment_master`
--
ALTER TABLE `recruitment_master`
  MODIFY `r_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=243;

--
-- AUTO_INCREMENT for table `request_assets`
--
ALTER TABLE `request_assets`
  MODIFY `assets_req_id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `required_document`
--
ALTER TABLE `required_document`
  MODIFY `document_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `resignation`
--
ALTER TABLE `resignation`
  MODIFY `resignation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `resignation_request`
--
ALTER TABLE `resignation_request`
  MODIFY `resignation_id` int(55) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `resignation`
--
ALTER TABLE `resignation`
  ADD CONSTRAINT `resignation_ibfk_1` FOREIGN KEY (`candidate_id`) REFERENCES `candidate_login` (`candidate_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
