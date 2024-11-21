'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Form, FormLabel } from '@/components/ui/form'
import CustomFormField, { FormFieldType } from '../CustomFormField'
import { SelectItem } from '../ui/select'
import { isProgressAbove, transformPengadaanDataForSubmit } from '@/lib/utils'
import { progress } from '@/data/ProgressSelection'
import { updatePengadaanData } from '@/lib/actions'
import { useContext, useEffect, useState } from 'react'
import { PengadaanContext } from '../context/PengadaanContext'
import { ProgressPengadaanFormValidation } from '@/lib/validation'
import { PulseLoader } from 'react-spinners'
import divisiData from '@/data/Divisi'
import { ProjectContext } from '../context/ProjectContext'
// import { NodinCollapsible } from '../NodinCollapsible'

export function EditDataForm({ defaultValues }) {
    const { updatePengadaan } = useContext(PengadaanContext)
    const { projectData } = useContext(ProjectContext)
    const [isProcessing, setIsProcessing] = useState(false)

    const form = useForm({
        resolver: zodResolver(ProgressPengadaanFormValidation),
        defaultValues: {
            ...defaultValues,
            metode: defaultValues.metode || undefined,
            // nodin_plo:
            //     defaultValues.nodin_plos && defaultValues.nodin_plos.length > 0
            //         ? defaultValues.nodin_plos[
            //               defaultValues.nodin_plos.length - 1
            //           ].nodin
            //         : '',
            // tanggal_nodin_plo:
            //     defaultValues.nodin_plos && defaultValues.nodin_plos.length > 0
            //         ? formatDateYMD(
            //               defaultValues.nodin_plos[
            //                   defaultValues.nodin_plos.length - 1
            //               ].tanggal_nodin,
            //           )
            //         : '',
            nodin_user: '',
            tanggal_nodin_user: '',
            nodin_plo: '',
            tanggal_nodin_plo: '',
            tanggal_permohonan_anggaran:
                defaultValues.anggaran?.tanggal_permohonan,
            tanggal_permohonan_hps: defaultValues.hps?.tanggal_permohonan,
            tanggal_terima_anggaran: defaultValues.anggaran?.tanggal_terima,
            tanggal_terima_hps: defaultValues.hps?.tanggal_terima,
            anggaran: defaultValues.anggaran?.amount,
            anggaran_currency: defaultValues.anggaran?.currency,
            anggaran_rate: defaultValues.anggaran?.rate,
            hps: defaultValues.hps?.amount,
            hps_currency: defaultValues.hps?.currency,
            hps_rate: defaultValues.hps?.rate,
            nilai_spk: defaultValues.spk?.amount,
            spk_currency: defaultValues.spk?.currency,
            spk_rate: defaultValues.spk?.rate,
            catatan: defaultValues.catatan || '',
            nomor_spk: defaultValues.nomor_spk || '',
            proses_pengadaan: defaultValues.proses_pengadaan || '',
            pelaksana_pekerjaan: defaultValues.pelaksana_pekerjaan || '',
            is_verification_complete:
                defaultValues.is_verification_complete || false,
        },
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
            form.resetField('tanggal_acuan')
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
            const response = await updatePengadaanData(
                defaultValues.id,
                transformedData,
            )
            console.log(transformedData)
            console.log(response.data)
            transformedData.nodin_plos = response.data.nodin_plos
            transformedData.nodin_users = response.data.nodin_users

            toast({
                title: 'Success',
                description: 'Data has been edited successfully!',
                status: 'success',
            })
            updatePengadaan(defaultValues.id, {
                ...transformedData,
                anggaran: JSON.parse(transformedData.anggaran),
                hps: JSON.parse(transformedData.hps),
                spk: JSON.parse(transformedData.spk),
            })
        } catch (error) {
            toast({
                title: 'Error',
                description:
                    error.response?.data?.message ||
                    'An error occurred while editing data.',
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
                    label="Nodin User Baru"
                    placeholder="Nodin User"
                />
                <CustomFormField
                    fieldType={FormFieldType.DATE_PICKER}
                    control={form.control}
                    name="tanggal_nodin_user"
                    label="Tanggal Nodin User Baru"
                />
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
                        {isProgressAbove(
                            form.watch('metode'),
                            form.watch('proses_pengadaan'),
                            'Izin Pengadaan',
                        ) && (
                            <CustomFormField
                                fieldType={FormFieldType.DATE_PICKER}
                                control={form.control}
                                name="tanggal_acuan"
                                label={`Tanggal ${form.watch(
                                    'proses_pengadaan',
                                )}`}
                                placeholder={`Tanggal ${form.watch(
                                    'proses_pengadaan',
                                )}`}
                            />
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
                        <div className="grid grid-cols-4 items-center gap-1">
                            <FormLabel className="shad-input-label">
                                Anggaran
                            </FormLabel>
                            <CustomFormField
                                fieldType={FormFieldType.NUMERIC}
                                control={form.control}
                                isLabelInline={false}
                                name="anggaran"
                                label="Anggaran"
                                placeholder="Nilai Anggaran"
                            />
                            <CustomFormField
                                fieldType={FormFieldType.SELECT}
                                control={form.control}
                                isLabelInline={false}
                                name="anggaran_currency"
                                label="Currency"
                                placeholder="Select Currency">
                                <SelectItem value="IDR">IDR</SelectItem>
                                <SelectItem value="USD">USD</SelectItem>
                                <SelectItem value="EUR">EUR</SelectItem>
                            </CustomFormField>
                            <CustomFormField
                                fieldType={FormFieldType.NUMERIC}
                                control={form.control}
                                isLabelInline={false}
                                name="anggaran_rate"
                                label="Rate to IDR"
                                placeholder="Rate to IDR"
                            />
                        </div>
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
                            <div className="grid grid-cols-4 items-center gap-1">
                                <FormLabel className="shad-input-label">
                                    HPS
                                </FormLabel>
                                <CustomFormField
                                    fieldType={FormFieldType.NUMERIC}
                                    control={form.control}
                                    isLabelInline={false}
                                    name="hps"
                                    label="Nilai HPS"
                                    placeholder="Nilai HPS"
                                />
                                <CustomFormField
                                    fieldType={FormFieldType.SELECT}
                                    control={form.control}
                                    isLabelInline={false}
                                    name="hps_currency"
                                    label="Currency"
                                    placeholder="Select Currency">
                                    <SelectItem value="IDR">IDR</SelectItem>
                                    <SelectItem value="USD">USD</SelectItem>
                                    <SelectItem value="EUR">EUR</SelectItem>
                                </CustomFormField>
                                <CustomFormField
                                    fieldType={FormFieldType.NUMERIC}
                                    control={form.control}
                                    isLabelInline={false}
                                    name="hps_rate"
                                    label="Rate to IDR"
                                    placeholder="Rate to IDR"
                                />
                            </div>
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
                        <div className="grid grid-cols-4 items-center gap-1">
                            <FormLabel className="shad-input-label">
                                SPK
                            </FormLabel>
                            <CustomFormField
                                fieldType={FormFieldType.NUMERIC}
                                control={form.control}
                                isLabelInline={false}
                                name="nilai_spk"
                                label="Nilai SPK"
                                placeholder="Nilai SPK"
                            />
                            <CustomFormField
                                fieldType={FormFieldType.SELECT}
                                control={form.control}
                                isLabelInline={false}
                                name="spk_currency"
                                label="Currency"
                                placeholder="Select Currency">
                                <SelectItem value="IDR">IDR</SelectItem>
                                <SelectItem value="USD">USD</SelectItem>
                                <SelectItem value="EUR">EUR</SelectItem>
                            </CustomFormField>
                            <CustomFormField
                                fieldType={FormFieldType.NUMERIC}
                                control={form.control}
                                isLabelInline={false}
                                name="spk_rate"
                                label="Rate to IDR"
                                placeholder="Rate to IDR"
                            />
                        </div>
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
                        {/* <NodinCollapsible nodins={defaultValues.nodin_plos} /> */}
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="nodin_plo"
                            label="Nodin PLO Baru"
                            placeholder="Nodin PLO"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.DATE_PICKER}
                            control={form.control}
                            name="tanggal_nodin_plo"
                            label="Tanggal Nodin PLO Baru"
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
                        'Save'
                    )}
                </Button>
            </form>
        </Form>
    )
}
