-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 04, 2021 at 12:01 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `assetmanagement`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `ActivityId` int(11) NOT NULL,
  `AssetId` int(11) NOT NULL,
  `EmployeeId` int(11) NOT NULL,
  `ActivityType` int(11) NOT NULL,
  `AssetName` varchar(255) NOT NULL,
  `EmployeeName` varchar(255) NOT NULL,
  `ActivityTime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`ActivityId`, `AssetId`, `EmployeeId`, `ActivityType`, `AssetName`, `EmployeeName`, `ActivityTime`) VALUES
(4, 71, 4, 1, 'Dell XPS 13', 'anas sikder', '2021-10-31 23:10:42'),
(5, 105, 4, 1, 'Bashundhara Facial Tissue', 'anas sikder', '2021-10-31 23:10:42'),
(7, 71, 4, 2, 'Dell XPS 13', 'anas sikder', '2021-10-31 23:17:43'),
(8, 105, 4, 2, 'Bashundhara Facial Tissue', 'anas sikder', '2021-10-31 23:17:43'),
(10, 71, 4, 1, 'Dell XPS 13', 'anas sikder', '2021-10-31 23:18:40'),
(11, 105, 4, 1, 'Bashundhara Facial Tissue', 'anas sikder', '2021-10-31 23:18:40'),
(13, 72, 2, 1, 'Apple MacBook Pro (13-inch, M1)', 'super', '2021-10-31 23:36:49'),
(14, 72, 2, 2, 'Apple MacBook Pro (13-inch, M1)', 'super', '2021-10-31 23:38:09'),
(15, 72, 2, 1, 'Apple MacBook Pro (13-inch, M1)', 'super', '2021-10-31 23:38:41'),
(16, 72, 2, 2, 'Apple MacBook Pro (13-inch, M1)', 'super', '2021-10-31 23:40:31'),
(17, 72, 2, 1, 'Apple MacBook Pro (13-inch, M1)', 'super', '2021-10-31 23:40:43'),
(18, 72, 2, 2, 'Apple MacBook Pro (13-inch, M1)', 'super', '2021-10-31 23:45:02'),
(19, 72, 2, 1, 'Apple MacBook Pro (13-inch, M1)', 'super', '2021-10-31 23:45:16'),
(20, 72, 2, 2, 'Apple MacBook Pro (13-inch, M1)', 'super', '2021-10-31 23:50:52'),
(21, 72, 2, 2, 'Apple MacBook Pro (13-inch, M1)', 'super', '2021-10-31 23:52:41'),
(22, 72, 2, 1, 'Apple MacBook Pro (13-inch, M1)', 'super', '2021-10-31 23:52:52'),
(23, 72, 2, 2, 'Apple MacBook Pro (13-inch, M1)', 'super', '2021-10-31 23:55:54'),
(24, 72, 2, 1, 'Apple MacBook Pro (13-inch, M1)', 'super', '2021-10-31 23:57:57'),
(25, 72, 2, 2, 'Apple MacBook Pro (13-inch, M1)', 'super', '2021-10-31 23:59:59'),
(32, 95, 5, 1, 'Razer Huntsman v2 Analog', 'maruf', '2021-11-01 10:53:37'),
(43, 109, 2, 1, 'ispahani', 'super', '2021-11-04 08:49:47'),
(44, 109, 2, 1, 'ispahani', 'super', '2021-11-04 08:50:09'),
(45, 109, 2, 1, 'ispahani', 'super', '2021-11-04 08:50:25'),
(46, 109, 2, 1, 'ispahani', 'super', '2021-11-04 08:50:28'),
(47, 109, 2, 1, 'ispahani', 'super', '2021-11-04 08:50:32'),
(48, 109, 2, 1, 'ispahani', 'super', '2021-11-04 08:50:35'),
(49, 109, 2, 1, 'ispahani', 'super', '2021-11-04 08:50:40'),
(50, 109, 2, 1, 'ispahani', 'super', '2021-11-04 08:50:48'),
(51, 109, 2, 1, 'ispahani', 'super', '2021-11-04 08:50:52'),
(52, 109, 2, 1, 'ispahani', 'super', '2021-11-04 08:50:55'),
(53, 109, 2, 1, 'ispahani', 'super', '2021-11-04 08:51:02'),
(54, 109, 2, 1, 'ispahani', 'super', '2021-11-04 08:51:04'),
(55, 109, 2, 1, 'ispahani', 'super', '2021-11-04 08:51:07'),
(56, 72, 2, 1, 'Apple MacBook Pro (13-inch, M1)', 'super', '2021-11-04 08:52:38'),
(57, 109, 2, 1, 'ispahani', 'super', '2021-11-04 08:57:16'),
(58, 109, 2, 1, 'ispahani', 'super', '2021-11-04 08:57:38'),
(59, 109, 2, 1, 'ispahani', 'super', '2021-11-04 08:58:40'),
(60, 73, 2, 1, 'Acer Swift 3 (Late 2021)', 'super', '2021-11-04 08:58:56'),
(61, 109, 2, 1, 'ispahani', 'super', '2021-11-04 08:58:59'),
(62, 109, 2, 1, 'ispahani', 'super', '2021-11-04 08:59:02'),
(63, 109, 2, 1, 'ispahani', 'super', '2021-11-04 09:03:00'),
(64, 109, 2, 1, 'ispahani', 'super', '2021-11-04 09:03:51'),
(65, 109, 2, 1, 'ispahani', 'ultraxBd', '2021-11-04 09:08:59'),
(66, 109, 2, 1, 'ispahani', 'ultraxBd', '2021-11-04 12:44:45'),
(67, 74, 2, 1, 'Acer Swift 3 (Late 2021)', 'super', '2021-11-04 12:52:44'),
(68, 75, 2, 1, '7. Asus Zenbook 13 (UX325) OLED', 'super', '2021-11-04 12:52:53');

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

CREATE TABLE `assets` (
  `CategoryId` int(11) NOT NULL,
  `CategoryName` varchar(50) NOT NULL,
  `AssetQuantity` int(11) NOT NULL,
  `WarningQuantity` int(11) NOT NULL,
  `IsIdentifiable` int(1) NOT NULL DEFAULT 1,
  `AssetUsed` int(11) NOT NULL,
  `WarningFlag` tinyint(1) NOT NULL DEFAULT 0,
  `AssetExpired` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assets`
