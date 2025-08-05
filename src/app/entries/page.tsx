import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import mongoclient from "@/lib/mongodb";
import Link from "next/link";

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
                        
                        {movies.map((item, index) =>
                            
                            <Link key={index} href={"/entries/" + item._id}>
                            <TableRow key={index} >
                                <TableCell className="font-medium">{item.store}</TableCell>
                            <TableCell>{item.items.length}</TableCell>
                            <TableCell>{item.transaction_date.toString()}</TableCell>
                            <TableCell className="text-right">{item.total}</TableCell>
                                </TableRow>
                            </Link>
                            
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