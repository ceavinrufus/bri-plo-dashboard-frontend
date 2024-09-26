'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import CustomFormField, { FormFieldType } from '../CustomFormField'
import { SelectItem } from '../ui/select'
import { formatDate } from '@/lib/utils'
import { progress } from '@/data/ProgressSelection'
import { updatePengadaanData } from '@/lib/actions'
import { useContext } from 'react'
import { PengadaanContext } from '../context/PengadaanContext'

// Validation schema based on the model's fillable fields
const FormSchema = z.object({
    kode_user: z.string().min(1, { message: 'Kode user is required.' }),
    nodin_user: z.string().optional(),
    tanggal_nodin_user: z.union([z.string(), z.date()]).optional(),
    tim: z.string(),
    departemen: z.enum(['bcp', 'igp', 'psr']),
    perihal: z.string().min(1, { message: 'Perihal is required.' }),
    tanggal_spk: z.union([z.string(), z.date()]).optional(),
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

export function EditDataForm({ defaultValues }) {
    const { updatePengadaan } = useContext(PengadaanContext)

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            ...defaultValues,
            metode: defaultValues.metode || undefined,
        },
    })

    async function onSubmit(data) {
        const transformedData = {
            ...data,
            tanggal_nodin_user: formatDate(data.tanggal_nodin_user),
            tanggal_spk: formatDate(data.tanggal_spk),
            nilai_spk: data.nilai_spk ? parseInt(data.nilai_spk) : null,
            anggaran: data.anggaran ? parseInt(data.anggaran) : null,
            hps: data.hps ? parseInt(data.hps) : null,
            tkdn_percentage: data.tkdn_percentage
                ? parseInt(data.tkdn_percentage)
                : null,
            verification_alert_at: data.is_verification_complete
                ? null
                : defaultValues.verification_alert_at
                  ? defaultValues.verification_alert_at
                  : formatDate(new Date(Date.now() + 86400000)), // Add 1 day in milliseconds
        }

        try {
            await updatePengadaanData(defaultValues.id, transformedData)

            toast({
                title: 'Success',
                description: 'Data has been edited successfully!',
                status: 'success',
            })
            updatePengadaan(defaultValues.id, transformedData)
        } catch (error) {
            toast({
                title: 'Error',
                description:
                    error.response?.data?.message ||
                    'An error occurred while editing data.',
                status: 'error',
            })
        }
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
                {form.watch('is_verification_complete') && (
                    <>
                        {form.watch('metode') && (
                            <CustomFormField
                                fieldType={FormFieldType.SELECT}
                                control={form.control}
                                name="proses_pengadaan"
                                label="Proses Pengadaan">
                                {progress[form.watch('metode')].map(
                                    (item, index) => (
                                        <SelectItem key={index} value={item}>
                                            {item}
                                        </SelectItem>
                                    ),
                                )}
                            </CustomFormField>
                        )}
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
                    </>
                )}
                <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="catatan"
                    label="Catatan"
                    placeholder="Catatan"
                />
                <Button type="submit">Save</Button>
            </form>
        </Form>
    )
}
