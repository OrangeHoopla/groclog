'use client'

import { Reciept } from "@/lib/ORM";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useRouter } from "next/navigation";
import { ObjectId } from "bson";


export default function WOW(aaa: { test: string }) {

    const router = useRouter()
    const handleClick = (input: ObjectId) => {
        
        console.log(input.toString());
        router.push("/entries/" + input.toString());
      };

    let hmm: Array<Reciept> = JSON.parse(aaa.test);

    
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
                        
                        {hmm.map((item, index) =>
                            

                            <TableRow key={index} onClick={() => handleClick(item._id)}>
                                <TableCell className="font-medium">{item.store}</TableCell>
                                <TableCell>{item.items.length}</TableCell>
                                <TableCell>{item.transaction_date.toString()}</TableCell>
                                <TableCell className="text-right">{item.total}</TableCell>
                            </TableRow>

                            
                        )}
                 </TableBody>
                 </Table>
             </>
        );
 
}