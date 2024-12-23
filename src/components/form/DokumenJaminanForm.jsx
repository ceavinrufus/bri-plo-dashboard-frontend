import { useWatch } from 'react-hook-form'
import CustomFormField, { FormFieldType } from '../CustomFormField'
import { SelectItem } from '../ui/select'
import { FormLabel } from '../ui/form'
import currencies from '@/data/Currency'

const DokumenJaminanForm = ({ form, onSubmit, children }) => {
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
            <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="type"
                label="Type">
                <SelectItem value="JUM">Jaminan Uang Muka</SelectItem>
                <SelectItem value="JBayar">Jaminan Pembayaran</SelectItem>
                <SelectItem value="Jampel">Jaminan Pelaksanaan</SelectItem>
                <SelectItem value="JPelihara">Jaminan Pemeliharaan</SelectItem>
            </CustomFormField>
            <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="tanggal_diterima"
                label="Tanggal Diterima"
            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="penerbit"
                label="Penerbit"
                placeholder="Penerbit"
            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="nomor_jaminan"
                label="Nomor Jaminan"
                placeholder="Nomor Jaminan"
            />
            {form.watch('type') === 'Jampel' && (
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="dokumen_keabsahan"
                    label="Dokumen Keabsahan"
                    placeholder="Dokumen Keabsahan"
                />
            )}
            <div className="grid grid-cols-4 items-center gap-1">
                <FormLabel className="shad-input-label">Nilai</FormLabel>
                <CustomFormField
                    fieldType={FormFieldType.NUMERIC}
                    isLabelInline={false}
                    control={form.control}
                    name="nilai_amount"
                    label="Amount"
                    placeholder="Amount"
                />
                <CustomFormField
                    fieldType={FormFieldType.COMBOBOX}
                    isLabelInline={false}
                    control={form.control}
                    name="nilai_currency"
                    label="Currency"
                    placeholder={
                        form.watch('nilai_currency') || 'Select Currency'
                    }
                    options={currencies}
                />
                <CustomFormField
                    fieldType={FormFieldType.NUMERIC}
                    isLabelInline={false}
                    control={form.control}
                    name="nilai_rate"
                    label="Rate to IDR"
                    placeholder="Rate to IDR"
                />
            </div>

            <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="waktu_mulai"
                label="Waktu Mulai"
            />
            <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="waktu_berakhir"
                label="Waktu Berakhir"
            />
            {children}
        </form>
    )
}

export default DokumenJaminanForm
