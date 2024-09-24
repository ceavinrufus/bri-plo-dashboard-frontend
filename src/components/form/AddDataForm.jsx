'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import CustomFormField, { FormFieldType } from '../CustomFormField'
import { SelectItem } from '../ui/select'

// Validation schema based on the model's fillable fields
const FormSchema = z.object({
    kode_user: z.string().min(1, { message: 'Kode user is required.' }),
    nodin_user: z.string().optional(),
    tanggal_nodin_user: z.date().optional(),
    departemen: z.string().min(1, { message: 'Departemen is required.' }),
    perihal: z.string().min(1, { message: 'Perihal is required.' }),
    tanggal_spk: z.date().optional(),
    metode: z
        .enum([
            'Lelang',
            'Pemilihan Langsung',
            'Seleksi Langsung',
            'Penunjukkan Langsung',
        ])
        .optional(),
    is_verification_complete: z.boolean().optional(),
    is_done: z.boolean().optional(),
    proses_pengadaan: z.string().optional(),
    nilai_spk: z.number().optional(),
    anggaran: z.number().optional(),
    hps: z.number().optional(),
    tkdn_percentage: z.number().optional(),
    catatan: z.string().optional(),
})

export function AddDataForm() {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            kode_user: '',
            nodin_user: '',
            tanggal_nodin_user: null,
            departemen: '',
            perihal: '',
            tanggal_spk: null,
            metode: '',
            is_verification_complete: false,
            is_done: false,
            proses_pengadaan: '',
            nilai_spk: null,
            anggaran: null,
            hps: null,
            tkdn_percentage: null,
            catatan: '',
        },
    })

    function onSubmit(data) {
        toast({
            title: 'You submitted the following values:',
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 mt-6">
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="kode_user"
                    label="Kode User"
                    placeholder="Kode User"
                />
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="nodin_user"
                    label="Nodin User"
                    placeholder="Nodin User"
                />
                <CustomFormField
                    fieldType={FormFieldType.DATE_PICKER}
                    control={form.control}
                    name="tanggal_nodin_user"
                    label="Tanggal Nodin User"
                />
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="departemen"
                    label="Departemen"
                    placeholder="Departemen"
                />
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="perihal"
                    label="Perihal"
                    placeholder="Perihal"
                />
                <CustomFormField
                    fieldType={FormFieldType.DATE_PICKER}
                    control={form.control}
                    name="tanggal_spk"
                    label="Tanggal SPK"
                />
                <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="metode"
                    label="Metode">
                    <SelectItem value="Lelang">Lelang</SelectItem>
                    <SelectItem value="Pemilihan Langsung">
                        Pemilihan Langsung
                    </SelectItem>
                    <SelectItem value="Seleksi Langsung">
                        Seleksi Langsung
                    </SelectItem>
                    <SelectItem value="Penunjukkan Langsung">
                        Penunjukkan Langsung
                    </SelectItem>
                </CustomFormField>
                <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="is_verification_complete"
                    label="Verification Complete"
                />
                <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="is_done"
                    label="Done"
                />
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="proses_pengadaan"
                    label="Proses Pengadaan"
                    placeholder="Proses Pengadaan"
                />
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="nilai_spk"
                    label="Nilai SPK"
                    placeholder="Nilai SPK"
                />
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="anggaran"
                    label="Anggaran"
                    placeholder="Anggaran"
                />
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="hps"
                    label="HPS"
                    placeholder="HPS"
                />
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="tkdn_percentage"
                    label="TKDN Percentage"
                    placeholder="TKDN Percentage"
                />
                <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="catatan"
                    label="Catatan"
                    placeholder="Catatan"
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
