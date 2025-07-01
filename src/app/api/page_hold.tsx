
import mongoclient from "../../../lib/mongodb";

export const dynamic = "force-dynamic"; 
export const fetchCache = 'force-no-store';

// interface movie {
//    _id: string;
//    time: string;
// }

// const Movies: React.FC<MoviesProps> = ({ movies }) => {

//    return (
//        <div>
//            <h1>Top 20 Movies of All Time</h1>
//            <p>
//                <small>(According to Metacritic)</small>
//            </p>
//            <ul>
//                {movies.map((movie) => (
//                    <li key={movie._id}>
//                        <h2>{movie._id}</h2>
//                        <h3>{movie.time}</h3>
//                    </li>
//                ))}
//            </ul>
//        </div>
//    );

// };

// export default Movies;

export const aaaa = async () => {
   try {
       const client = await mongoclient;
       const db = client.db("groclog");
       const movies = await db
           .collection("Entries")
           .find({})
           .limit(20)
           .toArray();
    //    const lala: movie[] = await movies;

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

export default aaaa;

