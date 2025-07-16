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



const reciept_form = () => (
  <div id="results" className="search-results">
    Some Results
  </div>
)

var reciept: Reciept;
export default function InputFile(this: any) {

  const fileInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [InputValue, setInputValue] = useState();

  const handleChange = (event) => {
    console.log(event.target.value);
    const value = event.target.value;
    setInputValue(value);
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

        // console.log(data);
        // const myElement: HTMLElement = document.getElementById('p1')!;
        // myElement.innerHTML = JSON.stringify(data.response);
        reciept = data.response;
        setShowResults(true);
        console.log(typeof reciept.items);
        console.log(typeof reciept.items);
        
        // setShowResults(true);
        
      });
  });
    router.refresh();

  }

  async function submitReciept() {
    await fetch("/api/reciept/", { method: "POST", body: JSON.stringify(reciept) })
    setShowResults(false);
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
                <Button onClick={uploadFile}>Submit</Button>
                <Button onClick={submitReciept}>Submit Completed Form</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          <div >
          {selectedImage && (
                <Image width={500} height={500}
                  src={URL.createObjectURL(selectedImage)}   
                  alt="Thumb"
                />
              )}
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl">
            {showResults && (
              <>
                <Input type="text" onChange={handleChange} defaultValue={reciept.store} />
                <Input type="text" onChange={handleChange} defaultValue={reciept.address}/>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">Name</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    
                    {/* {reciept.items.map((item) => (
                      <TableRow key={Math.random()}>
                        <TableCell className="font-medium">
                          <Input type="text" value={item[0]} />
                        </TableCell>
                        <TableCell className="font-medium">
                        <Input type="number" value={item[1]}/>
                        </TableCell>

                      </TableRow>
                    ))} */}
                   
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3}>Total</TableCell>
                      <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
                <Button onClick={submitReciept}>Submit Completed Form</Button></>
            )}
              {/* <p id="p1"></p> */}

          </div>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
  
  )
}
