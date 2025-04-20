"use client"
import * as React from "react"
import {Check, ChevronUpDown} from "@mynaui/icons-react"
import {cn} from "@lib/utils"
import {Button} from "@components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {ComboBoxOption, ComboBoxProps} from "@/types/combobox";
import Image from "next/image";

export function ComboBox(props: ComboBoxProps) {
    const {label, placeholder, options, className} = props;
    const [open, setOpen] = React.useState(false)
    const [selection, setSelection] = React.useState("")
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-[200px] justify-between", className)}
                >
                    {selection
                        ? <OptionRow options={options.find((options) => options.name === selection)!}/>
                        : label}
                    <ChevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={placeholder}/>
                    <CommandList>
                        <CommandEmpty>No options found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((options) => (
                                <CommandItem
                                    key={options.name}
                                    value={options.name}
                                    onSelect={(currentValue) => {
                                        setSelection(currentValue === selection ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                    className={"relative"}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selection === options.name ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    <OptionRow options={options}/>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

const OptionRow = (props: { options: ComboBoxOption }) => {
    return (
        <div className={"inline-flex gap-3"}>
            <Image src={props.options.logo} alt={props.options.name} height={20} width={20}/>
            {props.options.name}
        </div>
    )
}
