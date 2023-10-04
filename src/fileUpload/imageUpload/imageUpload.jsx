import { styled } from "styled-components";
import { Panel, PanelBody } from "../../components/panel/panel";
import { useState } from "react";
import Loader from "../common/loader";
import fileUploadAPI from "../../api/fileUploadAPI";
import UploadStatus from "./uploadStatus";
import SortIcon from "../common/sortIcon";
import Warning from "../common/warning";
import Success from "../common/success";

const initUploadData = {
    fileName:"", 
    fileType:"", 
    user:"", 
    channelList:[{configName:"請選擇channel", configValue:""}], 
    selectedChannel:""
}

const initUploadStatus = {
    statusInfo:"",
    numberOfFile:0,
    lostFileList:[],
    errorFileList:[]
}

export default function ImageUpload() {
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false);
    const [showSubmitBtn, setShowSubmitBtn] = useState(false);
    const [showStatusBtn, setShowStatusBtn] = useState(false);
    const [uploadData, setUploadData] = useState(initUploadData)
    const [uploadStatus, setUploadStatus] = useState(initUploadStatus)
    const [splitFileList, setSplitFileList] = useState([]);
    const [showUploadStatus, setShowUploadStatus] = useState(false)

    const clickUploadBtn = ()=>{
        if(!file){
            Warning("請先選擇檔案")
            return;
        }
        setUploadData(initUploadData)
        setLoading(true)
        setShowSubmitBtn(false);
        fileUploadAPI.uploadFile(file).then(result=>{
            setLoading(false)
            if(result.resultStatus === 'SUCCESS'){
                setUploadData({
                    fileName:result.resultObj.ImageUploadBean.fileName,
                    fileType: result.resultObj.ImageUploadBean.fileType,
                    user:result.resultObj.ImageUploadBean.creator,
                    channelList:uploadData.channelList.concat(result.resultObj.channelList),
                    imageId:result.resultObj.ImageUploadBean.imageId,
                    selectedChannel:""
                })
            } else {
                Warning(result.message || result.error)
            }
        }).catch((err)=>{
            Warning(err)
            setLoading(false)
        })
    }

    const clickPartitionBtn = ()=>{
        if(!uploadData.fileName){
            Warning("請上傳檔案");
            return;
        }
        if(!uploadData.selectedChannel){
            Warning("請選擇channel")
            return;
        }
        setLoading(true)
        fileUploadAPI.splitFile(uploadData.imageId, uploadData.selectedChannel).then(result=>{
            console.log(result);
            setLoading(false)
            if(result.resultStatus === 'SUCCESS'){
                setSplitFileList(result.resultObj.fileList)
                setShowSubmitBtn(true);
            }else{
                Warning(result.message || result.error)
            }
        }).catch(err=>{
            Warning(err)
            setLoading(false)
        })
    }

    const clickSubmitBtn = ()=>{
        setLoading(true)
        setShowStatusBtn(false)
        fileUploadAPI.notifyUpload(uploadData.imageId).then(result=>{
            setLoading(false)
            if(result.resultStatus === 'SUCCESS'){
                Success("發送成功")
                setShowStatusBtn(false)
                setUploadStatus({
                    ...result.resultObj
                })
            }else{
                setUploadStatus({
                    ...result.resultObj, statusInfo:result.message || result.error
                })
                Warning(result.message || result.error).then(result=>{
                    setShowStatusBtn(true);
                    setShowUploadStatus(true);
                })
            }
            console.log(result)
        }).catch((err)=>{
            Warning(err)
            setLoading(false)
        })
    }

    const clickUploadStatusFromLNM = ()=>{
        setShowUploadStatus(!showUploadStatus)
    }



    return (
        <StyledImageUpload>
            {loading && <Loader/>}
            <Panel>
                <PanelBody className="p-0 topPanel">
                    <p className="mb-0 p-3 title">
                        Image Upload
                    </p>
                    <p className="mb-0 p-3 flex">
                        <button type="button" className="btn btn-primary me-1 mb-1" onClick={()=>{
                            document.querySelector("#uploadInput").click();
                        }}>browse</button>
                        <span className="fileInfo">{file?file.name:""}</span>
                        <input id="uploadInput" type="file" className="form-control" placeholder="選擇圖檔" onChange={(e) => {
                            setFile(e.target.files[0]);
                            setUploadData(initUploadData);
                        }} />
                        <button type="button" className="btn btn-default me-1 mb-1" onClick={clickUploadBtn}>upload</button>
                    </p>
                    {uploadData.fileName &&
                        <>
                            <div className="p-3 detail">
                                File Details:
                                <div>
                                    File Name: {uploadData.fileName}
                                </div>
                                <div>
                                    File Type: {uploadData.fileType}
                                </div>
                            </div>     
                            <div className="p-3 select">
                                channel
                                <select className="form-select"
                                    value={uploadData.selectedChannel}
                                    onChange={e=>{ 
                                        setUploadData({
                                            ...uploadData,
                                            selectedChannel: e.target.value
                                        })
                                    }
                                }>
                                    {uploadData.channelList.map((channel,idx)=>{
                                        return (
                                            <option 
                                                key={channel.configValue+idx} 
                                                value={channel.configValue}
                                            >
                                                {channel && channel.configName? channel.configName : "" }
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="table-responsive p-3">
                                <table className="table">
                                    <thead>
                                        <tr className="p-3">
                                        <th nowrap="true">File Name</th>
                                        <th nowrap="true">User</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="p-3"><td>{uploadData.fileName}</td><td>{uploadData.user}</td></tr>
                                    </tbody>
                                </table>
                            </div>  
                        </>
                    }
                    <div className="btnDiv p-3">
                        {showStatusBtn && 
                            <button type="button" className="btn statusBtn me-3 mb-1" onClick={clickUploadStatusFromLNM}>upload status from LNM</button>
                        }
                        {showSubmitBtn && 
                            <button type="button" className="btn btn-green me-3 mb-1" onClick={clickSubmitBtn}>Submit</button>
                        }
                        <button type="button" className="btn btn-info me-1 mb-1" onClick={clickPartitionBtn}>Partition</button>
                    </div>
                </PanelBody>
            </Panel>
            <Panel>
                <PanelBody className="p-3 partitionResult">
                    <UploadStatus {...uploadStatus} show={showUploadStatus} onClickOutside={()=>{ setShowUploadStatus(false)}}/>
                    <p className="mb-3 title">
                        Partition Information
                    </p>
                    <div className="tableWrap">
                        <table className="table table-striped">
                            <thead>
                                <tr className="p-3">
                                <th nowrap="true">User 
                                    <SortIcon dataList={splitFileList} dataField={"creator"} setFunction={setSplitFileList}/>    
                                </th>
                                <th nowrap="true">FILE NAME 
                                    <SortIcon dataList={splitFileList} dataField={"fileName"} setFunction={setSplitFileList}/>
                                </th>
                                <th nowrap="true">CREATE TIME 
                                    <SortIcon dataList={splitFileList} dataField={"createTime"} setFunction={setSplitFileList}/>
                                </th>
                                <th nowrap="true">Size 
                                    <SortIcon dataList={splitFileList} dataField={"size"} setFunction={setSplitFileList}/>
                                </th>
                                <th nowrap="true">CHANNEL
                                    <SortIcon dataList={splitFileList} dataField={"channel"} setFunction={setSplitFileList}/>
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                {splitFileList.map((splitFile, idx)=>{
                                    return  <tr className="p-3" key={splitFile.createTime+idx}><td>{splitFile.creator}</td><td>{splitFile.fileName}</td><td>{splitFile.createTime}</td><td>{splitFile.size} bytes</td><td>{splitFile.channel}</td></tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </PanelBody>
            </Panel>
        </StyledImageUpload>
    );
}

const StyledImageUpload = styled.div`
    position:relative;
    .title {
        font-size:18px;
    }
    .statusBtn {
        background:#348fe2;
        color:white;
    }
    .fileInfo {
        border: 1px solid #d3d3d3;
        margin: 0 10px;
        padding: 0 10px;
        display: flex;
        height: 34px;
        align-items: center;
        min-width: 210px;
    }
    .flex{
        display:flex;
    }
    input {
        width:200px;
        margin:0 20px;
    }
    #uploadInput {
        display:none;
    }
    .select {
        width:200px;
    }
    .tableWrap {
        max-height: 600px;
        overflow: auto;
        table {
            thead tr th {
                position:sticky;
                top:0;
                background:white;
            }
            tr:hover {
                background:#e2e3e5;
            }
        }
    }
    .btnDiv {
        text-align:right;
    }
    .partitionResult {
        position:relative;
        min-height: 300px;
    }
    i {
        cursor:pointer;
    }
`