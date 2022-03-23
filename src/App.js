import { useState } from 'react';
import * as XLSX from 'xlsx';
import './App.css';

function App() {
  const [fileData, setfileData] = useState([]);
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject)=>{
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      setfileData(d);
      // console.log(d);
    });
  }
  return (
    <>
      <div className="container">
        
        <h1>Show Excel File Data on Browser</h1>
        <br />
        <input type="file" onChange={
          (e)=>{
            const file = e.target.files[0];
            readExcel(file);

          }
          }/>
        <br /> <br /> 
        <table className="table table-responsive">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">City</th>
                  <th scope="col">Country</th>
                </tr>
              </thead>
              <tbody>
                {
                  fileData.map((data)=>{
                    return  <tr key={data.__rowNum__}>
                  <th>{data.Name}</th>
                  <td>{data.Email}</td>
                  <td onClick={()=>{data.sort()}}>{data.City}</td>
                  <td>{data.Country}</td>
                </tr>
                  })
                }
               
              </tbody>
            </table>
      </div>
    </>
  );
}

export default App;
