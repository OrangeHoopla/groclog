import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";

const uri = process.env.BACKEND_URI;

export async function POST(req: Request) {
    try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    const example = await fetch("http://localhost:8000/api/upload", {
            method: "post",
            body: formData,
          });
        // console.log("success?")
        console.log(example);
    return NextResponse.json({ status: "success for real" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail", error: e });
  }
}