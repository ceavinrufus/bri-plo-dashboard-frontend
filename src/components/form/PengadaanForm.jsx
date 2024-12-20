import React, { useContext, useEffect } from 'react'

import CustomFormField, { FormFieldType } from '../CustomFormField'
import { SelectItem } from '../ui/select'
import { isProgressAbove } from '@/lib/utils'
import { progress } from '@/data/ProgressSelection'
import { FormLabel } from '@/components/ui/form'
import divisiData from '@/data/Divisi'
import currencies from '@/data/Currency'
import { NodinCollapsible } from '../NodinCollapsible'
import { ProjectContext } from '../context/ProjectContext'
import { useWatch } from 'react-hook-form'

const PengadaanForm = ({ form, onSubmit, children }) => {
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
            form.resetField('tkdn_percentage')
        } else {
            form.resetField('nodin_plo')
            form.resetField('tanggal_nodin_plo')
        }
    }, [isVerificationComplete, form])

    const { projectData } = useContext(ProjectContext)
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
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
                        fieldType={FormFieldType.DATE_PICKER}
                        control={form.control}
                        name="verification_completed_at"
                        label="Tanggal Dokumen Lengkap"
                    />
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
                        <SelectItem value="Penunjukan Langsung">
                            Penunjukan Langsung
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
                        <>
                            <CustomFormField
                                fieldType={FormFieldType.DATE_PICKER}
                                control={form.control}
                                name="tanggal_acuan"
                                label={`Tanggal SPPH`}
                                placeholder={`Tanggal SPPH`}
                            />
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name="nodin_ip_pengadaan"
                                label={`Nodin IP Pengadaan`}
                                placeholder={`Nodin IP Pengadaan`}
                            />
                            <CustomFormField
                                fieldType={FormFieldType.DATE_PICKER}
                                control={form.control}
                                name="tanggal_nodin_ip_pengadaan"
                                label={`Tanggal Nodin IP Pengadaan`}
                                placeholder={`Tanggal Nodin IP Pengadaan`}
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
                            fieldType={FormFieldType.COMBOBOX}
                            control={form.control}
                            isLabelInline={false}
                            name="anggaran_currency"
                            placeholder={
                                form.watch('anggaran_currency') ||
                                'Select Currency'
                            }
                            options={currencies}
                            label="Currency"
                        />
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
                            fieldType={FormFieldType.COMBOBOX}
                            control={form.control}
                            isLabelInline={false}
                            name="anggaran_currency"
                            placeholder={
                                form.watch('anggaran_currency') ||
                                'Select Currency'
                            }
                            options={currencies}
                            label="Currency"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.NUMERIC}
                            control={form.control}
                            isLabelInline={false}
                            name="anggaran_rate"
                            label="Rate to IDR"
                            placeholder="Rate to IDR"
                        />
                    </div>
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
                                fieldType={FormFieldType.COMBOBOX}
                                control={form.control}
                                isLabelInline={false}
                                name="hps_currency"
                                placeholder={
                                    form.watch('hps_currency') ||
                                    'Select Currency'
                                }
                                options={currencies}
                                label="Currency"
                            />
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
                            fieldType={FormFieldType.COMBOBOX}
                            control={form.control}
                            isLabelInline={false}
                            name="spk_currency"
                            placeholder={
                                form.watch('spk_currency') || 'Select Currency'
                            }
                            options={currencies}
                            label="Currency"
                        />
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
                            fieldType={FormFieldType.COMBOBOX}
                            control={form.control}
                            isLabelInline={false}
                            name="spk_currency"
                            placeholder={
                                form.watch('spk_currency') || 'Select Currency'
                            }
                            options={currencies}
                            label="Currency"
                        />
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

            {children}
        </form>
    )
}

export default PengadaanForm
