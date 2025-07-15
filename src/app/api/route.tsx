'use server'
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; 
export const fetchCache = 'force-no-store';
// const uri = process.env.BACKEND_URI;

export async function POST(req: Request) {
    try {
    const formData = await req.formData();
    const uri = process.env.BACKEND_URI!;
    const example = await fetch(uri + "/api/upload", {
            method: "post",
            body: formData,
          }).then((res) => {
            if(!res.ok) {
              return "Fail";
            } else {
              return res.text().then((ressy) => {
                return fetch(uri + "/api/submit/" + ressy, {
                  method: "post"
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
