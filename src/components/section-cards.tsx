
'use server'
import mongodbclient from "@/lib/mongodb";

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { auth0 } from "@/lib/auth0";


export async function SectionCards() {
  const session = await auth0.getSession();
  const user = session?.user;

  //sum of all expenses
  const client = await mongodbclient;
  const db = client.db("groclog");
  const movies = await db
    .collection("reciepts")
    .aggregate([
    {
      $match: {
        "sub": user?.sub
      },              
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$total"
        }
      } 
    }
    ]).toArray();
  
  const itemCount = await db
    .collection("reciepts")
    .aggregate([
      {
        $match: {
          "sub": user?.sub
        }              
      },
      { 
        $group: { 
            _id: null, 
            total: { 
                $sum: { $size:"$items" }
            } 
        } 
      }
    ]).toArray();
  
  const storeVisits = await db
    .collection("reciepts")
    .aggregate([
      {
        $match: {
          "sub": user?.sub
        }
      },
      {
        $count: "tots"
      }
    ]).toArray();
  
  // console.log(movies[0].total);
  // console.log(itemCount)
    return (
      <>
     <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Cost this Month</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              ${ movies[0].total }
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month 
          </div>
          <div className="text-muted-foreground">
            X Visits to the store this month
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Items this Month</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            { itemCount[0].total }
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period 
          </div>
          <div className="text-muted-foreground">
            lower than year average
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Number of Store Visits</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            { storeVisits[0].tots }
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending Up
          </div>
          <div className="text-muted-foreground">Above set ideal</div>
        </CardFooter>
            </Card>
            </>

  )
}