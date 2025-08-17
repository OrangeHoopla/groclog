'use server'
import mongoclient from "@/lib/mongodb";

export async function getallItems() {

    const client = await mongoclient;
    const db = client.db("groclog");
    const movies = await db
            .collection("reciepts")
            .find({})
            .toArray();
    console.log(movies);
    
    return movies;

}

