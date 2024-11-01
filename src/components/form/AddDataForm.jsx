'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import CustomFormField, { FormFieldType } from '../CustomFormField'
import { SelectItem } from '../ui/select'
import { postPengadaanData } from '@/lib/actions'
import {
    formatDateYMD,
    isProgressAbove,
    transformPengadaanDataForSubmit,
} from '@/lib/utils'
import { progress } from '@/data/ProgressSelection'
import { ProgressPengadaanFormValidation } from '@/lib/validation'
import { useContext, useEffect, useState } from 'react'
import { PulseLoader } from 'react-spinners'
import { PengadaanContext } from '../context/PengadaanContext'
import { useAuth } from '@/hooks/auth'
import divisiData from '@/data/Divisi'
import { ProjectContext } from '../context/ProjectContext'

export function AddDataForm() {
    const { addPengadaan } = useContext(PengadaanContext)
    const { projectData } = useContext(ProjectContext)
    const [isProcessing, setIsProcessing] = useState(false)
    const { user } = useAuth({ middleware: 'auth' })

    const defaultValues = {
        proyek: '',
        kode_user: '',
        nodin_user: '',
        tanggal_nodin_user: formatDateYMD(new Date()),
        tim: 'ptt',
        departemen: user.departemen,
        perihal: '',
        nomor_spk: '',
        tanggal_spk: '',
        pelaksana_pekerjaan: '',
        metode: undefined,
        is_verification_complete: false,
        nodin_plo: '',
        nodin_plos: null,
        tanggal_nodin_plo: undefined,
        proses_pengadaan: '',
        catatan: '',
        pic: {
            id: user.id,
            name: user.name,
        },
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
            form.resetField('catatan')
            form.resetField('metode')
            form.resetField('proses_pengadaan')
            form.resetField('nomor_spk')
            form.resetField('tanggal_spk')
            form.resetField('pelaksana_pekerjaan')
            form.resetField('nilai_spk')
            form.resetField('anggaran')
            form.resetField('hps')
            form.resetField('tanggal_permohonan_anggaran')
            form.resetField('tanggal_permohonan_hps')
            form.resetField('tanggal_terima_anggaran')
            form.resetField('tanggal_terima_hps')
            form.resetField('tkdn_percentage')
        } else {
            form.resetField('nodin_plo')
            form.resetField('tanggal_nodin_plo')
        }
    }, [isVerificationComplete, form])

    async function onSubmit(data) {
        setIsProcessing(true)
        const transformedData = transformPengadaanDataForSubmit(
            defaultValues,
            data,
        )
        try {
            const response = await postPengadaanData(transformedData)

            toast({
                title: 'Success',
                description: 'Data has been submitted successfully!',
                status: 'success',
            })
            addPengadaan({
                id: response.data.id,
                ...transformedData,
                anggaran: JSON.parse(transformedData.anggaran),
                hps: JSON.parse(transformedData.hps),
            })
        } catch (error) {
            toast({
                title: 'Error',
                description:
                    error.response?.data?.message ||
                    'An error occurred while submitting data.',
                status: 'error',
            })
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 mt-6">
                {form.watch('departemen') === 'bcp' && (
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="proyek"
                        label="Proyek">
                        {projectData.map(data => (
                            <SelectItem key={data.kode} value={data.kode}>
                                {data.kode} ({data.nama})
                            </SelectItem>
                        ))}
                    </CustomFormField>
                )}
                <CustomFormField
                    fieldType={FormFieldType.COMBOBOX}
                    control={form.control}
                    name="kode_user"
                    placeholder="Select user"
                    options={divisiData}
                    label="Kode User"
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
                        {form.watch('departemen') === 'bcp' && (
                            <>
                                <CustomFormField
                                    fieldType={FormFieldType.DATE_PICKER}
                                    control={form.control}
                                    name="tanggal_permohonan_anggaran"
                                    label="Tanggal Permohonan Anggaran"
                                    placeholder="Tanggal Permohonan Anggaran"
                                />
                                <CustomFormField
                                    fieldType={FormFieldType.DATE_PICKER}
                                    control={form.control}
                                    name="tanggal_terima_anggaran"
                                    label="Tanggal Terima Anggaran"
                                    placeholder="Tanggal Terima Anggaran"
                                />
                            </>
                        )}
                        <CustomFormField
                            fieldType={FormFieldType.NUMERIC}
                            control={form.control}
                            name="anggaran"
                            label="Anggaran"
                            placeholder="Nilai Anggaran"
                        />
                        {form.watch('departemen') === 'bcp' && (
                            <>
                                <CustomFormField
                                    fieldType={FormFieldType.DATE_PICKER}
                                    control={form.control}
                                    name="tanggal_permohonan_hps"
                                    label="Tanggal Permohonan HPS"
                                    placeholder="Tanggal Permohonan HPS"
                                />
                                <CustomFormField
                                    fieldType={FormFieldType.DATE_PICKER}
                                    control={form.control}
                                    name="tanggal_terima_hps"
                                    label="Tanggal Terima HPS"
                                    placeholder="Tanggal Terima HPS"
                                />
                            </>
                        )}
                        {isProgressAbove(
                            form.watch('metode'),
                            form.watch('proses_pengadaan'),
                            'Penyusunan & Penetapan HPS',
                        ) && (
                            <CustomFormField
                                fieldType={FormFieldType.NUMERIC}
                                control={form.control}
                                name="hps"
                                label="Nilai HPS"
                                placeholder="Nilai HPS"
                            />
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
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="pelaksana_pekerjaan"
                            label="Pelaksana Pekerjaan"
                            placeholder="Pelaksana Pekerjaan"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.NUMERIC}
                            control={form.control}
                            name="nilai_spk"
                            label="Nilai SPK"
                            placeholder="Nilai SPK"
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

                <Button type="submit">
                    {isProcessing ? (
                        <PulseLoader
                            size={8}
                            color="#ffffff"
                            speedMultiplier={0.5}
                        />
                    ) : (
                        'Submit'
                    )}
                </Button>
            </form>
        </Form>
    )
}
