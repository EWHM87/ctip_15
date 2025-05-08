-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 16, 2025 at 11:50 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `semmengohwildlife`
--

-- --------------------------------------------------------

--
-- Table structure for table `admininfo`
--

CREATE TABLE `admininfo` (
  `AdminID` int(11) NOT NULL,
  `AdminName` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `ContactNumber` varchar(20) DEFAULT NULL,
  `Role` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admininfo`
--

INSERT INTO `admininfo` (`AdminID`, `AdminName`, `Email`, `ContactNumber`, `Role`) VALUES
(1, 'Azlan Musa', 'azlan.musa@admin.my', '0126667788', 'System Administrator'),
(2, 'Melissa Tan', 'melissa.tan@admin.my', '0137778899', 'Database Manager'),
(3, 'Ravi Anand', 'ravi.anand@admin.my', '0148889900', 'Security Analyst'),
(4, 'Syafiq Omar', 'syafiq.omar@admin.my', '0159990011', 'Data Analyst'),
(5, 'Chong Mei Lin', 'mei.lin@admin.my', '0111011122', 'User Support');

-- --------------------------------------------------------

--
-- Table structure for table `animal_species`
--

CREATE TABLE `animal_species` (
  `AnimalID` int(11) NOT NULL,
  `ScientificName` varchar(100) DEFAULT NULL,
  `CommonName` varchar(100) DEFAULT NULL,
  `AnimalType` varchar(50) DEFAULT NULL,
  `Habitat` varchar(100) DEFAULT NULL,
  `ConservationStatus` varchar(50) DEFAULT NULL,
  `SensorID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `animal_species`
--

INSERT INTO `animal_species` (`AnimalID`, `ScientificName`, `CommonName`, `AnimalType`, `Habitat`, `ConservationStatus`, `SensorID`) VALUES
(1, 'Panthera tigris jacksoni', 'Malayan Tiger', 'Mammal', 'Taman Negara', 'Critically Endangered', 'A001'),
(2, 'Elephas maximus', 'Asian Elephant', 'Mammal', 'Perak Forest Reserve', 'Endangered', 'A002'),
(3, 'Tapirus indicus', 'Malayan Tapir', 'Mammal', 'Taman Negara', 'Endangered', 'A003'),
(4, 'Pongo abelii', 'Sumatran Orangutan', 'Mammal', 'Sabah Rainforest', 'Critically Endangered', 'A004'),
(5, 'Rhinoceros sondaicus', 'Javan Rhinoceros', 'Mammal', 'Peninsular Malaysia', 'Critically Endangered', 'A005'),
(6, 'Neofelis nebulosa', 'Clouded Leopard', 'Mammal', 'Sarawak Forest', 'Vulnerable', 'A006'),
(7, 'Macaca fascicularis', 'Long-tailed Macaque', 'Mammal', 'Urban Areas', 'Least Concern', 'A007'),
(8, 'Nycticebus coucang', 'Slow Loris', 'Mammal', 'Tropical Rainforest', 'Vulnerable', 'A008'),
(9, 'Galeopterus variegatus', 'Sunda Flying Lemur', 'Mammal', 'Lowland Forests', 'Least Concern', 'A009'),
(10, 'Manis javanica', 'Sunda Pangolin', 'Mammal', 'Taman Negara', 'Critically Endangered', 'A010'),
(11, 'Varanus salvator', 'Water Monitor Lizard', 'Reptile', 'Wetlands', 'Least Concern', 'A011'),
(12, 'Python reticulatus', 'Reticulated Python', 'Reptile', 'Swamps & Forests', 'Least Concern', 'A012'),
(13, 'Crocodylus porosus', 'Saltwater Crocodile', 'Reptile', 'Rivers & Estuaries', 'Least Concern', 'A013'),
(14, 'Trimeresurus purpureomaculatus', 'Mangrove Pit Viper', 'Reptile', 'Mangroves', 'Least Concern', 'A014'),
(15, 'Malayopython timoriensis', 'Timor Python', 'Reptile', 'Rainforest', 'Data Deficient', 'A015'),
(16, 'Ornithoptera alexandrae', 'Queen Alexandra Birdwing', 'Insect', 'Tropical Forest', 'Endangered', 'A016'),
(17, 'Troides brookiana', 'Rajah Brooke’s Birdwing', 'Insect', 'Rainforest', 'Protected', 'A017'),
(18, 'Danaus genutia', 'Common Tiger Butterfly', 'Insect', 'Gardens', 'Least Concern', 'A018'),
(19, 'Buceros rhinoceros', 'Rhinoceros Hornbill', 'Bird', 'Borneo Rainforest', 'Near Threatened', 'A019'),
(20, 'Argusianus argus', 'Great Argus', 'Bird', 'Lowland Forests', 'Near Threatened', 'A020'),
(21, 'Pitta guajana', 'Garnet Pitta', 'Bird', 'Taman Negara', 'Least Concern', 'A021'),
(22, 'Ciconia stormi', 'Storm’s Stork', 'Bird', 'Swamps', 'Endangered', 'A022'),
(23, 'Pelecanus philippensis', 'Spot-billed Pelican', 'Bird', 'Wetlands', 'Near Threatened', 'A023'),
(24, 'Helarctos malayanus', 'Sun Bear', 'Mammal', 'Tropical Forests', 'Vulnerable', 'A024'),
(25, 'Hylobates lar', 'Lar Gibbon', 'Mammal', 'Rainforest Canopy', 'Endangered', 'A025'),
(26, 'Presbytis melalophos', 'Mitred Leaf Monkey', 'Mammal', 'Forest Canopy', 'Vulnerable', 'A026'),
(27, 'Petaurista petaurista', 'Red Giant Flying Squirrel', 'Mammal', 'Rainforest', 'Least Concern', 'A027'),
(28, 'Chiropodomys gliroides', 'Pencil-tailed Tree Mouse', 'Mammal', 'Tropical Forests', 'Least Concern', 'A028'),
(29, 'Rattus rattus', 'Black Rat', 'Mammal', 'Urban Areas', 'Least Concern', 'A029'),
(30, 'Rusa unicolor', 'Sambar Deer', 'Mammal', 'Forests & Grasslands', 'Vulnerable', 'A030'),
(31, 'Axis axis', 'Spotted Deer', 'Mammal', 'Forest Edge', 'Least Concern', 'A031'),
(32, 'Sus barbatus', 'Bearded Pig', 'Mammal', 'Borneo Forest', 'Vulnerable', 'A032'),
(33, 'Hystrix brachyura', 'Malayan Porcupine', 'Mammal', 'Lowland Forests', 'Least Concern', 'A033'),
(34, 'Herpestes javanicus', 'Small Asian Mongoose', 'Mammal', 'Villages & Forests', 'Least Concern', 'A034'),
(35, 'Pardofelis marmorata', 'Marbled Cat', 'Mammal', 'Dense Forests', 'Near Threatened', 'A035'),
(36, 'Felis catus', 'Feral Cat', 'Mammal', 'Urban/Rural Areas', 'Not Evaluated', 'A036'),
(37, 'Canis lupus familiaris', 'Feral Dog', 'Mammal', 'Urban Areas', 'Not Evaluated', 'A037'),
(38, 'Anas platyrhynchos', 'Mallard Duck', 'Bird', 'Wetlands', 'Least Concern', 'A038'),
(39, 'Gallus gallus', 'Red Junglefowl', 'Bird', 'Forest Edge', 'Least Concern', 'A039'),
(40, 'Psittacula alexandri', 'Red-breasted Parakeet', 'Bird', 'Forest Canopy', 'Near Threatened', 'A040'),
(41, 'Tyto alba', 'Barn Owl', 'Bird', 'Farmlands', 'Least Concern', 'A041'),
(42, 'Naja sumatrana', 'Equatorial Spitting Cobra', 'Reptile', 'Scrublands', 'Least Concern', 'A042'),
(43, 'Bronchocela cristatella', 'Green Crested Lizard', 'Reptile', 'Forest Edge', 'Least Concern', 'A043'),
(44, 'Agamidae spp.', 'Forest Dragon', 'Reptile', 'Montane Forests', 'Data Deficient', 'A044'),
(45, 'Macropygia unchall', 'Barred Cuckoo Dove', 'Bird', 'Hill Forest', 'Least Concern', 'A045'),
(46, 'Tragulus javanicus', 'Lesser Mouse Deer', 'Mammal', 'Forest Floor', 'Least Concern', 'A046'),
(47, 'Tarsius bancanus', 'Western Tarsier', 'Mammal', 'Forest Understory', 'Vulnerable', 'A047'),
(48, 'Callosciurus notatus', 'Plantain Squirrel', 'Mammal', 'Gardens & Forests', 'Least Concern', 'A048'),
(49, 'Rhinolophus spp.', 'Horseshoe Bat', 'Mammal', 'Caves & Forests', 'Least Concern', 'A049'),
(50, 'Myotis muricola', 'Whiskered Myotis', 'Mammal', 'Caves', 'Least Concern', 'A050');

-- --------------------------------------------------------

--
-- Table structure for table `certification`
--

CREATE TABLE `certification` (
  `CertificationID` int(11) NOT NULL,
  `GuideID` int(11) DEFAULT NULL,
  `Title` varchar(100) DEFAULT NULL,
  `IssuedDate` date DEFAULT NULL,
  `ExpiryDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `certification`
--

INSERT INTO `certification` (`CertificationID`, `GuideID`, `Title`, `IssuedDate`, `ExpiryDate`) VALUES
(1, 1, 'Certified Wildlife Interpreter', '2024-06-01', '2026-06-01'),
(2, 2, 'Eco-Tourism Specialist', '2023-12-15', '2025-12-15'),
(3, 4, 'Basic First Aid Certified', '2025-01-10', '2027-01-10');

-- --------------------------------------------------------

--
-- Table structure for table `guide_recommendation`
--

CREATE TABLE `guide_recommendation` (
  `RecommendationID` int(11) NOT NULL,
  `GuideID` int(11) DEFAULT NULL,
  `TrainingTitle` varchar(100) DEFAULT NULL,
  `Reason` text DEFAULT NULL,
  `DateSuggested` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `guide_recommendation`
--

INSERT INTO `guide_recommendation` (`RecommendationID`, `GuideID`, `TrainingTitle`, `Reason`, `DateSuggested`) VALUES
(1, 2, 'Advanced Communication Skills', 'Some feedback mentioned unclear explanations.', '2025-04-15'),
(2, 5, 'First Aid Refresher', 'New training available for emergency readiness.', '2025-04-14');

-- --------------------------------------------------------

--
-- Table structure for table `guide_training`
--

CREATE TABLE `guide_training` (
  `GuideTrainingID` int(11) NOT NULL,
  `GuideID` int(11) DEFAULT NULL,
  `TrainingID` int(11) DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  `Progress` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `guide_training`
--

INSERT INTO `guide_training` (`GuideTrainingID`, `GuideID`, `TrainingID`, `Status`, `Progress`) VALUES
(1, 1, 1, 'Completed', 100.00),
(2, 2, 1, 'In Progress', 40.00),
(3, 3, 2, 'Enrolled', 0.00),
(4, 4, 3, 'Completed', 100.00),
(5, 5, 2, 'In Progress', 70.00);

-- --------------------------------------------------------

--
-- Table structure for table `park_guide`
--

CREATE TABLE `park_guide` (
  `GuideID` int(11) NOT NULL,
  `GuideName` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `ContactNumber` varchar(20) DEFAULT NULL,
  `AssignedZone` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `park_guide`
--

INSERT INTO `park_guide` (`GuideID`, `GuideName`, `Email`, `ContactNumber`, `AssignedZone`) VALUES
(1, 'Ali Hassan', 'ali.hassan@park.my', '0131122334', 'North Zone'),
(2, 'Lim Hui Ying', 'huiying.lim@park.my', '0142233445', 'South Zone'),
(3, 'Farah Anis', 'farah.anis@park.my', '0163344556', 'East Zone'),
(4, 'Kumar Raj', 'kumar.raj@park.my', '0124455667', 'West Zone'),
(5, 'Zul Hadi', 'zul.hadi@park.my', '0115566778', 'Central Zone');

-- --------------------------------------------------------

--
-- Table structure for table `park_info`
--

CREATE TABLE `park_info` (
  `ParkID` int(11) NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Location` varchar(100) DEFAULT NULL,
  `History` text DEFAULT NULL,
  `Highlights` text DEFAULT NULL,
  `Wildlife` text DEFAULT NULL,
  `Activities` text DEFAULT NULL,
  `Accommodation` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `park_info`
--

INSERT INTO `park_info` (`ParkID`, `Name`, `Location`, `History`, `Highlights`, `Wildlife`, `Activities`, `Accommodation`) VALUES
(1, 'Semenggoh Nature Reserve', 'Kuching, Sarawak', 'Established to rehabilitate orangutans.', 'Orangutan feeding, nature trails', 'Orangutans, Hornbills', 'Wildlife viewing, hiking', 'Nature lodges, chalets'),
(2, 'Gunung Mulu National Park', 'Miri, Sarawak', 'UNESCO World Heritage Site.', 'Limestone caves, Pinnacles', 'Bats, insects, unique flora', 'Caving, canopy walk, forest trekking', 'Resorts, base camp');

-- --------------------------------------------------------

--
-- Table structure for table `performance_feedback`
--

CREATE TABLE `performance_feedback` (
  `FeedbackID` int(11) NOT NULL,
  `GuideID` int(11) DEFAULT NULL,
  `VisitorID` int(11) DEFAULT NULL,
  `Rating` int(11) DEFAULT NULL,
  `Comment` text DEFAULT NULL,
  `FeedbackDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `performance_feedback`
--

INSERT INTO `performance_feedback` (`FeedbackID`, `GuideID`, `VisitorID`, `Rating`, `Comment`, `FeedbackDate`) VALUES
(1, 1, 1, 5, 'Very knowledgeable and friendly!', '2025-04-10'),
(2, 2, 2, 4, 'Good tour but needs clearer explanations.', '2025-04-11'),
(3, 4, 3, 5, 'Great energy, loved the wildlife info!', '2025-04-12');

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
-- Table structure for table `sensor_data`
--

CREATE TABLE `sensor_data` (
  `SensorDataID` int(11) NOT NULL,
  `SensorID` varchar(10) DEFAULT NULL,
  `SpeciesType` enum('Plant','Animal') DEFAULT NULL,
  `Temperature` float DEFAULT NULL,
  `Humidity` float DEFAULT NULL,
  `MotionDetected` tinyint(1) DEFAULT NULL,
  `ReadingTime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sensor_data`
--

INSERT INTO `sensor_data` (`SensorDataID`, `SensorID`, `SpeciesType`, `Temperature`, `Humidity`, `MotionDetected`, `ReadingTime`) VALUES
(1, 'A005', 'Animal', 30.5, 82.1, 1, '2025-04-15 10:00:00'),
(2, 'A016', 'Animal', 29, 77.5, 0, '2025-04-15 10:10:00'),
(3, 'S240', 'Plant', 28.4, 90, 0, '2025-04-15 09:50:00');

-- --------------------------------------------------------

--
-- Table structure for table `species_image_reference`
--

CREATE TABLE `species_image_reference` (
  `ImageID` int(11) NOT NULL,
  `SensorID` varchar(10) DEFAULT NULL,
  `SpeciesType` enum('Plant','Animal') DEFAULT NULL,
  `ImageURL` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `species_image_reference`
--

INSERT INTO `species_image_reference` (`ImageID`, `SensorID`, `SpeciesType`, `ImageURL`) VALUES
(1, 'A005', 'Animal', 'https://example.com/images/rhino.jpg'),
(2, 'S240', 'Plant', 'https://example.com/images/jering.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `training_schedule`
--

CREATE TABLE `training_schedule` (
  `TrainingID` int(11) NOT NULL,
  `Title` varchar(100) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `StartDate` date DEFAULT NULL,
  `EndDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `training_schedule`
--

INSERT INTO `training_schedule` (`TrainingID`, `Title`, `Description`, `StartDate`, `EndDate`) VALUES
(1, 'Eco-Tourism Basics', 'Intro to eco-tourism, park rules, and visitor engagement.', '2025-04-01', '2025-04-05'),
(2, 'Wildlife Identification', 'Learning about key species in Sarawak.', '2025-04-10', '2025-04-14'),
(3, 'First Aid & Emergency', 'Basic survival, first aid, and response training.', '2025-05-01', '2025-05-03');

-- --------------------------------------------------------

--
-- Table structure for table `user_account`
--

CREATE TABLE `user_account` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(50) DEFAULT NULL,
  `PasswordHash` varchar(255) DEFAULT NULL,
  `Role` enum('Admin','Guide','Visitor') DEFAULT NULL,
  `ReferenceID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_account`
--

INSERT INTO `user_account` (`UserID`, `Username`, `PasswordHash`, `Role`, `ReferenceID`) VALUES
(1, 'admin.azlan', 'hash_admin_pw', 'Admin', 1),
(2, 'melissa.tan', 'hash_melissa_pw', 'Admin', 2),
(3, 'guide.syafiq', 'hash_syafiq_pw', 'Guide', 4),
(4, 'visitor.aiman', 'hash_aiman_pw', 'Visitor', 1);

-- --------------------------------------------------------

--
-- Table structure for table `visitor`
--

CREATE TABLE `visitor` (
  `VisitorID` int(11) NOT NULL,
  `VisitorName` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `ContactNumber` varchar(20) DEFAULT NULL,
  `VisitDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `visitor`
--

INSERT INTO `visitor` (`VisitorID`, `VisitorName`, `Email`, `ContactNumber`, `VisitDate`) VALUES
(1, 'Aiman Hakim', 'aiman.hakim@gmail.com', '0123456789', '2025-04-10'),
(2, 'Nurul Izzah', 'nurul.izzah@hotmail.com', '0112233445', '2025-04-11'),
(3, 'Tan Wei Ming', 'tan.wei@gmail.com', '0198877665', '2025-04-12'),
(4, 'Siti Aisyah', 'siti.aisyah@yahoo.com', '0177788990', '2025-04-12'),
(5, 'Muhammad Irfan', 'irfan.m@gmail.com', '0125566778', '2025-04-10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admininfo`
--
ALTER TABLE `admininfo`
  ADD PRIMARY KEY (`AdminID`);

--
-- Indexes for table `animal_species`
--
ALTER TABLE `animal_species`
  ADD PRIMARY KEY (`AnimalID`);

--
-- Indexes for table `certification`
--
ALTER TABLE `certification`
  ADD PRIMARY KEY (`CertificationID`),
  ADD KEY `GuideID` (`GuideID`);

--
-- Indexes for table `guide_recommendation`
--
ALTER TABLE `guide_recommendation`
  ADD PRIMARY KEY (`RecommendationID`),
  ADD KEY `GuideID` (`GuideID`);

--
-- Indexes for table `guide_training`
--
ALTER TABLE `guide_training`
  ADD PRIMARY KEY (`GuideTrainingID`),
  ADD KEY `GuideID` (`GuideID`),
  ADD KEY `TrainingID` (`TrainingID`);

--
-- Indexes for table `park_guide`
--
ALTER TABLE `park_guide`
  ADD PRIMARY KEY (`GuideID`);

--
-- Indexes for table `park_info`
--
ALTER TABLE `park_info`
  ADD PRIMARY KEY (`ParkID`);

--
-- Indexes for table `performance_feedback`
--
ALTER TABLE `performance_feedback`
  ADD PRIMARY KEY (`FeedbackID`),
  ADD KEY `GuideID` (`GuideID`),
  ADD KEY `VisitorID` (`VisitorID`);

--
-- Indexes for table `plant_species`
--
ALTER TABLE `plant_species`
  ADD PRIMARY KEY (`SpeciesID`);

--
-- Indexes for table `sensor_data`
--
ALTER TABLE `sensor_data`
  ADD PRIMARY KEY (`SensorDataID`);

--
-- Indexes for table `species_image_reference`
--
ALTER TABLE `species_image_reference`
  ADD PRIMARY KEY (`ImageID`);

--
-- Indexes for table `training_schedule`
--
ALTER TABLE `training_schedule`
  ADD PRIMARY KEY (`TrainingID`);

--
-- Indexes for table `user_account`
--
ALTER TABLE `user_account`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Username` (`Username`);

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
  MODIFY `AdminID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `animal_species`
--
ALTER TABLE `animal_species`
  MODIFY `AnimalID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `certification`
--
ALTER TABLE `certification`
  MODIFY `CertificationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `guide_recommendation`
--
ALTER TABLE `guide_recommendation`
  MODIFY `RecommendationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `guide_training`
--
ALTER TABLE `guide_training`
  MODIFY `GuideTrainingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `park_guide`
--
ALTER TABLE `park_guide`
  MODIFY `GuideID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `park_info`
--
ALTER TABLE `park_info`
  MODIFY `ParkID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `performance_feedback`
--
ALTER TABLE `performance_feedback`
  MODIFY `FeedbackID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `plant_species`
--
ALTER TABLE `plant_species`
  MODIFY `SpeciesID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `sensor_data`
--
ALTER TABLE `sensor_data`
  MODIFY `SensorDataID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `species_image_reference`
--
ALTER TABLE `species_image_reference`
  MODIFY `ImageID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `training_schedule`
--
ALTER TABLE `training_schedule`
  MODIFY `TrainingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_account`
--
ALTER TABLE `user_account`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `visitor`
--
ALTER TABLE `visitor`
  MODIFY `VisitorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `certification`
--
ALTER TABLE `certification`
  ADD CONSTRAINT `certification_ibfk_1` FOREIGN KEY (`GuideID`) REFERENCES `park_guide` (`GuideID`);

--
-- Constraints for table `guide_recommendation`
--
ALTER TABLE `guide_recommendation`
  ADD CONSTRAINT `guide_recommendation_ibfk_1` FOREIGN KEY (`GuideID`) REFERENCES `park_guide` (`GuideID`);

--
-- Constraints for table `guide_training`
--
ALTER TABLE `guide_training`
  ADD CONSTRAINT `guide_training_ibfk_1` FOREIGN KEY (`GuideID`) REFERENCES `park_guide` (`GuideID`),
  ADD CONSTRAINT `guide_training_ibfk_2` FOREIGN KEY (`TrainingID`) REFERENCES `training_schedule` (`TrainingID`);

--
-- Constraints for table `performance_feedback`
--
ALTER TABLE `performance_feedback`
  ADD CONSTRAINT `performance_feedback_ibfk_1` FOREIGN KEY (`GuideID`) REFERENCES `park_guide` (`GuideID`),
  ADD CONSTRAINT `performance_feedback_ibfk_2` FOREIGN KEY (`VisitorID`) REFERENCES `visitor` (`VisitorID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
