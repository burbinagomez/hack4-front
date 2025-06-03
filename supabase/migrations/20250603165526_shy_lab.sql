/*
  # Create OTP verification table

  1. New Tables
    - `otp_verifications`
      - `id` (uuid, primary key)
      - `email` (text)
      - `domain` (text)
      - `otp` (text)
      - `expires_at` (timestamptz)
      - `created_at` (timestamptz)
      - `verified` (boolean)

  2. Security
    - Enable RLS on `otp_verifications` table
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS otp_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  domain text NOT NULL,
  otp text NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  verified boolean DEFAULT false
);

ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own verifications"
  ON otp_verifications
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Users can create verifications"
  ON otp_verifications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own verifications"
  ON otp_verifications
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = email);