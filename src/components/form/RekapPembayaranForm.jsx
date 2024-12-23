import CustomFormField, { FormFieldType } from '../CustomFormField'
import { FormLabel } from '../ui/form'
import currencies from '@/data/Currency'
import { useContext } from 'react'
import { PembayaranContext } from '../context/PembayaranContext'
import { SelectItem } from '../ui/select'

const RekapPembayaranForm = ({ form, onSubmit, defaultValues, children }) => {
    const { userOptions } = useContext(PembayaranContext)

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
            <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="pic_pay_id"
                label="PIC Pay">
                {userOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </CustomFormField>
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
                name="nomor_perjanjian"
                label="Nomor Perjanjian"
                placeholder="Nomor Perjanjian"
            />
            <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="tanggal_perjanjian"
                label="Tanggal Perjanjian"
            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="perihal"
                label="Perihal"
                placeholder="Perihal"
            />
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
                name="vendor"
                label="Vendor"
                placeholder="Vendor"
            />
            <CustomFormField
                fieldType={FormFieldType.NUMERIC}
                control={form.control}
                name="tkdn"
                label="TKDN"
                placeholder="TKDN"
            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="nomor_invoice"
                label="Nomor Invoice"
                placeholder="Nomor Invoice"
            />
            <div className="grid grid-cols-4 items-center gap-1">
                <FormLabel className="shad-input-label">Invoice</FormLabel>
                <CustomFormField
                    fieldType={FormFieldType.NUMERIC}
                    isLabelInline={false}
                    control={form.control}
                    name="nilai_invoice"
                    label="Nilai Invoice"
                    placeholder="Nilai Invoice"
                />
                <CustomFormField
                    fieldType={FormFieldType.COMBOBOX}
                    isLabelInline={false}
                    control={form.control}
                    name="invoice_currency"
                    placeholder={
                        form.watch('invoice_currency') || 'Select Currency'
                    }
                    options={currencies}
                    label="Currency"
                />
                <CustomFormField
                    fieldType={FormFieldType.NUMERIC}
                    isLabelInline={false}
                    control={form.control}
                    name="invoice_rate"
                    label="Rate to IDR"
                    placeholder="Rate to IDR"
                />
            </div>
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="nomor_rekening"
                label="Nomor Rekening"
                placeholder="Nomor Rekening"
            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="nota_fiat"
                label="Nota Fiat"
                placeholder="Nota Fiat"
            />
            <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="tanggal_fiat"
                label="Tanggal Fiat"
            />
            <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="sla"
                label="SLA"
            />
            <CustomFormField
                fieldType={FormFieldType.NUMERIC}
                control={form.control}
                name="hari_pengerjaan"
                label="Hari Pengerjaan"
                placeholder="Hari Pengerjaan"
            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="status_pembayaran"
                label="Status Pembayaran"
                placeholder="Status Pembayaran"
            />
            <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="tanggal_pembayaran"
                label="Tanggal Pembayaran"
            />
            <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="keterangan"
                label="Keterangan"
                placeholder="Keterangan"
            />
            {children}
        </form>
    )
}

export default RekapPembayaranForm
