'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import CustomFormField, { FormFieldType } from '../CustomFormField'
import { SelectItem } from '../ui/select'
import { postPengadaanData } from '@/lib/actions'
import { formatDate, transformPengadaanDataForSubmit } from '@/lib/utils'
import { progress } from '@/data/ProgressSelection'
import { ProgressPengadaanFormValidation } from '@/lib/validation'
import { useEffect } from 'react'

export function AddDataForm() {
    const defaultValues = {
        kode_user: '',
        nodin_user: '',
        tanggal_nodin_user: formatDate(new Date()),
        tim: 'ptt',
        departemen: 'bcp',
        perihal: '',
        nomor_spk: '',
        tanggal_spk: '',
        pelaku_pekerjaan: '',
        metode: undefined,
        is_verification_complete: false,
        nodin_plo: '',
        tanggal_nodin_plo: null,
        is_done: false,
        proses_pengadaan: '',
        catatan: '',
    }

    const form = useForm({
        resolver: zodResolver(ProgressPengadaanFormValidation),
        defaultValues,
    })

    const isVerificationComplete = useWatch({
        control: form.control,
        name: 'is_verification_complete',
    })

    // Reset fields when is_verification_complete is unchecked
    useEffect(() => {
        if (!isVerificationComplete) {
            form.resetField('metode')
            form.resetField('proses_pengadaan')
            form.resetField('nilai_spk')
            form.resetField('anggaran')
            form.resetField('hps')
            form.resetField('tkdn_percentage')
        } else {
            form.resetField('nodin_plo')
            form.resetField('tanggal_nodin_plo')
        }
    }, [isVerificationComplete, form])

    async function onSubmit(data) {
        const transformedData = transformPengadaanDataForSubmit(
            defaultValues,
            data,
        )
        try {
            await postPengadaanData(transformedData)

            toast({
                title: 'Success',
                description: 'Data has been submitted successfully!',
                status: 'success',
            })
        } catch (error) {
            toast({
                title: 'Error',
                description:
                    error.response?.data?.message ||
                    'An error occurred while submitting data.',
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
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="departemen"
                    label="Departemen">
                    <SelectItem value="bcp">BCP</SelectItem>
                    <SelectItem value="igp">IGP</SelectItem>
                    <SelectItem value="psr">PSR</SelectItem>
                </CustomFormField>
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="perihal"
                    label="Perihal"
                    placeholder="Perihal"
                />
                <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="is_verification_complete"
                    label="Verification Complete"
                />
                {isVerificationComplete && (
                    <>
                        <CustomFormField
                            fieldType={FormFieldType.TEXTAREA}
                            control={form.control}
                            name="catatan"
                            label="Catatan"
                            placeholder="Catatan terkait verifikasi"
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
                            name="nomor_spk"
                            label="Nomor SPK"
                            placeholder="Nomor SPK"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.DATE_PICKER}
                            control={form.control}
                            name="tanggal_spk"
                            label="Tanggal SPK"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.NUMERIC}
                            control={form.control}
                            name="nilai_spk"
                            label="Nilai SPK"
                            placeholder="Nilai SPK"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="pelaku_pekerjaan"
                            label="Pelaku Pekerjaan"
                            placeholder="Pelaku Pekerjaan"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.NUMERIC}
                            control={form.control}
                            name="anggaran"
                            label="Anggaran"
                            placeholder="Nilai Anggaran"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.NUMERIC}
                            control={form.control}
                            name="hps"
                            label="HPS"
                            placeholder="Nilai HPS"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.NUMERIC}
                            control={form.control}
                            name="tkdn_percentage"
                            label="TKDN Percentage"
                            placeholder="Persentase TKDN"
                        />
                    </>
                )}
                {!isVerificationComplete && (
                    <>
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="nodin_plo"
                            label="Nodin PLO"
                            placeholder="Nodin PLO"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.DATE_PICKER}
                            control={form.control}
                            name="tanggal_nodin_plo"
                            label="Tanggal Nodin PLO"
                        />
                    </>
                )}

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
