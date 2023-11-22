import db from "@/db/models";
import { NextRequest, NextResponse } from "next/server";

const model: any = db

export async function POST(req: NextRequest, res: NextResponse) {
    try{
        const body = await req.json()
        const data = await model.User.create({
          email:  body.email,
          name: body.name,
          password: body.password

        })
        return NextResponse.json({data})
    } catch (err) {
        return NextResponse.json({data: err})
    }
}