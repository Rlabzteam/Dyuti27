-- ==========================================================
-- DYUTI 2027 Database Migration: Remove Paper Columns
-- Target Table: `registrations`
-- Target Database: `dyuti_dyuti2027`
-- ==========================================================

ALTER TABLE `registrations` DROP COLUMN `paper_title`;
ALTER TABLE `registrations` DROP COLUMN `cmt_paper_id`;
ALTER TABLE `registrations` DROP COLUMN `paper_theme`;
