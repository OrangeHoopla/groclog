import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async () => {
    try {

        const client = await clientPromise;
        
        const db = client.db("sample_mflix");

        const movies = await db
            .collection("movies")
            .find({})
            .limit(10)
            .toArray();

        return movies.toLocaleString

    } catch (e) {
        console.error(e);
    }

}