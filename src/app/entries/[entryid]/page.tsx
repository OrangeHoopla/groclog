import { Table, TableBody, TableCaption, TableHeader, TableRow } from "@/components/ui/table";
import mongoclient from "@/lib/mongodb";
import { Item } from "@/lib/ORM";
import { ObjectId } from "mongodb";


export default async function Entries({ params }:
    { params: Promise<{entryid: string}>; }) {
    const entryid = (await params).entryid;

    const client = await mongoclient;
        const db = client.db("groclog");
        const entry = await db
            .collection("reciepts")
            .findOne({ _id: new ObjectId(entryid) });
        
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
                                {item.name}
                            </TableRow>
                            
                        )}
                 </TableBody>
                 </Table>
             </>

        </div>
    )
}