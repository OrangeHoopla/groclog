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

let reciept: Reciept;
export default function InputFile() {

  const fileInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
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
        const myElement: HTMLElement = document.getElementById('p1')!;
        myElement.innerHTML = JSON.stringify(data.response);
        reciept = data.response;
        console.log(reciept)
        
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
              {selectedImage && (
                <Image width={500} height={500}
                  src={URL.createObjectURL(selectedImage)}   
                  alt="Thumb"
                />
              )}
            </div>
          </div>
          <div >
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
          <div className="bg-muted/50 aspect-video rounded-xl">
            <p id="p1"></p>

          </div>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
  
  )
}

// export default function UploadForm() {
//   const fileInput = useRef<HTMLInputElement>(null);

//   const router = useRouter();

//   async function uploadFile(
//     evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
//   ) {
//     evt.preventDefault();
//     const formdata = new FormData();
//     const hmm = fileInput.current?.files || null
//     const res = hmm?.[0] || null
//     formdata.append("file", res!);
//     await fetch("/api/", { method: "POST", body: formdata });
//     router.refresh();
//   }

//   return (
//     <form
//       method="POST"
//       action="/api/"
//       className="flex flex-col gap-4"
//     >
//       <label>
//         <span>Upload a file Now</span>
//         <input type="file" name="file" ref={fileInput} />
//       </label>
//       <button type="submit" onClick={uploadFile}>
//         Submit
//       </button>
//     </form>
//   );
// }