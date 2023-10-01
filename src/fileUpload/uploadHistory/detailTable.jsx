import SortIcon from "../common/sortIcon";

const DetailTable = ({dataList, setFunction})=>{
    return (
        <table className="detail table table-striped">
            <thead>
                <tr className="p-3">
                    <th nowrap="true">File Name 
                        <SortIcon dataList={dataList} dataField={"fileName"} setFunction={setFunction}/>
                    </th>
                    <th nowrap="true">Create Time
                        <SortIcon dataList={dataList} dataField={"createTime"} setFunction={setFunction}/>
                    </th>
                    <th nowrap="true">Size
                        <SortIcon dataList={dataList} dataField={"size"} setFunction={setFunction}/>
                    </th>
                    <th nowrap="true">Status
                        <SortIcon dataList={dataList} dataField={"dcmStatus"} setFunction={setFunction}/>
                    </th>
                </tr>
            </thead>
            <tbody>
                {dataList.map(data=>{
                    return (<tr key={data.filePath} className="p-3"><td>{data.fileName}</td><td>{data.createTime}</td><td>{data.size+" bytes"} </td><td>{data.dcmStatus}</td></tr>)
                })}
            </tbody>
        </table>
    )
}

export default DetailTable;