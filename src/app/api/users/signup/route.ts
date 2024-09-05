import connect from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password, username } = reqBody
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ message: "User is Already Exist !", statusCode: 400 })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            email,
            username,
            password: hashedPassword
        })
        const savedUser = await newUser.save()
        return NextResponse.json({
            message: "User created sucessfully",
            statusCode: '000',
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 })
    }
}
connect()