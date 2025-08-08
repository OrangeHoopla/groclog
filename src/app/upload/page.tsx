"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useState } from "react";
import Image from 'next/image'

import { Input } from "@/components/ui/input"
import { uploadFile, uploadRecieptForm } from "@/components/backend/upload"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Item, Reciept } from "@/lib/ORM";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
export const dynamic = "force-dynamic"; 
export const fetchCache = 'force-no-store';


let reciept: Reciept = ({"items": [],"store": "", "address":"","total":0,"created":new Date(),"updated":new Date(),"transaction_date": new Date()});
export default function InputFile() {

  // General state variables
  const fileInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [Items, setItems] = useState(Array<Item>);
  const [Processor, SetProcessor] = useState<string>("WholeFoods");


  const handleProcessor = (event: string) => {
    SetProcessor(event);
    console.log(Processor);
  }
  const handleAddress = (event: { target: { value: string; }; }) => {
    reciept.address = event.target.value;
  };

  const handleStore = (event: { target: { value: string }; }) => {
    reciept.store = event.target.value;
  };

  const handleTotal = (event: { target: { value: string } }) => {
    reciept.total = Number(event.target.value);
  };

  const handleItem = (event: { target: { value: string } }, index: number) => {
    const item: Item = Items.at(index)!
    item.name = event.target.value;
    const temp = [...Items];
    temp.splice(index, 1, item);
    setItems(temp);
  };

  const handleCost = (event: { target: { value: string } }, index: number) => {
    const item: Item = Items.at(index)!
    item.cost = Number(event.target.value);
    const temp = [...Items];
    temp.splice(index, 1, item);
    setItems(Items => Items.slice(0,index-1).concat(Items.slice(index+1,Items.length)));
  };

  const handleTransactionTime = (event: { target: { value: string; }; }) => {
    reciept.transaction_date = new Date(event.target.value);
  };

  async function addItem() {
    setItems([
      { name: "", cost: 0 },
      ...Items
    ]);
  }

  const deleteItem = (index: number) => {
    const newArray = [
      ...Items.slice(0, index), // Elements before the one to delete
      ...Items.slice(index + 1) // Elements after the one to delete
    ];
    setItems(newArray);
  }
  
  async function saveFile(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    evt.preventDefault();
    const formdata = new FormData();
    const hmm = fileInput.current?.files || null
    const res = hmm?.[0] || null
    formdata.append("file", res!);
    const uri = process.env.BACKEND_URI!;

    const test = await uploadFile(formdata,uri).then((data) => {

      return data.json();
      
    });
    reciept = test.response;
    setItems(test.response.items)
    console.log(test.response); // nice to see if error occurs
    router.refresh();

  }

   function submitReciept() { //TODO test later
     reciept.items = Items;

    uploadRecieptForm(reciept);
    
  }

  const handleImageUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files != null) {
      setSelectedImage(evt.target.files[0]); //error
    }
  };


  return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl">
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
                      <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline">Advanced Options</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                              <DropdownMenuLabel>Text Processors</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuCheckboxItem>
                              <Select onValueChange={handleProcessor}>
                                              <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a Store" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectGroup>
                                                  <SelectLabel>Stores</SelectLabel>
                                                  <SelectItem value="Whole Foods">Whole Foods</SelectItem>
                                                  <SelectItem value="Aldi">Aldi</SelectItem>
                                                  <SelectItem value="Giant">Giant</SelectItem>
                                                  <SelectItem value="Publix">Publix</SelectItem>
                                                  <SelectItem value="Costco">Costco</SelectItem>
                                                </SelectGroup>
                                              </SelectContent>
                                            </Select>
                              </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                      
                      </div>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                <Button onClick={saveFile}>Upload Image</Button>
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
        <Button onClick={addItem}>Add Entry</Button>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">Name</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    
                    { Items && Items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <Input type="text" onChange={(event) => handleItem(event,index)} value={item.name}/>

                        </TableCell>
                        <TableCell className="font-medium">
                        <Input type="text" onChange={(event) => handleCost(event,index)} value={item.cost}/>
                        </TableCell>
                        <TableCell><Button onClick={() => deleteItem(index)} variant="ghost"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg></Button></TableCell>
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
  )
}
