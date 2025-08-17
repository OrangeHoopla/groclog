
import mongoclient from "@/lib/mongodb";
import WOW from "@/components/backend/sample";

const client = await mongoclient;
const db = client.db("groclog");
const aaa = await db
        .collection("reciepts")
        .find({})
        .toArray();
            
export default function Entries() {
    
    // let sample = use(getallItems());


        return (
            <>  
                <WOW test = {JSON.stringify(aaa) }/>

             </>
        );
 
}

// export async function recieve() {
//     try {
//         const client = await mongoclient;
//         const db = client.db("groclog");
//         const movies = await db
//                 .collection("reciepts")
//                 .find({})
//                 .toArray();
//         return {
//             props: { movies: JSON.parse(JSON.stringify(movies)) },
//         };
//     } catch (e) {
 
//         console.error(e);
 
//         return { props: { movies: JSON } };
 
//     }
 
//  };