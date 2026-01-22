'use server'
import { Reciept } from "@/lib/ORM";
import { auth0 } from "@/lib/auth0";
import mongoclient from "@/lib/mongodb";

export async function uploadFile(req: FormData, uri: string) {

        try {

        const result = await fetch(uri + "/api/upload", {
                method: "post",
                body: req,
              }).then((res) => {
                if (!res.ok) {
                  return "Fail";
                } else {

                  return res.json().then((res) => {
                    console.log(res);
                    return res;

                  });
                  
                }
              }).catch((e) => {
                return e;
              });
          
        return result;
          
        }
        catch (e) {
        console.error(e);
        return  "fail"//NextResponse.json({ response: "fail" });
        }
    
}


 
export async function uploadRecieptForm(req: Reciept) {
  const session = await auth0.getSession();
  const user = session?.user;
  req.sub = user?.sub!;

  const client = await mongoclient;
  const db = client.db("groclog");
  const result = await db
    .collection("reciepts")
    .insertOne(req);
  return result;

}