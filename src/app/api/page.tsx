
import clientPromise from "../../../lib/mongodb";

export const dynamic = "force-dynamic"; 
export const fetchCache = 'force-no-store';

export default async () => {

    try {

        const client = await clientPromise;
        
        const db = client.db("groclog");
        

        const entries = await db.collection("Entries")
        const movies = await entries.find({})
            .limit(10)
            .toArray();
        console.log(movies);
        // return NextResponse.json({ message: "Hello - GET" }, { status: 200 });
        return movies[0].time + " " + movies[1].time

    } catch (e) {
        console.error(e);
    }

}

