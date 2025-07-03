
import mongoclient from "../../lib/mongodb";

export const dynamic = "force-dynamic"; 
export const fetchCache = 'force-no-store';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

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
               <Table>
                <TableCaption>Grocery Store Entries</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Items</TableHead>
                    <TableHead>Store</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                       {movies.map(movie =>
                           <TableRow key={movie.time}>
                               <TableCell className="font-medium">{movie.time}</TableCell>
                           <TableCell>{movie.time}</TableCell>
                           <TableCell>{movie.time}</TableCell>
                           <TableCell className="text-right">{movie.time}</TableCell>
                           </TableRow>
                       )}
                </TableBody>
                </Table>
            </>
       );

   } catch (e) {
       console.error(e);
       return (
           <>
               <h1>Loading</h1>
           </>
       );
   }

};

export default ListAll;


