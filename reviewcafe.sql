-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 27, 2026 at 01:13 AM
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
-- Database: `reviewcafe`
--

-- --------------------------------------------------------

--
-- Table structure for table `cafes`
--

CREATE TABLE `cafes` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `slug` varchar(200) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `address` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `view_count` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cafes`
--

INSERT INTO `cafes` (`id`, `category_id`, `owner_id`, `name`, `slug`, `description`, `address`, `image`, `view_count`, `created_at`, `updated_at`) VALUES
(58, 1, 1, 'Something Journey Chiang Rai', 'something-journey-chiang-rai', 'คาเฟ่และร้านอาหาร บรรยากาศดี เป็นหนึ่งในลิสต์พิกัดดีต่อใจ ที่น่ามาเช็คอินที่เชียงราย ด้วยวิวหลักล้านสวยๆ ภูเขา ทะเลสาบ รวมถึงตัวร้านที่ตกแต่งได้อย่างสวยงาม เหมาะกับการมาทานข้าวกับครอบครัว หรืออิ่มอร่อยกับเพื่อนๆ เมนูแนะนำ ผัดไชโป๊กินคู่กับหมูทอด ซุปปลาหมึกแห้ง ปิดท้ายด้วย เมนู ก่ำเกิร์ต ที่เป็นตัวช่วยแก้เผ็ดได้อย่างดี', 'https://maps.app.goo.gl/gFdT6ut9d34UNe5e7\r\n', '1772132892_1.jpg', 44, '2026-02-26 18:56:30', '2026-02-27 00:11:26'),
(60, 1, 1, 'ไร่ชาฉุยฟง', 'ไร่ชาฉุยฟง', '  เรียกว่าเป็นคาเฟ่ชื่อดัง ที่ใครมาเชียงรายจำเป็นต้องแวะ เพราะถือเป็นซิกเนเจอร์ของจังหวัดเชียงรายเลยก็ว่าได้ สำหรับการปลูกชาเขียว คาเฟ่ที่นี่ตั้งอยู่บนบอดเขาสูงใหญ่ เห็นวิวไร่ชาสีเขียวไกลสุดลูกหูลูกตาราว 500 ไร่ ที่สำคัญ ยังมีเมนูที่ทำจากชาเขียวของที่นี้ บอกเลยว่าได้รับรสชาเขียวแท้ๆ ใครเลิฟชาเขียว ไม่ควรพลาด', 'ttps://maps.app.goo.gl/mDb1qGRgA66YCKN37', '1772143107_2.jpg', 0, '2026-02-26 21:58:27', '2026-02-26 21:58:27'),
(61, 5, 1, ' บันดาลใจ Coffee Eatery Bingsu', '-บันดาลใจ-coffee-eatery-bingsu', 'อร่อยฟินกันต่อที่ บันดาลใจ Coffee Eatery Bingsu คาเฟ่ ร้านกาแฟ บรรยากาศดีต่อใจ แถมทำเลก็ปัง อยู่ติดสวนสาธรณะริมแม่น้ำกก เมนูอาหารและขนมก็อร่อยครบ จบทั้งคาวหวาน ในราคามิตรภาพ รวมถึงตัวร้านที่สวยงาม ถ่ายรูปเช็คอินกันอิ่มใจแน่นอน', 'https://maps.app.goo.gl/jnpsV2hhw1Nhr2CY7', '1772143203_3.jpg', 0, '2026-02-26 22:00:03', '2026-02-26 22:00:03'),
(62, 2, 1, ' M&Y Cafe', '-m&y-cafe', 'ร้านขนมหวานสไตล์ญี่ปุ่น ผลิตจากวัตถุดิบนำเข้าจากญี่ปุ่นเกือบ 100% เป็นอีกหนึ่งคาเฟ่เชียงรายที่น่าตามไปเช็คอิน โดยเฉพาะใครที่ชอบทานขนมญี่ปุ่น ไม่ว่าจะเป็น ไดฟุกุ โมจิ ดังโงะ วาราบิโมจิ โมจิย่าง หรือแซนด์วิชสตรอเบอรี่ครีมสด', 'https://maps.app.goo.gl/jKP1rpHyRNj7r9pd6', '1772143432_4.jpg', 0, '2026-02-26 22:03:52', '2026-02-26 22:03:52'),
(63, 5, 1, 'Low Cal Cafe Chiangrai', 'low-cal-cafe-chiangrai', 'คาเฟ่เพื่อคนรักสุขภาพที่ชาวเชียงรายแนะนำว่าต้องไปเช็คอิน เพราะคาเฟ่ที่ชื่อว่า Low Cal Cafe นั่นมีแต่เครื่องดื่มและอาหารสำหรับคนรักสุขภาพ ยกตัวอย่างเช่นเมนู Premium Matcha & Organic Coffee เป็นต้น ร้านตกแต่งบรรยากาศร้านด้วยสไตล์บ้านไม้เก่าญี่ปุ่น หากใครที่คิดถึงบรรยากาศแบบ Japanese style ถ้าได้มาร้านนี้แล้วคงจะหายคิดถึงไม่น้อย บวกกับได้ดื่มเครื่องดื่มที่เหมาะสำหรับคนรักสุขภาพด้วยแล้วนั้น เรียกว่าห้ามพลาด', 'https://maps.app.goo.gl/FbvTWg5q1PXkvotf8', '1772143580_5.jpg', 0, '2026-02-26 22:06:20', '2026-02-26 22:06:20'),
(64, 4, 1, ' Wood Lover Cafe', '-wood-lover-cafe', 'Wood Lover Cafe คาเฟ่สไตล์ยุโรป ตกแต่งสวยงาม มีจุดให้ถ่ายรูปเช็คอิน ต้องห้ามพลาดลิ้มรส กาแฟภูเขาไฟอ้อย อร่อยหอมกรุ่นในบรรยากาศสบายๆ การันตีความอร่อยด้วย รางวัลชนะเลิศอันดับ 1 จากโครงการประกวดชื่อดังของจังหวัดเชียงราย เมนูแนะนำ กาแฟ น้ำเสาวรสปั่น กาแฟอ้อยภูเขาไฟ', 'https://maps.app.goo.gl/F2T6GQfMTWsv9KjYA', '1772143658_6.jpg', 0, '2026-02-26 22:07:38', '2026-02-26 22:07:38'),
(65, 5, 1, 'Seasons bake haus', 'seasons-bake-haus', 'Seasons bake haus ใครที่กำลังมองหา คาเฟ่ ใกล้ฉัน เชียงราย วันนี้เรามีพิกัดใหม่ ดีต่อใจมาฝากกันค่ะ ถือเป็นคาเฟ่สวย เปิดใหม่ได้ไม่นาน สไตล์เกาหลี บอกเลยว่ามินิมอลสุดใจ ใครได้ไปก็ต้องตกหลุมรักค่ะ มุมถ่ายรูปดี เครื่องดื่ม ขนมโดน มาค่ะ ตามเรามาชิลกันเล้ย', 'https://maps.app.goo.gl/RLYLJsacXJppAUbDA', '1772143724_7.jpg', 0, '2026-02-26 22:08:44', '2026-02-26 22:08:44'),
(66, 2, 1, 'Lil housecafe', 'lil-housecafe', '    Lil house cafe คาเฟ่ที่จะให้คุณรู้สึกเหมือนอยู่บ้าน ทั้งบรรยากาศ วิวทุ่งนา ลมเย็นที่พัดผ่าน ตกแต่งด้วย โทนสีที่อบอุ่น ไม้เนื้ออ่อน ขาว ครีม minimal & cozy มาก คาเฟ่มีหมดหมด 2 ชั้น ชั้นที่ 2 มีระเบียงที่ทำให้เห็นวิวกว้างพระอาทิตย์ตกโรแมนติกอย่าบอกใคร', 'https://maps.app.goo.gl/tx7yoMCX3jCusVdt8', '1772143801_8.jpg', 0, '2026-02-26 22:10:01', '2026-02-26 22:10:01'),
(67, 2, 1, 'I’m waiting for you Cafe & Bakery', 'i’m-waiting-for-you-cafe-&-bakery', 'I’m waiting for you cafe and bakery แถม nail salon ร้านนี้เป็นทั้งคาเฟ่ และ ร้านทำเล็บด้วย คุณผู้ชายดื่มกาแฟนั่งรอคุณแฟนทำเล็บเพลิดเลย เพราะร้านนี้ มีทั้ง indoor และ out door ยังไม่พอมีเครื่องปรับอากาศเย็นฉ่ำ แถมยังมีขนมอร่อยมาก แต่ละวันทำขนมไม่ซ้ำกันด้วยนะ ยัง ยังไม่หมด ร้านนี้รับทำเค้กวันเกิดด้วย อร่อย ราคาสบายกระเป๋า', 'https://maps.app.goo.gl/K6qs9DzMN1gZULTMA', '1772143856_9.jpg', 0, '2026-02-26 22:10:56', '2026-02-26 22:11:22'),
(68, 5, 1, 'Nanaba Cafe', 'nanaba-cafe', 'Nanaba Cafe ร้านคาเฟ่ที่ตกแต่งบรรยากาศภายในร้านด้วยสไตล์มินิมอลผสมกับบรรยากาศนอกร้านสไตล์ลอฟท์ออกมาได้อย่างลงตัว หากใครมาเช็ดอินที่นี่แล้วรับรองได้ว่า มีรูปสวยๆ ไปอวดเพื่อนใน social media อย่างแน่นอน และเมนูเครื่องดื่มก็มีให้เลือกมากมาย ซึ่งทางร้านได้คัดสรรวัตถุดิบเกรดพรีเมี่ยมไว้รอลูกค้าที่มาเยือน อีกทั้งเมนูเค้กอื่นๆอีกมากมายให้เลือกชิม บอกเลยว่าห้ามพลาด', ' https://maps.app.goo.gl/ESrC8pyZSqwwPuzD9', '1772143979_10.jpg', 0, '2026-02-26 22:12:59', '2026-02-26 22:12:59'),
(69, 4, 1, ' Abonzo Coffee', '-abonzo-coffee', 'เริ่มกันที่ร้าน Abonzo Coffee ก็ดีงามไม่แพ้กับร้านแรก เลยล่ะครับ ที่นี่ถูกแบ่งออกเป็น 2 โซน อย่างชัดเจน โดยฝั่งแรกจะเปิดเป็นคาเฟ่ ร้านกาแฟ นั่งชิล ส่วนอีกฝั่งจะเปิดเป็นพื้นที่สำหรับคั่วเมล็ดกาแฟ ลองจินตนาการภาพตามเราดูนะครับ ว่าถ้าหากได้มีเวลาไปนั่งจิบกาแฟ พร้อมทั้งได้นั่งมองวิวภูเขาไปด้วย แถมยังได้กลิ่น การคั่วเมล็ดกาแฟ มันช่างเป็นอะไรที่ลงตัวสุดๆ เลยล่ะครับ', ' https://maps.app.goo.gl/rdHvUyVPoRxJFXBV8', '1772144070_11.jpg', 0, '2026-02-26 22:14:30', '2026-02-26 22:14:30'),
(70, 4, 1, 'Ja dae Coffee', 'ja-dae-coffee', 'Ja dae Coffee ร้านกาแฟ ดอยช้างที่เราจะพาทุกคนไปฟินกัน ก็คือ ร้าน Ja dae Coffee & Food ด้วยจุดเด่นของทางร้าน อย่างวิวทิวทัศน์ภูเขา และธรรมชาติ ที่สามารถมองได้รอบ 360 องศา เลยไม่แปลกใจเลยว่าทำไมเหล่านักท่องเที่ยว ถึงติดใจร้านนี้ รวมไปถึงเครื่องดื่มก็เก๋ไก๋สุดๆ', 'https://maps.app.goo.gl/ysmDB5ncFJUxckSo6', '1772144138_12.jpg', 0, '2026-02-26 22:15:38', '2026-02-26 22:15:38'),
(71, 1, 1, 'Hacienda Coffee House', 'hacienda-coffee-house', '   จะมีอะไรดีไปกว่าการได้ทานอาหารอร่อยๆ จิบกาแฟดีๆ ท่ามกลาขุนเขา เราชวนมาเช็คอินกันเลยที่ Hacienda Coffee House คาเฟ่ เชียงราย สไตล์อังกฤษ คาเฟ่สุดชิคตกแต่งเก๋ไก๋ ได้ฟีลบ้านชนบทในยุโรปที่ ล้อมรอบด้วยต้นไม้สีเขียว นอกจากความสวยงามของตัวร้านแล้ว Hacienda Coffee House ยังมีเมนูอาหารหลากหลายให้ได้อร่อยกันอีกด้วย เป็นอาหารสไตล์ตะวันตกและฟิวชั่น ที่บอกเลยว่าห้ามพลาด', 'https://maps.app.goo.gl/x3M2cVWKH98zKVYv8', '1772144214_13.jpg', 2, '2026-02-26 22:16:54', '2026-02-27 00:07:09'),
(72, 1, 1, 'Ryokan Cafe', 'ryokan-cafe', ' ใครที่กำลังจะมองหา ร้านกาแฟ เชียงราย ชิคๆ ฟีลธรรมชาติอยู่ล่ะก็ เราจะพาทุกคนไปชิล กันที่ Ryokan Cafe คาเฟ่สไตล์ญี่ปุ่น กันครับ บอกเลยว่าชิค และชิลมาก โดยคาเฟ่มีการตกแต่งในรูปแบบสไตล์ญี่ปุ่นทั้งด้านการดีไซน์ และบรรยากาศรอบๆ แบ่งออกเป็น 2 ฝั่ง สำหรับเมนูอร่อยในร้าน ครั้งนี้เราได้สั่ง เค้กพายมะพร้าวหน้าเมอแรงค์ และ เค้กเนื้อนุ่มชีส มาทานคู่กับ ชากุหลาบเย็น บอกเลยว่าว่าฟินสุดๆ', 'https://maps.app.goo.gl/dqAXwHiNVqJQRzWPA', '1772144258_14.jpg', 0, '2026-02-26 22:17:38', '2026-02-26 22:17:38'),
(73, 3, 1, 'CAT \'n\' A CUP Cat Cafe', 'cat-\'n\'-a-cup-cat-cafe', 'เป็นคาเฟ่แมวชื่อดังใจกลางเมืองเชียงรายที่เปิดให้บริการโดยไม่มีค่าเข้า ลูกค้าสามารถเข้ามาพักผ่อนและเล่นกับน้องแมวที่มีมากกว่า 15-20 ตัวได้เพียงแค่สั่งเครื่องดื่มหรืออาหารตามกฎของร้าน', '596/7 ถ.พหลโยธิน ต.เวียง อ.เมือง, Chiang Rai, Thailand, 57000', '1772144565_15.jpg', 8, '2026-02-26 22:22:45', '2026-02-27 00:04:23'),
(74, 3, 1, 'Deer Forest : Garden Table', 'deer-forest-:-garden-table', ' เป็นคาเฟ่เปิดใหม่ใน ต.แม่ยาว จ.เชียงราย ที่กำลังฮิตสุดๆ เพราะมีกวางกว่า 17 ตัว และเป็ดน้อยให้เราได้ใกล้ชิดท่ามกลางบรรยากาศภูเขาและลำธาร โดยเมนูที่นี่จะเน้นไปที่อาหารสไตล์ Fusion Food และเครื่องดื่มที่จัดจานมาอย่างสวยงาม', 'https://www.google.com/maps/dir//Deer+Forest+:+Garden+Table,+201,+Mae+Yao,+Mueang+Chiang+Rai+District,+Chiang+Rai+57100/@19.972096,99.844096,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x30d7032716ea1393:0xdd425b5c7174f756!2m2!1d99.7448134!2d19.9758667?entry=ttu&g_ep=EgoyMDI2MDIyNC4wIKXMDSoASAFQAw%3D%3D', '1772144732_16.jpg', 12, '2026-02-26 22:25:32', '2026-02-27 00:07:54');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `slug` varchar(150) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `created_at`) VALUES
(1, 'คาเฟ่ธรรมชาติ', 'nature-cafe', '2026-02-26 07:16:39'),
(2, 'คาเฟ่มินิมอล', 'minimal-cafe', '2026-02-26 07:16:39'),
(3, 'คาเฟ่สัตว์เลี้ยง', 'pet-friendly', '2026-02-26 07:16:39'),
(4, 'คาเฟ่วิวภูเขา', 'mountain-view', '2026-02-26 07:16:39'),
(5, 'คาเฟ่กลางเมือง', 'city-cafe', '2026-02-26 07:16:39');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `cafe_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  `is_approved` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `cafe_id`, `user_id`, `rating`, `comment`, `is_approved`, `created_at`) VALUES
(12, 58, 1, 5, 'หดกเอ', 1, '2026-02-26 19:09:32'),
(15, 58, 15, 4, 'dsdg', 1, '2026-02-26 19:41:53'),
(16, 74, 14, 5, 'good', 1, '2026-02-26 22:26:54'),
(17, 74, 15, 5, 'good', 1, '2026-02-26 22:27:40'),
(18, 73, 15, 5, 'cat', 1, '2026-02-26 22:27:50'),
(19, 73, 15, 5, '1', 1, '2026-02-26 22:28:26');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `tel`, `images`, `password`, `role`, `created_at`) VALUES
(1, 'admin', 'admin@gmail.com', NULL, NULL, '$2y$10$examplehash', 'admin', '2026-02-25 21:57:19'),
(2, '1', '1@gmail.com', '1', '1772060480_catcry.jpg', '$2y$10$kWmQLJZxPCRjOGhSrvFMeOuq489kITheVs8bFJqO4rgTEBzHSN1Su', 'user', '2026-02-25 23:01:20'),
(7, 'john', 'john@gmail.com', '0891111111', NULL, '$2y$10$examplehash', 'user', '2026-02-26 07:17:02'),
(8, 'may', 'may@gmail.com', '0892222222', NULL, '$2y$10$examplehash', 'user', '2026-02-26 07:17:02'),
(9, 'boss', 'boss@gmail.com', '0893333333', NULL, '$2y$10$examplehash', 'user', '2026-02-26 07:17:02'),
(14, '22', '2@gmail.com', '1', '1772145694_15.jpg', '$2y$10$AnPTZxa/wA2Kf9mlMI0DhOYDSWauXLooYC15ZIUdqXh6fqYOyi97e', 'admin', '2026-02-26 07:45:53'),
(15, '11', '11@gmail.com', '11', '1772147393_4.jpg', '$2y$10$VUYFIl.e/0poj0Mpy.UDt.4.hu6Gb0RQI7BUzEPHgxcZH2ck70WhK', 'user', '2026-02-26 07:46:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cafes`
--
ALTER TABLE `cafes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cafe_id` (`cafe_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cafes`
--
ALTER TABLE `cafes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cafes`
--
ALTER TABLE `cafes`
  ADD CONSTRAINT `cafes_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cafes_ibfk_2` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`cafe_id`) REFERENCES `cafes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
