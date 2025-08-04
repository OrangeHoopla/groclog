import mongoclient from "@/lib/mongodb";
import { ObjectId } from "mongodb";


export default async function Entries({ params }:
    { params: Promise<{entryid: string}>; }) {
    const entryid = (await params).entryid;

    const client = await mongoclient;
        const db = client.db("groclog");
        const entry = await db
            .collection("reciepts")
            .findOne({_id: new ObjectId(entryid)});
        console.log(entry);
    return (
        <div>
            hello

        </div>
    )
}