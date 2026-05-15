import { Resend } from "resend";
import ApiError from "../api-error.js";

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (to, subject, html) => {

    try {
        const { data, error } = await resend.emails.send({
            from: `${process.env.EMAIL_USER}`,
            to: [to],
            subject,
            html,
        })

        if (error) {
            throw ApiError.badRequest({ error })
        } else {
            console.log(data)
        }
    } catch (error) {
        throw ApiError.badRequest({ error })
    }
}


export const sendVerificationEmail = async (email, token) => {

    try {
        const { data, error } = await resend.emails.send({
            from: `${process.env.EMAIL_USER}`,
            email,
            subject,
            html,
        })

        if (error) {
            throw ApiError.badRequest({ error })
        } else {
            console.log(data)
        }
    } catch (error) {
        throw ApiError.badRequest({ error })
    }
}

