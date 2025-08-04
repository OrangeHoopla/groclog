import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import mongoclient from "@/lib/mongodb";

export default async function Entries() {

    try {
        const client = await mongoclient;
        const db = client.db("groclog");
        const movies = await db
            .collection("reciepts")
            .find({})
            .toArray();
        console.log(movies);
        return (
            <>  
                <Table>
                 <TableCaption>Grocery Store Entries</TableCaption>
                 <TableHeader>
                     <TableRow>
                     <TableHead className="w-[100px]">Store</TableHead>
                     <TableHead>Items</TableHead>
                     <TableHead>Time</TableHead>
                     <TableHead className="text-right">Amount</TableHead>
                     </TableRow>
                 </TableHeader>
                    <TableBody>
                        
                        {movies.map(movie =>
                            
                            
                            <TableRow key={movie.created} data-href={"/entries/" + movie._id}>
                                <TableCell className="font-medium">{movie.store}</TableCell>
                            <TableCell>{movie.items.length}</TableCell>
                            <TableCell>{movie.transaction_date.toString()}</TableCell>
                            <TableCell className="text-right">{movie.total}</TableCell>
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
}