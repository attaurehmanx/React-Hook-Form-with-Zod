import { Zodformschema } from "@/lib/Zodschema";

import { NextResponse } from "next/server";

export async function POST (request: Request){
    const data = await request.json();
   
    const result = Zodformschema.safeParse(data)
    let zoderrors = {}
    if(!result.success){
        result.error.issues.forEach((issue) => {
            zoderrors ={...zoderrors, [issue.path[0]]:issue.message}
        })
    }


    return NextResponse.json(
        Object.keys(zoderrors).length > 0
        ?{
            success: false,
            error: zoderrors
        }
        :{
            success: true,
        }
    )
}