const DetailTable = ({dataList})=>{
    return (
        <table className="detail table table-striped">
            <thead>
                <tr className="p-3">
                    <th nowrap="true">File Name</th>
                    <th nowrap="true">Create Time</th>
                    <th nowrap="true">Size</th>
                    <th nowrap="true">Status</th>
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