import * as XLSX from 'xlsx';
import { timeConverter } from './timeConverter';

interface PartnerParentData {
  abonent_code: string;
  id: number;
  last_login: string;
  status: string;
  tariff_expiry_time: string | null;
  tariff_name: string | null;
  username: string;
}

interface AdminParentData {
  amount: number;
  payment_status: string;
  username: string;
}

type ExportData = PartnerParentData[] | AdminParentData[];

const exportDatasToExcel = (
  data: ExportData | undefined,
  dataName: string,
  sheetName: string
) => {
  if (data) {
    if (data.length === 0) {
      alert("Ma'lumot mavjud emas. Excelda saqlab bo'lmaydi!");
      return;
    }
    const wb = XLSX.utils.book_new();
    console.log(dataName);

    // Function to add data to a sheet
    const addDataToSheet = (dataArray: ExportData, sheetName: string) => {
      const formattedData = dataArray.map((item, index) => {
        if (dataName === 'adminParents') {
          const adminItem = item as AdminParentData;
          return {
            TartibRaqam: index + 1,
            MijozNomi: adminItem.username,
            TolovHolati: adminItem.payment_status === 'Paid' ? "To'langan" : "To'lanmagan",
            TolovMiqdori: adminItem.amount,
          };
        } else if (dataName === 'partnerParents') {
          const partnerItem = item as PartnerParentData;
          return {
            TartibRaqam: index + 1,
            MijozNomi: partnerItem.username,
            AbonentKodi: partnerItem.abonent_code,
            TarifTuri: partnerItem.tariff_name,
            TolovHolati: partnerItem.status === 'Paid' ? "To'langan" : "To'lanmagan",
            TarifMuddati: partnerItem.tariff_expiry_time ? timeConverter(partnerItem.tariff_expiry_time) : 'Noma\'lum',
            OxirgiKirish: timeConverter(partnerItem.last_login),
          };
        }
      }).filter(Boolean);

      const ws = XLSX.utils.json_to_sheet(formattedData);
      console.log(formattedData);
      const numColumns = dataName === 'adminParents' ? 4: 7;

      const columnWidths = Array.from({ length: numColumns }, (_, index) => ({
        wch: index === 0 ? 3 : 14,
      }));
      columnWidths.forEach((width, columnIndex) => {
        ws['!cols'] = ws['!cols'] || [];
        ws['!cols'][columnIndex] = width;
      });

      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    };

    addDataToSheet(data, sheetName);
    XLSX.writeFile(wb, `${sheetName}.xlsx`);
  } else {
    alert("Hatolik sodir bo'ldi!");
  }
};

export { exportDatasToExcel };



