'use server'
import { NextResponse } from "next/server";

// const uri = process.env.BACKEND_URI;

export async function POST(req: Request) {
    try {
    const formData = await req.formData();

    const example = await fetch("http://localhost:8000/api/upload", {
            method: "post",
            body: formData,
          }).then((res) => {
            if(!res.ok) {
                // console.log("Failure:" + res.statusText);
              return "Fail";
            } else {
              return res.text().then((ressy) => {

                return fetch("http://localhost:8000/api/submit/" + ressy, {
                  method: "post"
                }).then((res) => {
                  if(!res.ok) {
                    return "Fail";
                  } else {
                    
                    return res.json().then((anotherOne) => {
                      // console.log(anotherOne);
                      
                      return anotherOne; //winning response
                    })
                      // return res.body // what gives?
                  }
                });



              })
              
            }
          }).catch((e) => {
            return e;
          });

    console.log(example);
    return NextResponse.json({ response: example });
      
  } catch (e) {
    console.error(e);
    return NextResponse.json({ response: "fail", error: e });
    }
  
}
