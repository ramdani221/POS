import { useSelector } from "@/lib/redux"
import { selectReport } from "@/lib/redux/dashboard/dashboardSlice"
import { CSVLink } from "react-csv"

export default function ButtonReport() {
  const dataReport = useSelector(selectReport)
  return (
    <CSVLink
      className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
      filename="Monthly_Report.csv"
      data={[
        ["Month", "Expense", "Revenue", "Earning"],
        ...dataReport.map(item => [
          item.name,
          item.expense ? item.expense : '0',
          item.revenue ? item.revenue : '0',
          item.earning ? item.earning : '0'
        ])
      ]}
    >
      <i className="fas fa-download fa-sm text-white-50"></i>
      Generate Report
    </CSVLink>
  )
}