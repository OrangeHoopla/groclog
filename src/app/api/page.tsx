import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async () => {

    try {

        const client = await clientPromise;
        
        const db = client.db("groclog");

        const movies = await db
            .collection("Entries")
            .find({})
            .limit(10)
            .toArray();
        console.log(movies);
        // return NextResponse.json({ message: "Hello - GET" }, { status: 200 });
        return movies[0].time

    } catch (e) {
        console.error(e);
    }

}

