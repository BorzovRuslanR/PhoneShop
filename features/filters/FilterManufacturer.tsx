import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

export default function FilterManufacturer() {
  return (
          <Select>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select a manufacturer" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Manufacturer</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="xiaomi">Xiaomi</SelectItem>
                <SelectItem value="samsung">Samsung</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )
}
