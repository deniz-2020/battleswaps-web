"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

type SelectInputItem = {
  value: string;
  text: string;
};

type SelectInputProps = {
  items: SelectInputItem[];
  onChange: (...event: any[]) => void;
  callback: (...params: any[]) => void;
  placeholder?: string;
};

const SelectInput = ({
  items,
  onChange,
  callback,
  placeholder,
}: SelectInputProps) => (
  <Select
    onValueChange={(value) => {
      onChange(value);
      callback(value);
    }}
  >
    <SelectTrigger>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {items.map((item, index) => {
        return (
          <SelectItem key={index + 1} value={item.value}>
            {item.text}
          </SelectItem>
        );
      })}
    </SelectContent>
  </Select>
);

export { SelectInput, type SelectInputItem };
