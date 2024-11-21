/* eslint-disable no-unused-vars */
import Image from 'next/image'
import ReactDatePicker from 'react-datepicker'

import { Checkbox } from './ui/checkbox'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from './ui/input'
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import 'react-datepicker/dist/react-datepicker.css'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { CaretSortIcon } from '@radix-ui/react-icons'

export const FormFieldType = {
    INPUT: 'input',
    TEXTAREA: 'textarea',
    CHECKBOX: 'checkbox',
    DATE_PICKER: 'datePicker',
    SELECT: 'select',
    COMBOBOX: 'combobox',
    SKELETON: 'skeleton',
}

// interface CustomProps {
//     control: Control<any>
//     name: string
//     label?: string
//     placeholder?: string
//     iconSrc?: string
//     iconAlt?: string
//     disabled?: boolean
//     dateFormat?: string
//     showTimeSelect?: boolean
//     children?: React.ReactNode
//     renderSkeleton?: (field: any) => React.ReactNode
//     fieldType: FormFieldType
// }

const RenderInput = ({ field, props }) => {
    switch (props.fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400 col-span-3">
                    {props.iconSrc && (
                        <Image
                            src={props.iconSrc}
                            height={24}
                            width={24}
                            alt={props.iconAlt || 'icon'}
                            className="ml-2"
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={props.placeholder}
                            {...field}
                            className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.NUMERIC:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400 col-span-3">
                    {props.iconSrc && (
                        <Image
                            src={props.iconSrc}
                            height={24}
                            width={24}
                            alt={props.iconAlt || 'icon'}
                            className="ml-2"
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={props.placeholder}
                            type="number"
                            {...field}
                            className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea
                        placeholder={props.placeholder}
                        {...field}
                        className="col-span-3"
                        disabled={props.disabled}
                    />
                </FormControl>
            )
        case FormFieldType.CHECKBOX:
            return (
                <FormControl>
                    <div className="flex items-center gap-4 col-span-3">
                        <Checkbox
                            id={props.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                        <label htmlFor={props.name} className="checkbox-label">
                            {props.label}
                        </label>
                    </div>
                </FormControl>
            )
        case FormFieldType.DATE_PICKER:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400 col-span-3">
                    {props.iconSrc && (
                        <Image
                            src={props.iconSrc}
                            height={24}
                            width={24}
                            alt={props.iconAlt || 'icon'}
                            className="ml-2"
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={props.placeholder}
                            type="date"
                            {...field}
                            className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="flex h-[38px] rounded-md border border-dark-500 bg-dark-400 col-span-3">
                                <SelectValue placeholder={props.placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="">
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            )
        case FormFieldType.COMBOBOX:
            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                    'w-full flex rounded-md border border-dark-500 bg-dark-400 col-span-3 justify-between px-3',
                                    !field.value && 'text-muted-foreground',
                                )}>
                                <p className="overflow-hidden font-normal">
                                    {field.value
                                        ? props.options.find(
                                              option =>
                                                  option.value === field.value,
                                          )?.label
                                        : 'Select user'}
                                </p>
                                <CaretSortIcon className="h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                        onWheel={e => {
                            e.stopPropagation()
                        }}
                        className="p-0">
                        <Command>
                            <CommandInput
                                placeholder={props.placeholder}
                                autoFocus={true}
                            />
                            <CommandList>
                                <CommandEmpty>No options found.</CommandEmpty>
                                <CommandGroup>
                                    {props.options.map(option => (
                                        <CommandItem
                                            value={option.value}
                                            key={option.label}
                                            onSelect={field.onChange}>
                                            <Check
                                                className={cn(
                                                    'mr-2 h-4 w-4',
                                                    option.value === field.value
                                                        ? 'opacity-100'
                                                        : 'opacity-0',
                                                )}
                                            />
                                            {option.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            )
        case FormFieldType.SKELETON:
            return props.renderSkeleton ? props.renderSkeleton(field) : null
        default:
            return null
    }
}

const CustomFormField = props => {
    const { control, name, label, isLabelInline = true } = props

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem
                    className={cn(
                        isLabelInline
                            ? 'grid grid-cols-4 items-center gap-4'
                            : '',
                    )}>
                    {props.fieldType !== FormFieldType.CHECKBOX && label && (
                        <FormLabel className="shad-input-label">
                            {label}
                        </FormLabel>
                    )}
                    <RenderInput field={field} props={props} />

                    <FormMessage className="shad-error" />
                </FormItem>
            )}
        />
    )
}

export default CustomFormField
