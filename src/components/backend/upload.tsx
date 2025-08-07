'use server'
import { Reciept } from "@/lib/ORM";
import { NextResponse } from "next/server";
import mongoclient from "@/lib/mongodb";

export async function uploadFile(req: FormData, uri: string) {
  // const uri = process.env.BACKEND_URI!;
  console.log(uri);
        try {
        // const formData = await req.f;
        const example = await fetch(uri + "/api/upload", {
                method: "post",
                body: req,
              }).then((res) => {
                if(!res.ok) {
                  return "Fail";
                } else {
                  return res.text().then((ressy) => {
                    return fetch(uri + "/api/submit/" + ressy, {
                      method: "post",
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "StoreProcessor": "WholeFoods :(",
                        "ImageProcessor": "Generic"
                     }
                    }).then((res) => {
                      if(!res.ok) {
                        return "Fail";
                      } else {
                        
                        return res.json().then((anotherOne) => {
                          
                          return anotherOne; //winning response
                        })
                      }
                    });
                  })
                  
                }
              }).catch((e) => {
                return e;
              });
        return NextResponse.json({ response: example });
          
      } catch (e) {
        console.error(e);
        return NextResponse.json({ response: "fail", error: e });
        }
    
}
  
export async function uploadRecieptForm(req: Reciept) {

  const client = await mongoclient;
  const db = client.db("groclog");
  const result = await db
    .collection("reciepts")
    .insertOne(req);
  return result;

}