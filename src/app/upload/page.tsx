"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useState } from "react";
import Image from 'next/image'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Reciept } from "../api/reciept/route";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
export const dynamic = "force-dynamic"; 
export const fetchCache = 'force-no-store';


let reciept: Reciept = ({"items": [],"store": "", "address":"","total":0,"created":new Date(),"updated":new Date(),"transaction_date":new Date(),"_id": ""});
export default function InputFile() {
  // var reciept = ({} as any) as Reciept;
  const fileInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleAddress = (event: { target: { value: string; }; }) => {
    reciept.address = event.target.value;
  };

  const handleStore = (event: { target: { value: string }; }) => {
    reciept.store = event.target.value;
  };

  const handleTotal = (event: { target: { value: string } }) => {
    reciept.total = Number(event.target.value);
    console.log(reciept);
  };

  const handleItem = (event: { target: { value: string } }, index: number) => {
    reciept.items[index].name = event.target.value;
  };

  const handleCost = (event: { target: { value: string } }, index: number) => {
    reciept.items[index].cost = Number(event.target.value);
  };

  const handleTransactionTime = (event: { target: { value: string; }; }) => {
    reciept.transaction_date = new Date(event.target.value);
    console.log(reciept);
  };

  

  
  async function uploadFile(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    evt.preventDefault();
    const formdata = new FormData();
    const hmm = fileInput.current?.files || null
    const res = hmm?.[0] || null
    formdata.append("file", res!);

    await fetch("/api/", { method: "POST", body: formdata }).then((response) => {
      
      response.json().then((data) => {
        reciept = data.response;
        console.log(reciept);
        
        
      });
  });
    router.refresh();

  }

  async function submitReciept() {
    await fetch("/api/reciept/", { method: "POST", body: JSON.stringify(reciept) })
    
  }

  const handleImageUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files != null) {
      setSelectedImage(evt.target.files[0]); //error
    }
  };


  return (<SidebarProvider>
    <AppSidebar active={"Upload"}/>
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/">
                GrocLog
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Upload</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl">
            <div className="grid w-full max-w-sm items-center gap-3">
            <Card className="w-full max-w-sm">
                <CardContent>
                  <form>
                    <div className="flex flex-col gap-6">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Upload Photo</Label>
                        <Input id="picture"
                          type="file"
                          ref={fileInput}
                          onChange={handleImageUpload}
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                <Button onClick={uploadFile}>Upload Image</Button>
                </CardFooter>
              </Card>
              <Card className="w-full max-w-sm">
                <CardContent>
                <div className="grid gap-3">
                  <Label htmlFor="store">Store Name</Label>
                  <Input id="store" type="text" onChange={handleStore} defaultValue={reciept.store} />
                  </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="address">Store Address</Label>
                  <Input type="text" id="address" onChange={handleAddress} defaultValue={reciept.address} />
                </div>
                  
                <div className="grid gap-3">
                  <Label htmlFor="time">Store Address</Label>
                  <Input type="date" id="time" onChange={handleTransactionTime} />
                </div>
                  
                </CardContent>
                <CardFooter className="flex-col gap-2">
                <Button onClick={submitReciept}>Submit Completed Form</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          <div>
          {selectedImage && (
                <Image width={500} height={500}
                  src={URL.createObjectURL(selectedImage)}   
                  alt="Thumb"
                />
              )}
          </div>
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">Name</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    
                    {reciept.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <Input type="text" onChange={(event) => handleItem(event,index)} defaultValue={item.name}/>

                        </TableCell>
                        <TableCell className="font-medium">
                        <Input type="text" onChange={(event) => handleCost(event,index)} defaultValue={item.name}/>
                        </TableCell>

                      </TableRow>
                    ))}
                   
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={2}>Total</TableCell>
                    <TableCell className="text-right"><Input type="number" onChange={handleTotal} defaultValue={reciept.total} />
                  </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
                
        </div>

      </div>
    </SidebarInset>
  </SidebarProvider>
  
  )
}
