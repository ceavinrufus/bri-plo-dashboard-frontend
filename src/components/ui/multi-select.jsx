import * as React from 'react'
import { cva } from 'class-variance-authority'
import {
    CheckIcon,
    XCircle,
    ChevronDown,
    XIcon,
    WandSparkles,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command'
import { CaretSortIcon } from '@radix-ui/react-icons'

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = cva(
    'm-1 transition ease-in-out delay-150 duration-300',
    {
        variants: {
            variant: {
                default: 'border-foreground/10 text-foreground bg-card',
                secondary:
                    'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive:
                    'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
)

export const MultiSelect = React.forwardRef(
    (
        {
            options,
            onValueChange,
            variant,
            defaultValue = [],
            placeholder = 'Select options',
            maxCount = 3,
            modalPopover = false,
            asChild = false,
            className,
            ...props
        },
        ref,
    ) => {
        const [selectedValues, setSelectedValues] = React.useState(defaultValue)
        const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
        const [inputValue, setInputValue] = React.useState('')
        const [newOptions, setNewOptions] = React.useState(options)

        const handleInputKeyDown = event => {
            console.log(selectedValues)
            if (event.key === 'Enter') {
                const inputValue = event.currentTarget.value.trim()
                if (inputValue && !selectedValues.includes(inputValue)) {
                    setSelectedValues(prev => [...prev, inputValue])
                    onValueChange([...selectedValues, inputValue])
                    setNewOptions(prev => [
                        ...prev,
                        { label: inputValue, value: inputValue },
                    ])
                    event.currentTarget.value = '' // Clear the input after adding
                    setIsPopoverOpen(false) // Close the popover
                }
            } else if (
                event.key === 'Backspace' &&
                !event.currentTarget.value
            ) {
                const newSelectedValues = [...selectedValues]
                newSelectedValues.pop()
                setSelectedValues(newSelectedValues)
                onValueChange(newSelectedValues)
            }
        }

        const toggleOption = option => {
            const newSelectedValues = selectedValues.includes(option)
                ? selectedValues.filter(value => value !== option)
                : [...selectedValues, option]
            setSelectedValues(newSelectedValues)
            onValueChange(newSelectedValues)
        }

        const handleClear = () => {
            setSelectedValues([])
            onValueChange([])
        }

        const handleTogglePopover = () => {
            setIsPopoverOpen(prev => !prev)
        }

        const clearExtraOptions = () => {
            const newSelectedValues = selectedValues.slice(0, maxCount)
            setSelectedValues(newSelectedValues)
            onValueChange(newSelectedValues)
        }

        const toggleAll = () => {
            if (selectedValues.length === newOptions.length) {
                handleClear()
            } else {
                const allValues = newOptions.map(option => option.value)
                setSelectedValues(allValues)
                onValueChange(allValues)
            }
        }

        return (
            <Popover
                open={isPopoverOpen}
                onOpenChange={setIsPopoverOpen}
                modal={modalPopover}>
                <PopoverTrigger asChild>
                    <Button
                        ref={ref}
                        {...props}
                        variant="outline"
                        onClick={handleTogglePopover}
                        className={cn(
                            'w-full flex rounded-md border h-auto border-dark-500 bg-dark-400 col-span-3 justify-between px-3',
                            className,
                        )}>
                        {selectedValues.length > 0 ? (
                            <div className="flex justify-between items-center w-full">
                                <div className="flex flex-wrap items-center">
                                    {selectedValues
                                        .slice(0, maxCount)
                                        .map(value => {
                                            const option = newOptions.find(
                                                o => o.value === value,
                                            )
                                            const IconComponent = option?.icon
                                            return (
                                                <Badge
                                                    key={value}
                                                    className={cn(
                                                        multiSelectVariants({
                                                            variant,
                                                        }),
                                                    )}>
                                                    {IconComponent && (
                                                        <IconComponent className="h-4 w-4 mr-2" />
                                                    )}
                                                    {option?.label}
                                                    <XCircle
                                                        className="ml-2 h-4 w-4 cursor-pointer"
                                                        onClick={event => {
                                                            event.stopPropagation()
                                                            toggleOption(value)
                                                        }}
                                                    />
                                                </Badge>
                                            )
                                        })}
                                    {selectedValues.length > maxCount && (
                                        <Badge
                                            className={cn(
                                                'bg-transparent text-foreground border-foreground/1 hover:bg-transparent',
                                                multiSelectVariants({
                                                    variant,
                                                }),
                                            )}>
                                            {`+ ${selectedValues.length - maxCount} more`}
                                            <XCircle
                                                className="ml-2 h-4 w-4 cursor-pointer"
                                                onClick={event => {
                                                    event.stopPropagation()
                                                    clearExtraOptions()
                                                }}
                                            />
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex items-center justify-between">
                                    <XIcon
                                        className="h-4 mx-2 cursor-pointer text-muted-foreground"
                                        onClick={event => {
                                            event.stopPropagation()
                                            handleClear()
                                        }}
                                    />
                                    <Separator
                                        orientation="vertical"
                                        className="flex min-h-6 h-full"
                                    />
                                    <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between w-full mx-auto text-muted-foreground hover:text-accent-foreground">
                                <span className="text-sm font-normal">
                                    {placeholder}
                                </span>
                                <CaretSortIcon className="h-4 w-4 opacity-50" />
                            </div>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto p-0"
                    align="start"
                    onEscapeKeyDown={() => setIsPopoverOpen(false)}>
                    <Command>
                        <CommandInput
                            placeholder="Search..."
                            onKeyDown={handleInputKeyDown}
                            onValueChange={value => setInputValue(value)}
                        />
                        <CommandList>
                            <CommandEmpty>
                                <div className="flex flex-col items-center justify-center text-center">
                                    <span>No results found.</span>
                                    <span className="text-sm text-muted-foreground">
                                        Press Enter to add "{inputValue}".
                                    </span>
                                </div>
                            </CommandEmpty>
                            <CommandGroup>
                                <CommandItem
                                    key="all"
                                    onSelect={toggleAll}
                                    className="cursor-pointer">
                                    <div
                                        className={cn(
                                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                            selectedValues.length ===
                                                newOptions.length
                                                ? 'bg-primary text-primary-foreground'
                                                : 'opacity-50 [&_svg]:invisible',
                                        )}>
                                        <CheckIcon className="h-4 w-4" />
                                    </div>
                                    <span>(Select All)</span>
                                </CommandItem>
                                {newOptions.map(option => {
                                    const isSelected = selectedValues.includes(
                                        option.value,
                                    )
                                    return (
                                        <CommandItem
                                            key={option.value}
                                            onSelect={() =>
                                                toggleOption(option.value)
                                            }
                                            className="cursor-pointer">
                                            <div
                                                className={cn(
                                                    'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                                    isSelected
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'opacity-50 [&_svg]:invisible',
                                                )}>
                                                <CheckIcon className="h-4 w-4" />
                                            </div>
                                            {option.icon && (
                                                <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                            )}
                                            <span>{option.label}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup>
                                <div className="flex items-center justify-between">
                                    {selectedValues.length > 0 && (
                                        <>
                                            <CommandItem
                                                onSelect={handleClear}
                                                className="flex-1 justify-center cursor-pointer">
                                                Clear
                                            </CommandItem>
                                            <Separator
                                                orientation="vertical"
                                                className="flex min-h-6 h-full"
                                            />
                                        </>
                                    )}
                                    <CommandItem
                                        onSelect={() => setIsPopoverOpen(false)}
                                        className="flex-1 justify-center cursor-pointer max-w-full">
                                        Close
                                    </CommandItem>
                                </div>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        )
    },
)

MultiSelect.displayName = 'MultiSelect'