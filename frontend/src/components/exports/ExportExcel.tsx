import { LoadingButton } from "@mui/lab";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { useState } from "react";
import useDatatable from "src/hooks/useDatatable";

export default function ExportExcel(props: any) {
    const { rowTotal } = useDatatable();
    
    const [ loading, setLoading ] = useState(false);
  
    const fetch = async (page: number) => {
      let param: any = {
        "page": page == 0 ? page + 1 : page,
        // "limit": 10
      }
      if(props.addonParam !== undefined){
        param = {...props.addonParam,...param};
      }
  
      const response: any = await props.load(param);
      let responseData = response.data;
      if(props.responseDataLocation){
        const a: any = props.responseDataLocation;
        responseData = response;
        a.map((v:string)=>{
          responseData = responseData[v];
        })
      }
      return responseData;
    }
    
    const exportToCSV = async ( fileName: string ) => {
      let csvData: Object[] = [];
      setLoading(true)
      let count = (rowTotal/10);
      count = count <= 1 ? 2 : count;
      for(let i = 1; i < count; i++) {
        let rows = await fetch(i);
        csvData = csvData.concat(rows);
      }
      setLoading(false);
      const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      const ws = XLSX.utils.json_to_sheet(csvData);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
  
      FileSaver.saveAs(data, fileName + fileExtension);
    };
    
    return (
      <>
        <LoadingButton loading={loading} onClick={(e) => exportToCSV('export_data')} {...props}>{props.children}</LoadingButton>
      </>
    );
  }
  