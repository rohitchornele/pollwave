import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: 2,
            maxlength: [50, "Name cannot be more than 50 characters"],
        },
        avatar: {
            type: {
                url: String,
                localPath: String,
            },
            default: {
                url: `https://placehold.co/200x200`,
                localPath: ""
            }
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            unique: true,
            lowercase: true,
            index: true,
            maxlength: [50, "Email cannot be more than 50 characters"],
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please add a valid email",
            ],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be atleast 6 characters"],
            select: false,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        verificationToken: {
            type: String,
            select: false,
        },
        verificationExpire: {
            type: Date,
            select: false,
        },
        resetPasswordToken: {
            type: String,
            select: false,
        },
        resetPasswordExpire: {
            type: Date,
            select: false,
        },
        refreshToken: {
            type: String,
            select: false,
        },
    },
    {
        timestamps: true,
    }
)

userSchema.pre('save', async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// generate email verification token 

// userSchema.methods.getverificationToken = async function () {
//     const verificationToken = crypto.randomBytes(20).toString('hex');
//     this.verificationToken = crypto.createHash("sha256").update(verificationToken).digest('hex');

//     // set expiration 24 hours 
//     this.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000;
//     return verificationToken;
// }



// userSchema.methods.getResetPasswordToken = function () {
//     const resetToken = crypto.randomBytes(20).toString('hex');
//     this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex');

//     this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
//     return resetToken;
// }


const User = mongoose.model("User", userSchema);

export default User;