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
import { Input } from './ui/input'
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import 'react-datepicker/dist/react-datepicker.css'

export const FormFieldType = {
    INPUT: 'input',
    TEXTAREA: 'textarea',
    CHECKBOX: 'checkbox',
    DATE_PICKER: 'datePicker',
    SELECT: 'select',
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
                    <Image
                        src="/icons/calendar.svg"
                        height={20}
                        width={20}
                        alt="user"
                        className="ml-2"
                    />
                    <FormControl>
                        <ReactDatePicker
                            showTimeSelect={props.showTimeSelect ?? false}
                            selected={field.value}
                            onChange={date => field.onChange(date)}
                            timeInputLabel="Time:"
                            dateFormat={props.dateFormat ?? 'MM/dd/yyyy'}
                            wrapperClassName="date-picker"
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
                            <SelectTrigger className="flex rounded-md border border-dark-500 bg-dark-400 col-span-3">
                                <SelectValue placeholder={props.placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="">
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            )
        case FormFieldType.SKELETON:
            return props.renderSkeleton ? props.renderSkeleton(field) : null
        default:
            return null
    }
}

const CustomFormField = props => {
    const { control, name, label } = props

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
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
