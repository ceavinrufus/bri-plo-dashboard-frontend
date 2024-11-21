'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Form, FormLabel } from '@/components/ui/form'
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
        nodin_users: null,
        nodin_user: '',
        tanggal_nodin_user: formatDateYMD(new Date()),
        tim: 'ptt',
        departemen: user.departemen,
        perihal: '',
        nomor_spk: '',
        tanggal_spk: '',
        tanggal_acuan: '',
        pelaksana_pekerjaan: '',
        metode: undefined,
        is_verification_complete: false,
        nodin_plos: null,
        nodin_plo: '',
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
            form.resetField('tanggal_acuan')
            form.resetField('pelaksana_pekerjaan')
            form.resetField('nilai_spk_investasi')
            form.resetField('nilai_spk_eksploitasi')
            form.resetField('anggaran_investasi')
            form.resetField('anggaran_eksploitasi')
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
                anggaran_investasi: JSON.parse(
                    transformedData.anggaran_investasi,
                ),
                anggaran_eksploitasi: JSON.parse(
                    transformedData.anggaran_eksploitasi,
                ),
                hps: JSON.parse(transformedData.hps),
                spk_investasi: JSON.parse(transformedData.spk_investasi),
                spk_eksploitasi: JSON.parse(transformedData.spk_eksploitasi),
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
                        {/* Anggaran Investasi */}
                        <div className="grid grid-cols-4 items-center gap-1">
                            <FormLabel className="shad-input-label">
                                Anggaran Investasi
                            </FormLabel>
                            <CustomFormField
                                fieldType={FormFieldType.NUMERIC}
                                control={form.control}
                                isLabelInline={false}
                                name="anggaran_investasi"
                                label="Nilai"
                                placeholder="Nilai Anggaran Investasi"
                            />
                            <CustomFormField
                                fieldType={FormFieldType.SELECT}
                                control={form.control}
                                isLabelInline={false}
                                name="anggaran_currency"
                                label="Currency"
                                placeholder={
                                    form.watch('anggaran_currency') ||
                                    'Select Currency'
                                }>
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
                        {/* Anggaran Eksploitasi */}
                        <div className="grid grid-cols-4 items-center gap-1">
                            <FormLabel className="shad-input-label">
                                Anggaran Eksploitasi
                            </FormLabel>
                            <CustomFormField
                                fieldType={FormFieldType.NUMERIC}
                                control={form.control}
                                isLabelInline={false}
                                name="anggaran_eksploitasi"
                                label="Nilai"
                                placeholder="Nilai Anggaran Eksploitasi"
                            />
                            <CustomFormField
                                fieldType={FormFieldType.SELECT}
                                control={form.control}
                                isLabelInline={false}
                                name="anggaran_currency"
                                label="Currency"
                                placeholder={
                                    form.watch('anggaran_currency') ||
                                    'Select Currency'
                                }>
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
                        {/* SPK Investasi */}
                        <div className="grid grid-cols-4 items-center gap-1">
                            <FormLabel className="shad-input-label">
                                SPK Investasi
                            </FormLabel>
                            <CustomFormField
                                fieldType={FormFieldType.NUMERIC}
                                control={form.control}
                                isLabelInline={false}
                                name="nilai_spk_investasi"
                                label="Nilai"
                                placeholder="Nilai SPK Investasi"
                            />
                            <CustomFormField
                                fieldType={FormFieldType.SELECT}
                                control={form.control}
                                isLabelInline={false}
                                name="spk_currency"
                                label="Currency"
                                placeholder={
                                    form.watch('spk_currency') ||
                                    'Select Currency'
                                }>
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
                        {/* SPK Eksploitasi */}
                        <div className="grid grid-cols-4 items-center gap-1">
                            <FormLabel className="shad-input-label">
                                SPK Eksploitasi
                            </FormLabel>
                            <CustomFormField
                                fieldType={FormFieldType.NUMERIC}
                                control={form.control}
                                isLabelInline={false}
                                name="nilai_spk_eksploitasi"
                                label="Nilai"
                                placeholder="Nilai SPK Eksploitasi"
                            />
                            <CustomFormField
                                fieldType={FormFieldType.SELECT}
                                control={form.control}
                                isLabelInline={false}
                                name="spk_currency"
                                label="Currency"
                                placeholder={
                                    form.watch('spk_currency') ||
                                    'Select Currency'
                                }>
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
