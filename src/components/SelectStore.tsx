import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectStore() {
  return (
    <Select>
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
  )
}