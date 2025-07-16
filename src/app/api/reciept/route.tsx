'use server'
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export interface item {
  name: string;
  cost: number;
}
export interface Reciept {
  _id: string;
  store: string,
  address: string,
  items: Array<item>,
  total: number,
  created: Date,
  updated: Date,
  transaction_date: Date,
}


// interface MoviesProps {
//   movies: Reciept[];
// }


export async function POST(req: Request) {
  
  try {
    const formData = await req.json();
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