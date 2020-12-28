/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : localhost
 Source Database       : 多多阅读

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : utf-8

 Date: 12/28/2020 20:19:55 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `小说信息`
-- ----------------------------
DROP TABLE IF EXISTS `小说信息`;
CREATE TABLE `小说信息` (
  `编号` int NOT NULL AUTO_INCREMENT,
  `书名` char(50) NOT NULL,
  `地址` char(50) NOT NULL,
  PRIMARY KEY (`编号`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `小说信息`
-- ----------------------------
BEGIN;
INSERT INTO `小说信息` VALUES ('1', '百年孤独', '/novel/百年孤独.txt'), ('2', '大卫·科波菲尔', '/novel/大卫·科波菲尔.txt'), ('6', '地狱', '/novel/地狱.txt'), ('7', '东方快车谋杀案', '/novel/东方快车谋杀案.txt'), ('8', '封神演义', '/novel/封神演义.txt'), ('9', '浮生六记', '/novel/浮生六记.txt'), ('10', '浮士德', '/novel/浮士德.txt'), ('11', '父与子', '/novel/父与子.txt'), ('12', '复活', '/novel/复活.txt'), ('13', '钢铁是怎样炼成的', '/novel/钢铁是怎样炼成的.txt'), ('14', '格列佛游记', '/novel/格列佛游记.txt'), ('15', '红与黑', '/novel/红与黑.txt'), ('16', '基督山伯爵', '/novel/基督山伯爵.txt'), ('17', '解密', '/novel/解密.txt'), ('18', '狼图腾', '/novel/狼图腾.txt'), ('19', '猎人笔记', '/novel/猎人笔记.txt'), ('20', '名人传', '/novel/名人传.txt'), ('21', '明朝那些事儿1 - 洪武大帝', '/novel/明朝那些事儿1 - 洪武大帝.txt'), ('22', '明朝那些事儿2 - 万国来朝', '/novel/明朝那些事儿2 - 万国来朝.txt'), ('23', '明朝那些事儿3 - 妖孽宫廷', '/novel/明朝那些事儿3 - 妖孽宫廷.txt'), ('24', '明朝那些事儿4 - 粉饰太平', '/novel/明朝那些事儿4 - 粉饰太平.txt'), ('25', '明朝那些事儿5 - 帝国飘摇', '/novel/明朝那些事儿5 - 帝国飘摇.txt'), ('26', '明朝那些事儿6 - 日落西山', '/novel/明朝那些事儿6 - 日落西山.txt'), ('27', '明朝那些事儿7 - 大结局', '/novel/明朝那些事儿7 - 大结局.txt'), ('28', '七侠五义', '/novel/七侠五义.txt'), ('29', '人间草木', '/novel/人间草木.txt'), ('30', '人间失格', '/novel/人间失格.txt'), ('31', '儒林外史', '/novel/儒林外史.txt'), ('32', '三国演义', '/novel/三国演义.txt'), ('33', '三国志', '/novel/三国志.txt'), ('34', '三体', '/novel/三体.txt'), ('35', '山海经', '/novel/山海经.txt'), ('36', '施公案', '/novel/施公案.txt'), ('37', '说文解字', '/novel/说文解字.txt'), ('38', '隋唐演义', '/novel/隋唐演义.txt'), ('39', '堂吉诃德', '/novel/堂吉诃德.txt'), ('40', '天使与魔鬼', '/novel/天使与魔鬼.txt'), ('41', '雾都孤儿', '/novel/雾都孤儿.txt'), ('42', '希腊神话故事', '/novel/希腊神话故事.txt'), ('43', '野性的呼唤', '/novel/野性的呼唤.txt'), ('44', '月亮与六便士', '/novel/月亮与六便士.txt'), ('45', '战争与和平', '/novel/战争与和平.txt'), ('46', '中华上下五千年', '/novel/中华上下五千年.txt'), ('47', '罪与罚', '/novel/罪与罚.txt');
COMMIT;

-- ----------------------------
--  Table structure for `用户信息`
-- ----------------------------
DROP TABLE IF EXISTS `用户信息`;
CREATE TABLE `用户信息` (
  `手机号` char(11) NOT NULL,
  `密码` char(20) NOT NULL,
  PRIMARY KEY (`手机号`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `用户信息`
-- ----------------------------
BEGIN;
INSERT INTO `用户信息` VALUES ('12345678910', '123456'), ('15897507213', 'wwwszzsdww7983');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
