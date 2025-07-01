
import mongoclient from "../../lib/mongodb";

export const dynamic = "force-dynamic"; 
export const fetchCache = 'force-no-store';

// interface movie {
//    _id: string;
//    time: string;
// }

const ListAll = async () => {
   try {
       const client = await mongoclient;
       const db = client.db("groclog");
       const movies = await db
           .collection("Entries")
           .find({})
           .limit(20)
           .toArray();

       return (
           <>
               <ul>
                   {movies.map(movie => <li key={movie.time }>{ movie.time}</li>)}
               </ul> 
            </>
       );

   } catch (e) {
       console.error(e);
       return { props: { movies: [] } };
   }

};

export default ListAll;


