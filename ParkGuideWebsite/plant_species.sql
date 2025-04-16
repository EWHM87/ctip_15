-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 11, 2025 at 02:18 PM
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
-- Database: `plant_monitoring`
--

-- --------------------------------------------------------

--
-- Table structure for table `admininfo`
--

CREATE TABLE `admininfo` (
  `AdminID` int(11) NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `AdminCode` varchar(20) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admininfo`
--

INSERT INTO `admininfo` (`AdminID`, `Name`, `AdminCode`, `Phone`, `Status`) VALUES
(3, 'Mr. Chan', 'AD001', '0182222333', 'Active'),
(4, 'Ms. Goh', 'AD002', '0134444555', 'On Leave'),
(5, 'Linda Ooi', 'AD003', '0127896543', 'Active'),
(6, 'Michael Soo', 'AD004', '0171112233', 'Inactive'),
(7, 'Noraini Yusof', 'AD005', '0145566778', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `parkguide`
--

CREATE TABLE `parkguide` (
  `GuideID` int(11) NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `GuideCode` varchar(20) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parkguide`
--

INSERT INTO `parkguide` (`GuideID`, `Name`, `GuideCode`, `Phone`, `Address`) VALUES
(3, 'Sarah Lee', 'PG001', '0121111222', '123 Park Road'),
(4, 'Daniel Ng', 'PG002', '0173333444', '456 Forest Lane'),
(5, 'Joshua Tan', 'PG003', '0148765432', '89 Jungle Path'),
(6, 'Amanda Low', 'PG004', '0192233445', '67 Riverbank View'),
(7, 'Zack Chan', 'PG005', '0119988776', '12 Mountain Trail');

-- --------------------------------------------------------

--
-- Table structure for table `plant_species`
--

CREATE TABLE `plant_species` (
  `SpeciesID` int(11) NOT NULL,
  `ScientificName` varchar(100) DEFAULT NULL,
  `CommonName` varchar(100) DEFAULT NULL,
  `PlantType` varchar(50) DEFAULT NULL,
  `NativeHabitat` varchar(100) DEFAULT NULL,
  `ConservationStatus` varchar(50) DEFAULT NULL,
  `SensorID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plant_species`
--

INSERT INTO `plant_species` (`SpeciesID`, `ScientificName`, `CommonName`, `PlantType`, `NativeHabitat`, `ConservationStatus`, `SensorID`) VALUES
(1, 'Durio zibethinus', 'Durian', 'Tree', 'Pahang', 'Least Concern', 'S201'),
(2, 'Nephelium lappaceum', 'Rambutan', 'Tree', 'Johor', 'Least Concern', 'S202'),
(3, 'Mangifera indica', 'Mango', 'Tree', 'Selangor', 'Least Concern', 'S203'),
(4, 'Carica papaya', 'Papaya', 'Shrub', 'Perak', 'Least Concern', 'S204'),
(5, 'Musa acuminata', 'Banana', 'Herb', 'Sabah', 'Least Concern', 'S205'),
(6, 'Ananas comosus', 'Pineapple', 'Shrub', 'Sarawak', 'Least Concern', 'S206'),
(7, 'Cocos nucifera', 'Coconut', 'Tree', 'Terengganu', 'Least Concern', 'S207'),
(8, 'Manihot esculenta', 'Cassava', 'Shrub', 'Kelantan', 'Least Concern', 'S208'),
(9, 'Ipomoea batatas', 'Sweet Potato', 'Vine', 'Penang', 'Least Concern', 'S209'),
(10, 'Solanum lycopersicum', 'Tomato', 'Herb', 'Selangor', 'Least Concern', 'S210'),
(11, 'Capsicum annuum', 'Chili Pepper', 'Shrub', 'Sabah', 'Least Concern', 'S211'),
(12, 'Citrus microcarpa', 'Calamansi', 'Shrub', 'Melaka', 'Least Concern', 'S212'),
(13, 'Citrus hystrix', 'Kaffir Lime', 'Shrub', 'Negeri Sembilan', 'Least Concern', 'S213'),
(14, 'Pandanus amaryllifolius', 'Pandan', 'Shrub', 'Penang', 'Least Concern', 'S214'),
(15, 'Zingiber officinale', 'Ginger', 'Herb', 'Perlis', 'Least Concern', 'S215'),
(16, 'Curcuma longa', 'Turmeric', 'Herb', 'Pahang', 'Least Concern', 'S216'),
(17, 'Allium cepa', 'Onion', 'Bulb', 'Imported', 'Least Concern', 'S217'),
(18, 'Allium sativum', 'Garlic', 'Bulb', 'Imported', 'Least Concern', 'S218'),
(19, 'Lycopersicon esculentum', 'Cherry Tomato', 'Herb', 'Selangor', 'Least Concern', 'S219'),
(20, 'Abelmoschus esculentus', 'Okra', 'Shrub', 'Kedah', 'Least Concern', 'S220'),
(21, 'Phaseolus vulgaris', 'Long Bean', 'Vine', 'Penang', 'Least Concern', 'S221'),
(22, 'Vigna unguiculata', 'Yardlong Bean', 'Vine', 'Perak', 'Least Concern', 'S222'),
(23, 'Brassica rapa', 'Pak Choy', 'Leafy', 'Cameron Highlands', 'Least Concern', 'S223'),
(24, 'Brassica oleracea', 'Cabbage', 'Leafy', 'Cameron Highlands', 'Least Concern', 'S224'),
(25, 'Lactuca sativa', 'Lettuce', 'Leafy', 'Cameron Highlands', 'Least Concern', 'S225'),
(26, 'Spinacia oleracea', 'Spinach', 'Leafy', 'Kuala Lumpur', 'Least Concern', 'S226'),
(27, 'Coriandrum sativum', 'Coriander', 'Herb', 'Johor', 'Least Concern', 'S227'),
(28, 'Ocimum basilicum', 'Basil', 'Herb', 'Penang', 'Least Concern', 'S228'),
(29, 'Mentha spicata', 'Mint', 'Herb', 'Cameron Highlands', 'Least Concern', 'S229'),
(30, 'Petroselinum crispum', 'Parsley', 'Herb', 'Urban Farms', 'Least Concern', 'S230'),
(31, 'Psidium guajava', 'Guava', 'Tree', 'Johor', 'Least Concern', 'S231'),
(32, 'Syzygium aqueum', 'Water Apple', 'Tree', 'Perak', 'Least Concern', 'S232'),
(33, 'Artocarpus heterophyllus', 'Jackfruit', 'Tree', 'Pahang', 'Least Concern', 'S233'),
(34, 'Averrhoa bilimbi', 'Bilimbi', 'Tree', 'Kelantan', 'Least Concern', 'S234'),
(35, 'Cucumis sativus', 'Cucumber', 'Vine', 'Penang', 'Least Concern', 'S235'),
(36, 'Momordica charantia', 'Bitter Gourd', 'Vine', 'Kedah', 'Least Concern', 'S236'),
(37, 'Cucurbita moschata', 'Pumpkin', 'Vine', 'Sabah', 'Least Concern', 'S237'),
(38, 'Cucurbita pepo', 'Zucchini', 'Vine', 'Johor', 'Least Concern', 'S238'),
(39, 'Parkia speciosa', 'Petai (Stink Bean)', 'Tree', 'Johor', 'Least Concern', 'S239'),
(40, 'Archidendron pauciflorum', 'Jering', 'Tree', 'Selangor', 'Least Concern', 'S240'),
(41, 'Etlingera elatior', 'Torch Ginger', 'Herb', 'Sarawak', 'Least Concern', 'S241'),
(42, 'Piper sarmentosum', 'Daun Kaduk', 'Herb', 'Penang', 'Least Concern', 'S242'),
(43, 'Boesenbergia rotunda', 'Fingerroot', 'Herb', 'Kelantan', 'Least Concern', 'S243'),
(44, 'Clitoria ternatea', 'Butterfly Pea', 'Vine', 'Sabah', 'Least Concern', 'S244'),
(45, 'Orthosiphon aristatus', 'Misai Kucing', 'Shrub', 'Johor', 'Least Concern', 'S245'),
(46, 'Gynura procumbens', 'Sambung Nyawa', 'Herb', 'Sarawak', 'Least Concern', 'S246'),
(47, 'Eleutherine palmifolia', 'Bawang Dayak', 'Herb', 'Sarawak', 'Least Concern', 'S247'),
(48, 'Centella asiatica', 'Pegaga', 'Herb', 'Perlis', 'Least Concern', 'S248'),
(49, 'Baccaurea motleyana', 'Rambai', 'Tree', 'Terengganu', 'Least Concern', 'S249');

-- --------------------------------------------------------

--
-- Table structure for table `visitor`
--

CREATE TABLE `visitor` (
  `VisitorID` int(11) NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `IC` varchar(20) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `visitor`
--

INSERT INTO `visitor` (`VisitorID`, `Name`, `IC`, `Email`, `Phone`) VALUES
(3, 'Alice Tan', '880101-14-5678', 'alice@example.com', '0123456789'),
(4, 'John Lim', '910212-10-3456', 'john@example.com', '0198765432'),
(5, 'Brian Teo', '950305-11-2345', 'brian.teo@example.com', '0162233445'),
(6, 'Emily Wong', '920710-12-7890', 'emily.w@example.com', '0131122334'),
(7, 'Kevin Lee', '880909-08-3344', 'kevin.lee@example.com', '0175566778');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admininfo`
--
ALTER TABLE `admininfo`
  ADD PRIMARY KEY (`AdminID`);

--
-- Indexes for table `parkguide`
--
ALTER TABLE `parkguide`
  ADD PRIMARY KEY (`GuideID`);

--
-- Indexes for table `plant_species`
--
ALTER TABLE `plant_species`
  ADD PRIMARY KEY (`SpeciesID`);

--
-- Indexes for table `visitor`
--
ALTER TABLE `visitor`
  ADD PRIMARY KEY (`VisitorID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admininfo`
--
ALTER TABLE `admininfo`
  MODIFY `AdminID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `parkguide`
--
ALTER TABLE `parkguide`
  MODIFY `GuideID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `plant_species`
--
ALTER TABLE `plant_species`
  MODIFY `SpeciesID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `visitor`
--
ALTER TABLE `visitor`
  MODIFY `VisitorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
