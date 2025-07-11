import { NextResponse } from "next/server";

// const uri = process.env.BACKEND_URI;

export async function POST(req: Request) {
    try {
    const formData = await req.formData();
    // const file = formData.get("file") as File;
    const example = await fetch("http://localhost:8000/api/upload", {
            method: "post",
            body: formData,
          }).then((res) => {
            if(!res.ok) {
                // console.log("Failure:" + res.statusText);
                throw new Error('HTTP ' + res.status);
            } else {
              console.log("Success :" + res.text().then(async (result) => {
                
                console.log(result);

                const example2 = await fetch("http://localhost:8000/api/submit/" + result, {
                  method: "post"
                }).then((res) => {
                  if(!res.ok) {
                      // console.log("Failure:" + res.statusText);
                      throw new Error('HTTP ' + res.status);
                  } else {
                    console.log("Success :" + res.json().then((result) => {
                      console.log(result);
                      
                      }));
                      // return res.body // what gives?
                  }
                });

                }));
                // return res.body // what gives?
            }
          });

      console.log("-----------------------");
      

    return NextResponse.json({ status: "success for real" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail", error: e });
  }
}