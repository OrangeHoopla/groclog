'use server'
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export interface Item {
  name: string;
  cost: number;
}
export interface Reciept {
  store: string,
  address: string,
  items: Array<Item>,
  total: number,
  created: Date,
  updated: Date,
  transaction_date: Date,
}

// probably should look into using serverside props so i dont have to manually convert strings back into Dates
export async function POST(req: Request) {
  
  try {
    let formData: Reciept = await req.json();
    formData.transaction_date = new Date(formData.transaction_date);
    formData.created = new Date(formData.created);
    formData.updated = new Date(formData.updated);
    // console.log(formData.get("result"))
    // const tell: Reciept = formData.get("result");
    const client = await clientPromise;
    const db = client.db("groclog");
    await db
      .collection("reciepts")
      .insertOne(formData).then((rep) => {
        console.log(rep.insertedId);
      });
    
    return NextResponse.json({ response: "Success" });
} catch (e) {
    console.error(e);
    return NextResponse.json({ response: "FAIL" });
}
}