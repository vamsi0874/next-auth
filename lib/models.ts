// import mongoose, { Document, Model } from "mongoose";

// // TypeScript interface for User
// interface IUser extends Document {
//     name: string;
//     email: string;
//     emailVerified?: Date;
//     image?: string;
//     password?: string;
//     accounts: IAccount[];
//     role: UserRole;
//     isTwoFactorEnabled:boolean;
// }

// enum UserRole {
//     ADMIN = "ADMIN",
//     USER = "USER"
// }

// // TypeScript interface for Account
// interface IAccount extends Document {
//     id: string;
//     userId: string;
//     type: string;
//     provider: string;
//     providerAccountId: string;
//     refresh_token?: string;
//     access_token?: string;
//     expires_at?: number;
//     token_type?: string;
//     scope?: string;
//     id_token?: string;
//     session_state?: string;
//     // role: UserRole;
// }
// interface IVerificationToken extends Document {
//     email: string;
//     token: string;
//     expires: Date;
//   }
// interface PasswordResetToken extends Document {
//     email: string;
//     token: string;
//     expires: Date;
//   }
  
//   // Schema for the VerificationToken
 
// // Account Schema
// const accountSchema = new mongoose.Schema<IAccount>({
//     id: { type: String, required: true },
//     userId: { type: String, required: true },
//     type: { type: String, required: true },
//     provider: { type: String, required: true },
//     providerAccountId: { type: String, required: true },
//     refresh_token: String,
//     access_token: String,
//     expires_at: Number,
//     token_type: String,
//     scope: String,
//     id_token: String,
//     session_state: String,
//     // role: { type: String, enum: Object.values(UserRole), required: true } // Role is required in account
// });

// // User Schema
// const userSchema = new mongoose.Schema<IUser>({
//     name: String,
//     email: { type: String, required: true },
//     emailVerified: { type: mongoose.Schema.Types.Date },
//     image: String,
//     password: String,
//     role: { type: String, enum: Object.values(UserRole), default: UserRole.USER }, // Default role is 'USER'
    
//     accounts: [accountSchema],
    
// });

// const verificationTokenSchema = new mongoose.Schema<IVerificationToken>({
//     email: { type: String, required: true, unique: true },  // Unique email
//     token: { type: String, required: true, unique: true },  // Unique token for the email
//     expires: { type: Date, required: true },                // Expiration time for the token
//   });

//   const PasswordResetTokenSchema = new mongoose.Schema<PasswordResetToken>({
//     email: { type: String, required: true,unique: true },  // Unique email
//     token: { type: String, required: true, unique: true },  // Unique token for the email
//     expires: { type: Date, required: true },                // Expiration time for the token
//   });


 
// export const PasswordResetToken: Model<PasswordResetToken> = 
//     mongoose.models?.PasswordResetToken || mongoose.model<PasswordResetToken>("PasswordResetToken", PasswordResetTokenSchema);

     
// export const VerificationToken: Model<IVerificationToken> = 
// mongoose.models?.VerificationToken || mongoose.model<IVerificationToken>("VerificationToken", verificationTokenSchema);


// export const User: Model<IUser> = mongoose.models?.User || mongoose.model<IUser>('User', userSchema);

// export const Account: Model<IAccount> = mongoose.models?.Account || mongoose.model<IAccount>('Account', accountSchema);

"use server"
import mongoose from 'mongoose'


// TypeScript interface for User
interface IUser extends mongoose.Document {
  name: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  password?: string;
  accounts: IAccount[];
  role: UserRole;
  isTwoFactorEnabled: boolean;
}

enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

// TypeScript interface for Account
interface IAccount extends mongoose.Document {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
}

interface IVerificationToken extends mongoose.Document {
  email: string;
  token: string;
  expires: Date;
}

interface PasswordResetToken extends mongoose.Document {
  email: string;
  token: string;
  expires: Date;
}

// Account Schema
const accountSchema = new mongoose.Schema<IAccount>({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  type: { type: String, required: true },
  provider: { type: String, required: true },
  providerAccountId: { type: String, required: true },
  refresh_token: String,
  access_token: String,
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: String,
  session_state: String,
});

// User Schema
const userSchema = new mongoose.Schema<IUser>({
  name: String,
  email: { type: String, required: true },
  emailVerified: { type: mongoose.Schema.Types.Date },
  image: String,
  password: String,
  role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
  accounts: [accountSchema],
});

// VerificationToken Schema
const verificationTokenSchema = new mongoose.Schema<IVerificationToken>({
  email: { type: String, required: true, unique: true },
  token: { type: String, required: true, unique: true },
  expires: { type: Date, required: true },
});

// PasswordResetToken Schema
const passwordResetTokenSchema = new mongoose.Schema<PasswordResetToken>({
  email: { type: String, required: true, unique: true },
  token: { type: String, required: true, unique: true },
  expires: { type: Date, required: true },
});

// Export models if running on the server
export const PasswordResetToken =
  mongoose?.models?.PasswordResetToken || mongoose?.model<PasswordResetToken>("PasswordResetToken", passwordResetTokenSchema);

export const VerificationToken =
  mongoose?.models?.VerificationToken || mongoose?.model<IVerificationToken>("VerificationToken", verificationTokenSchema);

export const User =
  mongoose?.models?.User || mongoose?.model<IUser>("User", userSchema);

export const Account =
  mongoose?.models?.Account || mongoose?.model<IAccount>("Account", accountSchema);
