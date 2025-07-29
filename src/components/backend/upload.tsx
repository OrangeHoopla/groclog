import { NextResponse } from "next/server";


export async function uploadFile(req: FormData) {
    const uri = process.env.BACKEND_URI!;
        try {
        // const formData = await req.f;
        const example = await fetch("http://localhost:8000" + "/api/upload", {
                method: "post",
                body: req,
              }).then((res) => {
                if(!res.ok) {
                  return "Fail";
                } else {
                  return res.text().then((ressy) => {
                    return fetch("http://localhost:8000" + "/api/submit/" + ressy, {
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