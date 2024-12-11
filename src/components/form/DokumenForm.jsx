import { useLazyQuery } from '@apollo/client'
import { gql } from 'graphql-tag'
import { useEffect, useState } from 'react'
import { useWatch } from 'react-hook-form'
import CustomFormField, { FormFieldType } from '../CustomFormField'
import { teams } from '@/data/Tim'
import { SelectItem } from '../ui/select'
import { FormLabel } from '../ui/form'
import currencies from '@/data/Currency'

const dokumen_pelengkap_options = [
    {
        value: 'spk',
        label: 'SPK',
    },
    {
        value: 'add_spk',
        label: 'Add SPK',
    },
    {
        value: 'jaminan_pelaksanaan',
        label: 'Jaminan Pelaksanaan',
    },
    {
        value: 'jaminan_pemeliharaan',
        label: 'Jaminan Pemeliharaan',
    },
    {
        value: 'pakta_integritas',
        label: 'Pakta Integritas',
    },
    {
        value: 'tkdn',
        label: 'TKDN',
    },
]

const GET_PENGADAAN_DATA = gql`
    query GetPengadaanData($nomor_spk: String!) {
        pengadaan(nomor_spk: $nomor_spk) {
            id
            perihal
            tanggal_spk
            tim
            catatan
            pelaksana_pekerjaan
            departemen
            pic {
                id
                name
            }
            spk_investasi {
                amount
                currency
                rate
            }
            spk_eksploitasi {
                amount
                currency
                rate
            }
        }
    }
`

const DokumenForm = ({ form, onSubmit, defaultValues, children }) => {
    const [getPengadaanData, { data, loading, error }] =
        useLazyQuery(GET_PENGADAAN_DATA)

    const nomorSpk = useWatch({
        control: form.control,
        name: 'nomor_spk',
    })

    useEffect(() => {
        if (nomorSpk) {
            getPengadaanData({
                variables: { nomor_spk: nomorSpk },
                onCompleted: data => {
                    form.setValue('jenis_pekerjaan', data.pengadaan.perihal)
                    form.setValue('tanggal_spk', data.pengadaan.tanggal_spk)
                    form.setValue('tanggal_spk', data.pengadaan.tanggal_spk)
                    form.setValue('tim_pemrakarsa', data.pengadaan.tim)
                    form.setValue(
                        'pic_pengadaan',
                        JSON.stringify(data.pengadaan.pic),
                    )
                    form.setValue(
                        'pelaksana_pekerjaan',
                        data.pengadaan.pelaksana_pekerjaan,
                    )
                    form.setValue(
                        'nilai_spk',
                        data.pengadaan.spk_investasi.amount +
                            data.pengadaan.spk_eksploitasi.amount,
                    )
                    form.setValue(
                        'spk_currency',
                        data.pengadaan.spk_investasi.currency,
                    )
                    form.setValue('spk_rate', data.pengadaan.spk_investasi.rate)
                },
            })
        }
    }, [nomorSpk, getPengadaanData])

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
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
                name="jenis_pekerjaan"
                label="Jenis Pekerjaan"
                placeholder="Jenis Pekerjaan"
            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="tim_pemrakarsa"
                label="Tim Pemrakarsa"
                placeholder="Tim Pemrakarsa"
            />
            {/* SPK */}
            <div className="grid grid-cols-4 items-center gap-1">
                <FormLabel className="shad-input-label">SPK</FormLabel>
                <CustomFormField
                    fieldType={FormFieldType.NUMERIC}
                    isLabelInline={false}
                    control={form.control}
                    name="nilai_spk"
                    label="Nilai SPK"
                    placeholder="Nilai SPK"
                />
                <CustomFormField
                    fieldType={FormFieldType.COMBOBOX}
                    isLabelInline={false}
                    control={form.control}
                    name="spk_currency"
                    placeholder={
                        form.watch('spk_currency') || 'Select Currency'
                    }
                    options={currencies}
                    label="Currency"
                />
                <CustomFormField
                    fieldType={FormFieldType.NUMERIC}
                    isLabelInline={false}
                    control={form.control}
                    name="spk_rate"
                    label="Rate to IDR"
                    placeholder="Rate to IDR"
                />
            </div>
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="jangka_waktu"
                label="Jangka Waktu"
                placeholder="Jangka Waktu"
            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="pelaksana_pekerjaan"
                label="Pelaksana Pekerjaan"
                placeholder="Pelaksana Pekerjaan"
            />
            <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="alamat_pelaksana_pekerjaan"
                label="Alamat Pelaksana Pekerjaan"
                placeholder="Alamat Pelaksana Pekerjaan"
            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="no_telpon_pelaksana_pekerjaan"
                label="No Telpon Pelaksana Pekerjaan"
                placeholder="No Telpon Pelaksana Pekerjaan"
            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="pic_pelaksana_pekerjaan"
                label="PIC Pelaksana Pekerjaan"
                placeholder="PIC Pelaksana Pekerjaan"
            />
            <CustomFormField
                fieldType={FormFieldType.MULTI_SELECT}
                control={form.control}
                name="dokumen_pelengkap"
                label="Dokumen Pelengkap"
                placeholder="Dokumen Pelengkap"
                options={dokumen_pelengkap_options}
            />
            <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="tanggal_info_ke_vendor"
                label="Tanggal Info ke Vendor"
            />
            <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="tanggal_pengambilan"
                label="Tanggal Pengambilan"
            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="identitas_pengambil"
                label="Identitas Pengambil"
                placeholder="Identitas Pengambil"
            />
            <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="tanggal_pengembalian"
                label="Tanggal Pengembalian"
            />
            <CustomFormField
                fieldType={FormFieldType.MULTI_SELECT}
                control={form.control}
                name="dokumen_yang_dikembalikan"
                label="Dokumen yang Dikembalikan"
                placeholder="Dokumen yang Dikembalikan"
                options={dokumen_pelengkap_options}
            />
            <CustomFormField
                fieldType={FormFieldType.NUMERIC}
                control={form.control}
                name="tkdn_percentage"
                label="TKDN Percentage"
                placeholder="TKDN Percentage"
            />
            <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="tanggal_penyerahan_dokumen"
                label="Tanggal Penyerahan Dokumen"
            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="penerima_dokumen"
                label="Penerima Dokumen"
                placeholder="Penerima Dokumen"
            />
            <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="catatan"
                label="Catatan"
                placeholder="Catatan"
            />
            {children}
        </form>
    )
}

export default DokumenForm
