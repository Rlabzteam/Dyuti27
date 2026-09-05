-- ==============================================================================
-- DYUTI 2027 Conference Delegate Registration & Payment Database Schema
-- Database: MySQL 5.7+ / MySQL 8.0+ / MariaDB 10.3+
-- Charset: utf8mb4 / Collation: utf8mb4_unicode_ci
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `dyuti_conference` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `dyuti_conference`;

-- ------------------------------------------------------------------------------
-- Table 1: registrations
-- Stores complete participant profile, category, paper submissions, and status
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `registrations` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `registration_id` VARCHAR(64) NOT NULL UNIQUE COMMENT 'e.g. DYUTI27-ONLINE-49210 or DYUTI27-REG-12345',
    
    -- Participant Particulars (Section A)
    `title` VARCHAR(20) NOT NULL DEFAULT 'Dr.',
    `full_name` VARCHAR(255) NOT NULL,
    `designation` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(32) NOT NULL,
    `organization` VARCHAR(255) NOT NULL,
    `discipline` VARCHAR(255) NOT NULL,
    
    -- Communication & Contact Details (Section B)
    `address` TEXT NOT NULL,
    `pincode` VARCHAR(20) NOT NULL,
    `phone` VARCHAR(32) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    
    -- Preferences & Logistics (Section C)
    `food_preference` VARCHAR(64) NOT NULL DEFAULT 'veg',
    `food_details` TEXT NULL DEFAULT NULL,
    `require_accommodation` ENUM('yes', 'no') NOT NULL DEFAULT 'no',
    `accommodation_notes` TEXT NULL DEFAULT NULL,
    
    -- Paper Presentation (Section C)
    `is_presenting_paper` ENUM('yes', 'no') NOT NULL DEFAULT 'no',
    `paper_title` TEXT NULL DEFAULT NULL,
    `cmt_paper_id` VARCHAR(64) NULL DEFAULT NULL,
    `paper_theme` VARCHAR(255) NULL DEFAULT NULL,
    
    -- Registration Category & Pricing (Section D)
    `registration_category` VARCHAR(64) NOT NULL COMMENT 'student, scholar, professional',
    `fee_amount` DECIMAL(10, 2) NOT NULL DEFAULT 750.00,
    `currency` VARCHAR(10) NOT NULL DEFAULT 'INR',
    
    -- Payment Metadata & State (Section E)
    `payment_mode` ENUM('online', 'bank_transfer') NOT NULL DEFAULT 'online',
    `payment_status` ENUM('pending', 'success', 'failed', 'refunded', 'cancelled') NOT NULL DEFAULT 'pending',
    
    -- Gateway / Razorpay Identifiers
    `payment_order_id` VARCHAR(128) NULL DEFAULT NULL COMMENT 'Vortexx Gateway Order ID',
    `razorpay_payment_id` VARCHAR(128) NULL DEFAULT NULL COMMENT 'Razorpay Payment ID (pay_xxxx)',
    `razorpay_order_id` VARCHAR(128) NULL DEFAULT NULL COMMENT 'Razorpay Order ID (order_xxxx)',
    `razorpay_signature` VARCHAR(255) NULL DEFAULT NULL,
    `transaction_ref` VARCHAR(128) NULL DEFAULT NULL COMMENT 'Bank Transfer UTR / Reference Number',
    
    -- Audit & Diagnostics
    `ip_address` VARCHAR(64) NULL DEFAULT NULL,
    `user_agent` TEXT NULL DEFAULT NULL,
    `gateway_response` JSON NULL DEFAULT NULL COMMENT 'Full raw payload returned by gateway/webhook',
    
    -- Timestamps
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes for fast lookup & reporting
    INDEX `idx_email` (`email`),
    INDEX `idx_phone` (`phone`),
    INDEX `idx_payment_status` (`payment_status`),
    INDEX `idx_payment_order_id` (`payment_order_id`),
    INDEX `idx_razorpay_payment_id` (`razorpay_payment_id`),
    INDEX `idx_registration_category` (`registration_category`),
    INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Table 2: payment_logs / webhook_events
-- Keeps an immutable audit trail of every webhook or payment event received
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `payment_logs` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `registration_id` VARCHAR(64) NULL DEFAULT NULL,
    `event_type` VARCHAR(64) NOT NULL DEFAULT 'payment.captured' COMMENT 'payment.captured, payment.failed, order.paid, etc.',
    `payment_order_id` VARCHAR(128) NULL DEFAULT NULL,
    `razorpay_payment_id` VARCHAR(128) NULL DEFAULT NULL,
    `status` VARCHAR(32) NOT NULL,
    `amount` DECIMAL(10, 2) NULL DEFAULT NULL,
    `currency` VARCHAR(10) NULL DEFAULT 'INR',
    `raw_payload` LONGTEXT NULL DEFAULT NULL,
    `ip_address` VARCHAR(64) NULL DEFAULT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    INDEX `idx_reg_id` (`registration_id`),
    INDEX `idx_event_type` (`event_type`),
    INDEX `idx_payment_id` (`razorpay_payment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
