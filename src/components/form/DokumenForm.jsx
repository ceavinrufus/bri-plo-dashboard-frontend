import { useLazyQuery } from '@apollo/client'
import { gql } from 'graphql-tag'
import { useEffect, useState } from 'react'
import { useWatch } from 'react-hook-form'
import CustomFormField, { FormFieldType } from '../CustomFormField'
import { teams } from '@/data/Tim'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import { FormControl, FormItem, FormMessage } from '../ui/form'

const GET_PENGADAAN_DATA = gql`
    query GetPengadaanData($nomor_spk: String!) {
        pengadaan(nomor_spk: $nomor_spk) {
            id
            perihal
            tanggal_spk
            tim
            catatan
            departemen
        }
    }
`

const DokumenForm = ({ form, onSubmit, defaultValues, children }) => {
    const [departemen, setDepartemen] = useState('')
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
                    form.setValue('perihal', data.pengadaan.perihal)
                    form.setValue('tanggal_spk', data.pengadaan.tanggal_spk)
                    form.setValue('perihal', data.pengadaan.perihal)
                    form.setValue('tanggal_spk', data.pengadaan.tanggal_spk)
                    form.setValue('tim', data.pengadaan.tim)
                    form.setValue('catatan', data.pengadaan.catatan)
                    setDepartemen(data.pengadaan.departemen)
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
                name="perihal"
                label="Perihal"
                placeholder="Perihal"
            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="nama_vendor"
                label="Nama Vendor"
                placeholder="Nama Vendor"
            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="pic_id"
                label="PIC ID"
                placeholder="PIC ID"
            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="sla_spk_sejak_terbit"
                label="SLA SPK Sejak Terbit"
                placeholder="SLA SPK Sejak Terbit"
            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="sla_spk_sejak_diambil"
                label="SLA SPK Sejak Diambil"
                placeholder="SLA SPK Sejak Diambil"
            />
            <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="tanggal"
                label="Tanggal"
            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="jangka_waktu"
                label="Jangka Waktu"
                placeholder="Jangka Waktu"
            />
            <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="tim"
                placeholder={form.watch('tim').toUpperCase() || 'Tim'}
                label="Tim">
                {departemen &&
                    teams[departemen.toLowerCase()].map(team => (
                        <SelectItem key={team.value} value={team.value}>
                            {team.label}
                        </SelectItem>
                    ))}
            </CustomFormField>
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="spk"
                label="SPK"
                placeholder="SPK"
            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="identitas_vendor"
                label="Identitas Vendor"
                placeholder="Identitas Vendor"
            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="info_vendor"
                label="Info Vendor"
                placeholder="Info Vendor"
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
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="tanggal_jatuh_tempo"
                label="Tanggal Jatuh Tempo"
            />
            <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="catatan"
                label="Catatan"
                placeholder="Catatan"
            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="form_tkdn"
                label="Form TKDN"
                placeholder="Form TKDN"
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
            {children}
        </form>
    )
}

export default DokumenForm
