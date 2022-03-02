/*
Navicat MySQL Data Transfer

Source Server         : 代码生成数据库
Source Server Version : 80025
Source Host           : localhost:3306
Source Database       : devtool_db

Target Server Type    : MYSQL
Target Server Version : 80025
File Encoding         : 65001

Date: 2022-03-02 14:07:22
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for devtool_analysis
-- ----------------------------
DROP TABLE IF EXISTS `devtool_analysis`;
CREATE TABLE `devtool_analysis` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '数据id',
  `type` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '类型',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '网址',
  `body` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '主体内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for devtool_database
-- ----------------------------
DROP TABLE IF EXISTS `devtool_database`;
CREATE TABLE `devtool_database` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '记录内码',
  `name` varchar(64) NOT NULL DEFAULT '' COMMENT '数据库名称',
  `desc_name` varchar(64) NOT NULL DEFAULT '' COMMENT '数据库描述名称',
  `driver_class_name` varchar(256) NOT NULL DEFAULT '' COMMENT ' 数据驱动类',
  `host` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `port` varchar(64) DEFAULT NULL,
  `jdbc_url` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '' COMMENT '不包括数据库和参数',
  `jdbc_params` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=Asia/Shanghai' COMMENT '连接参数信息',
  `username` varchar(32) NOT NULL DEFAULT '' COMMENT '数据库名称',
  `password` varchar(256) NOT NULL DEFAULT '' COMMENT '数据库密码',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_devtool_generator_database` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='开发工具数据库配置';

-- ----------------------------
-- Table structure for devtool_generator_config
-- ----------------------------
DROP TABLE IF EXISTS `devtool_generator_config`;
CREATE TABLE `devtool_generator_config` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '记录内码',
  `name` varchar(64) NOT NULL DEFAULT '' COMMENT '名称',
  `author` varchar(32) NOT NULL DEFAULT '' COMMENT '作者名称',
  `copyright` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '' COMMENT '版权内容',
  `package_name` varchar(128) NOT NULL DEFAULT '' COMMENT '包名称',
  `module_name` varchar(64) NOT NULL DEFAULT '' COMMENT '模块名称',
  `table_prefix` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '' COMMENT '表前缀',
  `describe` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '' COMMENT '描述信息',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_generator_config` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='开发工具生成配置';

-- ----------------------------
-- Table structure for devtool_template
-- ----------------------------
DROP TABLE IF EXISTS `devtool_template`;
CREATE TABLE `devtool_template` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '记录内码',
  `name` varchar(64) NOT NULL DEFAULT '' COMMENT '模版名称',
  `describe` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '模版描述',
  `status` int NOT NULL DEFAULT '0' COMMENT '状态|-1=无效,0=未启用,1=启用',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_devtool_template` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='开发工具代码生成模版';

-- ----------------------------
-- Table structure for devtool_template_file
-- ----------------------------
DROP TABLE IF EXISTS `devtool_template_file`;
CREATE TABLE `devtool_template_file` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '记录内码',
  `template_id` int NOT NULL COMMENT '模版ID',
  `classify` varchar(32) NOT NULL DEFAULT '未分类' COMMENT '分类',
  `name` varchar(64) NOT NULL DEFAULT '' COMMENT '文件名称',
  `body` text NOT NULL COMMENT '模版内容',
  `status` int NOT NULL DEFAULT '0' COMMENT '状态|-1=无效,0=未启用,1=启用',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_devtool_template_file` (`template_id`,`name`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='开发工具代码生成模版文件';
