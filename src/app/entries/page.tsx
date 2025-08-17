
import { GetServerSideProps } from "next";
import mongoclient from "@/lib/mongodb";
import { Reciept } from "@/lib/ORM";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { use } from "react";
import { redirect } from "next/navigation";
import { getallItems } from "@/components/backend/items";
import WOW from "@/components/backend/sample";

const client = await mongoclient;
const db = client.db("groclog");
const aaa = await db
        .collection("reciepts")
        .find({})
        .toArray();
            
export default function Entries(input: Array<Reciept>) {
    
    // let sample = use(getallItems());

    

    const handleClick = (input: string) => {
            redirect('/');
          };

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