import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import mongoclient from "@/lib/mongodb";
import { Item } from "@/lib/ORM";
import { ObjectId } from 'bson';

export default async function Entries({ params }:
    { params: Promise<{entryid: ObjectId}>; }) {
    const entryid = (await params).entryid;


    const client = await mongoclient;
        const db = client.db("groclog");
        const entry = await db
            .collection("reciepts")
            .findOne({ _id: entryid });
        
    return (
        <div>
            <>  
                <Table>
                 <TableCaption>Grocery Store Entries</TableCaption>
                 <TableHeader>
                     {/* <TableRow>
                     <TableHead className="w-[100px]">Store</TableHead>
                     <TableHead>Items</TableHead>
                     <TableHead>Time</TableHead>
                     <TableHead className="text-right">Amount</TableHead>
                     </TableRow> */}
                 </TableHeader>
                    <TableBody>
                        
                        { entry && entry.items.map((item : Item, index : number) =>
                            
                            
                            <TableRow key={index}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                
                            </TableRow>
                            
                        )}
                 </TableBody>
                 </Table>
             </>

        </div>
    )
}