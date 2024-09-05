import connect from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ message: "User doesn't Exist !", statusCode: 400 })
        }

        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ message: "Not a valid Password !", statusCode: 400 })
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        const response = NextResponse.json({
            messaage: "Login Sucessfull",
            statusCode: "000",
        })

        response.cookies.set("token", token, { httpOnly: true })

        return response
    } catch (error: any) {
        return NextResponse.json({ message: error.message },
            { status: 500 })
    }
}
connect()