--

INSERT INTO `assets` (`CategoryId`, `CategoryName`, `AssetQuantity`, `WarningQuantity`, `IsIdentifiable`, `AssetUsed`, `WarningFlag`, `AssetExpired`) VALUES
(1, 'laptop', 5, 5, 1, 5, 1, 0),
(3, 'Tissue Box', 8, 10, 0, 5, 1, 0),
(4, 'Tea Bag', 10, 10, 2, 1, 1, 22),
(5, 'Mouse', 10, 5, 1, 0, 0, 0),
(6, 'Key Board', 9, 5, 1, 1, 0, 0),
(7, 'Micro Oven', 1, 0, 2, 1, 0, 0),
(8, 'Note Book', 30, 10, 0, 0, 0, 0),
(9, 'Air Freshener', 5, 2, 2, 2, 0, 0),
(10, 'Pen', 29, 15, 0, 1, 0, 0),
(11, 'Pencil', 29, 15, 0, 0, 0, 0),
(12, 'Toilet Tissue', 0, 5, 2, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `asset_details`
--

CREATE TABLE `asset_details` (
  `AssetId` int(11) NOT NULL,
  `AssetName` varchar(50) NOT NULL,
  `EmployeeId` int(50) DEFAULT NULL,
  `CategoryId` int(11) NOT NULL,
  `UsageStart` datetime DEFAULT NULL,
  `UsageEnd` datetime DEFAULT NULL,
  `IsOkay` tinyint(1) NOT NULL DEFAULT 1,
  `Comments` varchar(50) NOT NULL,
  `AssetDetails` varchar(50) NOT NULL,
  `IsAvailable` tinyint(1) NOT NULL DEFAULT 1,
  `UsedQuantity` int(11) NOT NULL DEFAULT 0,
  `Request` int(11) NOT NULL DEFAULT 0,
  `MonthlyAssetCheck` tinyint(1) NOT NULL DEFAULT 0,
  `Ram` varchar(50) DEFAULT NULL,
  `Hdd` varchar(50) DEFAULT NULL,
  `Ssd` varchar(50) DEFAULT NULL,
  `Cpu` varchar(50) DEFAULT NULL,
  `SerialNumber` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `asset_details`
--

INSERT INTO `asset_details` (`AssetId`, `AssetName`, `EmployeeId`, `CategoryId`, `UsageStart`, `UsageEnd`, `IsOkay`, `Comments`, `AssetDetails`, `IsAvailable`, `UsedQuantity`, `Request`, `MonthlyAssetCheck`, `Ram`, `Hdd`, `Ssd`, `Cpu`, `SerialNumber`) VALUES
(71, 'Dell XPS 13', 4, 1, '2021-10-31 23:18:40', NULL, 0, '+Attractive, premium chassis ,Great performance ,G', 'CPU: Intel Core i7-1165G7GPU: Intel Iris Xe Graphi', 0, 1, 0, 1, NULL, NULL, NULL, NULL, NULL),
(72, 'Apple MacBook Pro (13-inch, M1)', 2, 1, '2021-11-04 08:52:38', NULL, 0, 'Stellar overall and gaming performance, Excellent ', 'CPU: Apple M1GPU: Apple M1 GPURAM: 16GBStorage: 1T', 0, 1, 0, 1, NULL, NULL, NULL, NULL, NULL),
(73, 'Acer Swift 3 (Late 2021)', 2, 1, '2021-11-04 08:58:56', NULL, 1, 'Herculean performance', 'CPU: Intel Core i7-1165G7GPU: Integrated Intel Iri', 0, 1, 0, 1, NULL, NULL, NULL, NULL, NULL),
(74, 'Acer Swift 3 (Late 2021)', 2, 1, '2021-11-04 12:52:44', NULL, 1, 'Herculean performance', 'CPU: Intel Core i7-1165G7GPU: Integrated Intel Iri', 0, 1, 0, 1, NULL, NULL, NULL, NULL, NULL),
(75, '7. Asus Zenbook 13 (UX325) OLED', 2, 1, '2021-11-04 12:52:53', NULL, 1, 'Compact, slim and durable chassis', 'CPU: Intel Core i7-1165G7GPU: Intel Iris Xe Graphi', 0, 1, 0, 1, NULL, NULL, NULL, NULL, NULL),
(76, 'HP Envy 13 (2021)', NULL, 1, NULL, NULL, 1, 'Core i5 CPU is speedy +11+ hours of battery life', 'CPU: Intel Core i5-1135G7GPU: Iris Xe GraphicsRAM:', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(77, 'Microsoft Surface Laptop Studio', NULL, 1, NULL, NULL, 1, 'Clever hinge enables new modes', 'CPU:: Intel Core i7-11370HGPU:: Nvidia RTX 3050 Ti', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(78, 'Lenovo ThinkPad X1 Yoga (Gen 6)', NULL, 1, NULL, NULL, 1, 'CPU: Intel Core i7-1165G7GPU: Intel Iris Xe graphi', 'Speedy performance', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(79, 'Asus ROG Zephyrus G15', NULL, 1, NULL, NULL, 1, 'CPU: AMD Ryzen 9 5900HSGPU: Nvidia GeForce RTX 308', 'Elegant Moonlight White design', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(80, 'Samsung Galaxy Book Flex 15', NULL, 1, NULL, NULL, 1, 'QLED display', ' CPU: Intel Core i7-1065G7GPU: Nvidia GeForce MX25', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(81, 'MATEDOR PEN', NULL, 10, NULL, NULL, 1, 'black pen', '', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(82, 'favour castell pencil', NULL, 11, NULL, NULL, 1, 'grey pencil', '', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(83, 'Minimalism Art Premium Hard Cover Notebook', NULL, 8, NULL, NULL, 1, 'for note purpose', '', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(84, 'Bashundhara Facial Tissue', NULL, 3, NULL, NULL, 1, 'personal use', '', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(85, 'Logitech MX Master 3', NULL, 5, NULL, NULL, 1, 'DPI: 4,000Interface: Bluetooth and 2.4GHz wireless', 'Comfortable design', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(86, 'Logitech MX Anywhere 3', NULL, 5, NULL, NULL, 1, 'Electromagnetic scroll wheel', 'DPI: 4,000Interface: Bluetooth and 2.4GHz wireless', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(87, 'Microsoft Classic IntelliMouse', NULL, 5, NULL, NULL, 1, 'Solid design ,Responsive', 'DPI: 3200Interface: WiredButtons: 5Ergonomic: Righ', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(88, 'Microsoft Surface Mouse', NULL, 5, NULL, NULL, 1, 'Metal scroll wheel', 'DPI: 1000Interface: Bluetooth (BlueTrack)Buttons: ', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(89, 'Anker Vertical Ergonomic Optical Mouse', NULL, 5, NULL, NULL, 1, 'Cheap as chips', 'DPI: 1000Interface: USBButtons: 5Ergonomic: Vertic', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(90, 'Logitech MX Ergo Wireless', NULL, 5, '2021-11-01 09:54:16', '2021-11-01 11:14:22', 1, 'Comfortable design', 'DPI: 512 – 2048Interface: Bluetooth and 2.4GHz wir', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(91, 'Logitech Pebble', NULL, 5, NULL, NULL, 1, 'Plug-and-play', 'DPI: 1000Interface: 2.4 GHz wireless connectivity;', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(92, 'Microsoft Bluetooth Mobile Mouse 3600', NULL, 5, NULL, NULL, 1, 'Really, really cheap', 'DPI: 1000Interface: BluetoothButtons: 2Ergonomic: ', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(93, 'Razer DeathAdder Chroma', NULL, 5, NULL, NULL, 1, 'Very accurate', 'DPI: 10,000Interface: USBButtons: 5Ergonomic: Righ', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(94, 'Razer Basilisk V3', NULL, 5, NULL, NULL, 1, 'any well-placed, programmable buttons', 'ensor: Razer Focus+DPI: Up to 20,000 native (26,00', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(95, 'Razer Huntsman v2 Analog', 5, 6, '2021-11-01 10:53:37', NULL, 1, 'Fully customizable key actuation', 'nterface: WiredKeyboard backlighting: YesSwitches:', 0, 1, 0, 1, NULL, NULL, NULL, NULL, NULL),
(96, 'Roccat Vulkan TKL Pro', NULL, 6, NULL, NULL, 1, 'Fast and accurate performance', 'Interface: WiredKeyboard backlighting: YesProgramm', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(97, 'Mountain Everest Max', NULL, 6, NULL, NULL, 1, 'Creative media deck and macro pad', 'Interface: WiredKeyboard backlighting: YesProgramm', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(98, 'Corsair K95 RGB Platinum', NULL, 6, NULL, NULL, 1, 'Handy media and shortcut keys', 'nterface: WiredKeyboard backlighting: YesProgramma', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(99, 'Razer Huntsman Tournament Edition', NULL, 6, NULL, NULL, 1, 'Fast optical switches', 'Interface: Wired, wirelessKeyboard backlighting: Y', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(100, 'Logitech G915 TKL Lightspeed', NULL, 6, NULL, NULL, 1, 'Amazing tactile feedback and typing experience', 'Interface: WirelessKeyboard backlighting: YesProgr', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(101, 'Corsair K65 Mini', NULL, 6, NULL, NULL, 1, 'Hyper responsive keystrokes with up to 8,000Hz pol', 'Interface : WiredKeyboard backlighting: YesProgram', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(102, 'SteelSeries Apex 3', NULL, 6, NULL, NULL, 1, 'Affordable but has impressive features', 'Interface: WiredKeyboard backlighting: YesProgramm', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(103, 'HyperX Alloy Origins 60', NULL, 6, NULL, NULL, 1, 'HyperX Red switches are speedy and responsive', 'Interface: WiredKeyboard backlighting: YesSwitches', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(104, 'SteelSeries Apex Pro', NULL, 6, NULL, NULL, 1, 'Custom actuation settings', 'Interface: WiredKeyboard backlighting: YesProgramm', 1, 0, 0, 0, NULL, NULL, NULL, NULL, NULL),
(105, 'Bashundhara Facial Tissue', 4, 3, '2021-10-31 22:06:49', '2021-10-31 22:08:38', 1, 'personal use', '', 1, 5, 3, 0, NULL, NULL, NULL, NULL, NULL),
(108, 'MATEDOR PEN', 2, 10, '2021-11-01 10:19:26', NULL, 1, 'black pen', '', 1, 1, 0, 0, NULL, NULL, NULL, NULL, NULL),
(109, 'ispahani', 0, 4, '2021-11-04 12:44:45', NULL, 1, 'good taste', '', 1, 2, 0, 0, NULL, NULL, NULL, NULL, NULL),
(110, 'Bashundhara Facial Tissue', 2, 3, '2021-11-04 11:43:06', NULL, 1, 'personal use', '', 1, 3, 0, 0, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `HistoryId` int(11) NOT NULL,
  `HistoryDate` date NOT NULL DEFAULT current_timestamp(),
  `CategoryId` int(11) NOT NULL,
  `CategoryName` varchar(50) NOT NULL,
  `AssetExpired` int(11) NOT NULL,
  `AssetUsed` int(11) NOT NULL,
  `AssetQuantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`HistoryId`, `HistoryDate`, `CategoryId`, `CategoryName`, `AssetExpired`, `AssetUsed`, `AssetQuantity`) VALUES
(1, '2021-11-01', 11, 'Pencil', 0, 0, 30),
(2, '2021-11-01', 1, 'laptop', 0, 1, 9),
(3, '2021-11-01', 12, 'Toilet Tissue', 0, 0, 0),
(4, '2021-11-01', 5, 'Mouse', 0, 0, 10),
(5, '2021-11-01', 3, 'Tissue Box', 0, 2, 26),
(6, '2021-11-01', 7, 'Micro Oven', 0, 1, 1),
(7, '2021-11-01', 8, 'Note Book', 0, 0, 30),
(8, '2021-11-01', 9, 'Air Freshener', 0, 2, 5),
(9, '2021-11-01', 10, 'Pen', 0, 0, 30),
(10, '2021-11-01', 4, 'Tea Bag', 0, 1, 2),
(11, '2021-11-01', 6, 'Key Board', 0, 0, 10),
(12, '2021-11-03', 11, 'Pencil', 1, 0, 29),
(13, '2021-11-03', 3, 'Tissue Box', 1, 2, 25),
(14, '2021-11-03', 1, 'laptop', 0, 1, 9),
(15, '2021-11-03', 4, 'Tea Bag', 0, 1, 2),
(16, '2021-11-03', 5, 'Mouse', 0, 0, 10),
(17, '2021-11-03', 6, 'Key Board', 0, 1, 9),
(18, '2021-11-03', 7, 'Micro Oven', 0, 1, 1),
(19, '2021-11-03', 8, 'Note Book', 0, 0, 30),
(20, '2021-11-03', 9, 'Air Freshener', 0, 2, 5),
(21, '2021-11-03', 10, 'Pen', 0, 1, 29),
(22, '2021-11-03', 12, 'Toilet Tissue', 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `NotificationId` int(11) NOT NULL,
  `NotificationType` int(11) NOT NULL,
  `NotificationTime` datetime NOT NULL,
  `SeenFlag` tinyint(4) NOT NULL DEFAULT 0,
  `EmployeeId` int(11) DEFAULT NULL,
  `EmployeeName` varchar(50) DEFAULT NULL,
  `AssetId` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`NotificationId`, `NotificationType`, `NotificationTime`, `SeenFlag`, `EmployeeId`, `EmployeeName`, `AssetId`, `Name`) VALUES
(5, 0, '2021-11-04 11:43:06', 1, 2, NULL, 84, ''),
(6, 2, '2021-11-04 12:44:46', 0, 2, NULL, 109, ''),
(7, 0, '2021-11-04 12:52:53', 1, 2, NULL, 75, ''),
(8, 1, '2021-11-04 14:23:54', 0, 2, NULL, 72, '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `EmployeeId` int(11) NOT NULL,
  `EmployeeName` varchar(50) DEFAULT NULL,
  `EmployeePassword` varchar(50) NOT NULL,
  `EmployeeEmail` varchar(50) NOT NULL,
  `EmployeeFullName` varchar(50) NOT NULL,
  `EmployeeBatchId` varchar(20) NOT NULL,
  `EmployeeIsAdmin` int(11) NOT NULL DEFAULT 0,
  `EmployeeNumber` varchar(11) DEFAULT NULL,
  `EmployeeAddress` varchar(50) NOT NULL,
  `CheckInFlag` tinyint(1) NOT NULL DEFAULT 0,
  `ConfirmFlag` tinyint(1) NOT NULL DEFAULT 0,
  `ResetHistoryFlag` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`EmployeeId`, `EmployeeName`, `EmployeePassword`, `EmployeeEmail`, `EmployeeFullName`, `EmployeeBatchId`, `EmployeeIsAdmin`, `EmployeeNumber`, `EmployeeAddress`, `CheckInFlag`, `ConfirmFlag`, `ResetHistoryFlag`) VALUES
(0, 'ultraxBd', 'ultraxBd', 'ultraxBd@uxd.co.jp', 'ultraxBd-user', '', 0, NULL, '', 0, 0, 0),
(1, 'siam', '1234', 'siam@uxd.co.jp', 'Fahim Siam', '202109', 0, '1872627888', 'OLD DHAKA', 0, 0, 1),
(2, 'super', 'super', 'superadmin@uxd.co.jp', 'super admin', '20190101', 2, '123456789', '123cadsad', 1, 1, 1),
(3, 'admin', 'admin', 'admin@uxd.co.jp', 'admin san', '20190101', 1, '123454657', 'sda a233', 0, 0, 1),
(4, 'anas sikder', '123456', 'anas@uxd.co.jp', 'Anas Sikder Jim', '202109', 0, '01980851587', 'mirpur 2 ,Rupnagar,Dhaka 1216', 1, 1, 1),
(5, 'maruf', '123456', 'maruf@uxd.co.jp', 'Md. Maruf Hasan Shakil', '202109', 0, '1568483616', 'baridhara', 1, 0, 1),
(6, 'arif', '56789', 'arif@uxd.co.jp', 'Arif Ur Rahman', '202109', 0, '1680728065', 'Badda', 0, 0, 1),
(63, 'nafis', '12345', 'nafis@uxd.co.jp', 'Nafis', '202101', 0, '01703260888', 'badda', 0, 0, 1),
(77, 'shezan', '123456', 'shezan@gmail.com', '', '', 0, '', '', 0, 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`ActivityId`),
  ADD KEY `AssetId` (`AssetId`),
  ADD KEY `EmployeeId` (`EmployeeId`);

--
-- Indexes for table `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`CategoryId`);

--
-- Indexes for table `asset_details`
--
ALTER TABLE `asset_details`
  ADD PRIMARY KEY (`AssetId`),
  ADD KEY `EmployeeId` (`EmployeeId`),
  ADD KEY `CategoryId` (`CategoryId`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`HistoryId`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`NotificationId`),
  ADD KEY `EmployeeId Relation` (`EmployeeId`),
  ADD KEY `AssetId Relation` (`AssetId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`EmployeeId`),
  ADD UNIQUE KEY `EmployeeEmail` (`EmployeeEmail`),
  ADD UNIQUE KEY `EmployeeNumber` (`EmployeeNumber`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `ActivityId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `assets`
--
ALTER TABLE `assets`
  MODIFY `CategoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `asset_details`
--
ALTER TABLE `asset_details`
  MODIFY `AssetId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `HistoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `NotificationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `EmployeeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`AssetId`) REFERENCES `asset_details` (`AssetId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `activity_ibfk_2` FOREIGN KEY (`EmployeeId`) REFERENCES `users` (`EmployeeId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `asset_details`
--
ALTER TABLE `asset_details`
  ADD CONSTRAINT `EmployeeId` FOREIGN KEY (`EmployeeId`) REFERENCES `users` (`EmployeeId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `asset_details_ibfk_1` FOREIGN KEY (`CategoryId`) REFERENCES `assets` (`CategoryId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `AssetId Relation` FOREIGN KEY (`AssetId`) REFERENCES `asset_details` (`AssetId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `EmployeeId Relation` FOREIGN KEY (`EmployeeId`) REFERENCES `users` (`EmployeeId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
