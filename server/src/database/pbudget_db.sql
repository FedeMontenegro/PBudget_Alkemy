-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: pbudget_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.20-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `operation_registres`
--

DROP TABLE IF EXISTS `operation_registres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `operation_registres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `detail` text DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `operation_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `category` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `FK_operation_id` (`operation_id`),
  CONSTRAINT `FK_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operation_registres`
--

LOCK TABLES `operation_registres` WRITE;
/*!40000 ALTER TABLE `operation_registres` DISABLE KEYS */;
INSERT INTO `operation_registres` VALUES (1,'Operation created at Sun Mar 27 2022 14:10:58 GMT-0300 (hora estándar de Argentina)',13,1,'Entry',34),(2,'Se editó el registro en la fecha Sun Mar 27 2022 14:15:07 GMT-0300 (hora estándar de Argentina)',13,1,'Entry',34);
/*!40000 ALTER TABLE `operation_registres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operations`
--

DROP TABLE IF EXISTS `operations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `operations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `operation_category_id` int(11) NOT NULL,
  `type` varchar(15) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `amount` decimal(15,2) DEFAULT 0.00,
  PRIMARY KEY (`id`),
  KEY `FK_3d182ce1-251e-44a1-a81d-1b2ce7eb6b9c` (`operation_category_id`),
  KEY `FK_86480c75-be19-4e35-9391-62d333501b57` (`user_id`),
  CONSTRAINT `FK_3d182ce1-251e-44a1-a81d-1b2ce7eb6b9c` FOREIGN KEY (`operation_category_id`) REFERENCES `operations_categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_86480c75-be19-4e35-9391-62d333501b57` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operations`
--

LOCK TABLES `operations` WRITE;
/*!40000 ALTER TABLE `operations` DISABLE KEYS */;
INSERT INTO `operations` VALUES (1,34,'',13,'Ingreso actualizado','2022-03-27 17:10:00','2022-03-27 17:15:07',300.00);
/*!40000 ALTER TABLE `operations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operations_categories`
--

DROP TABLE IF EXISTS `operations_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `operations_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `us_op_categories_fk` (`user_id`),
  CONSTRAINT `us_op_categories_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) on delete no action on update no action
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operations_categories`
--

LOCK TABLES `operations_categories` WRITE;
/*!40000 ALTER TABLE `operations_categories` DISABLE KEYS */;
INSERT INTO `operations_categories` VALUES (9,'Supermarket',13),(11,'Buy',13),(12,'Services',13),(13,'Food',13),(26,'Credit',13),(34,'Entry',13);
/*!40000 ALTER TABLE `operations_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `rol` varchar(10) NOT NULL,
  `user_name` varchar(15) NOT NULL,
  `balance` decimal(15,2) DEFAULT 0.00,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (11,'userEleven@userEleven','$2a$10$TBBPiZDuLz0LN4DH.pfgcOsFwDbYBr4ug5zlfzJCo6TmmS7JfA1Si','ROL_USER','userEleven',10000.00),(13,'fede@fede.fede','$2a$10$ejUhJXCqmRSYB2XXuBb4D./GkN35hkD49UTWNyCOTCY0cPcDZcUty','','Fede',100.00),(14,'user@user.com','$2a$10$iJJN1d3EhvVkjaeFRDTkYun22IZEFRyavty3j9.hwe/LE4sgFpmrm','ROL_USER','usuario123',0.00);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'pbudget_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-27 15:52:46
