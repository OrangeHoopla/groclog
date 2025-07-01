
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
               
                   {movies.map(movie =>
                       
                       <tr key={movie.time } className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                           <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           {movie.time}
                           </th>
                           <td className="px-6 py-4">
                           {movie.time}
                           </td>
                           <td className="px-6 py-4">
                           {movie.time}
                           </td>
                           <td className="px-6 py-4">
                           {movie.time}
                           </td>
                       </tr>
)}
            </>
       );

   } catch (e) {
       console.error(e);
       return { props: { movies: [] } };
   }

};

export default ListAll;


