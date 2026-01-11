import bcrypt from 'bcryptjs';
import { client } from './sanity/client';
import { User } from './types';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const query = `*[_type == "user" && email == $email][0]`;
  const user = await client.fetch(query, { email: email.toLowerCase() });
  return user || null;
}

export async function createUser(
  email: string,
  passwordHash: string,
  firstName: string,
  lastName: string,
  role: 'donor' | 'agency_admin' | 'platform_admin' = 'donor'
): Promise<User> {
  const user = await client.create({
    _type: 'user',
    email: email.toLowerCase(),
    passwordHash,
    firstName,
    lastName,
    role,
    emailVerified: false,
    emailPreferences: {
      donationConfirmations: true,
      campaignUpdates: true,
      platformNews: true,
      recurringReminders: true,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return user as User;
}

export async function updateUserPreferences(
  userId: string,
  preferences: Record<string, boolean>
): Promise<User> {
  const user = await client
    .patch(userId)
    .set({
      emailPreferences: preferences,
      updatedAt: new Date().toISOString(),
    })
    .commit();
  return user as unknown as User;
}

export async function getUserDonations(email: string) {
  const query = `*[_type == "donationEvent" && email == $email] | order(createdAt desc)`;
  const donations = await client.fetch(query, { email: email.toLowerCase() });
  return donations;
}
