import { styled } from "styled-components";
import { Panel, PanelBody } from "../../components/panel/panel";
import { useState } from "react";
import Loader from "../common/loader";
import fileUploadAPI from "../../api/fileUploadAPI";
import UploadStatus from "./uploadStatus";

const initUploadData = {
    fileName:"", 
    fileType:"", 
    user:"", 
    channelList:[{configName:"", configValue:""}], 
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
    const [uploadData, setUploadData] = useState(initUploadData)
    const [uploadStatus, setUploadStatus] = useState(initUploadStatus)
    const [splitFileList, setSplitFileList] = useState([]);
    const [showUploadStatus, setShowUploadStatus] = useState(false)

    const clickUploadBtn = ()=>{
        if(!file){
            alert("請先選擇檔案")
            return;
        }
        setUploadData(initUploadData)
        setLoading(true)
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
                alert(result.message || result.error)
            }
        }).catch((err)=>{
            alert(err)
            setLoading(false)
        })
    }

    const clickPartitionBtn = ()=>{
        if(!uploadData.selectedChannel){
            alert("請選擇channel")
            return;
        }
        setLoading(true)
        fileUploadAPI.splitFile(uploadData.imageId, uploadData.selectedChannel).then(result=>{
            console.log(result);
            setLoading(false)
            if(result.resultStatus === 'SUCCESS'){
                setSplitFileList(result.resultObj.fileList)
            }else{
                alert(result.message || result.error)
            }
        }).catch(err=>{
            alert(err)
            setLoading(false)
        })
    }

    const clickSubmitBtn = ()=>{
        setLoading(true)
        fileUploadAPI.notifyUpload(uploadData.imageId).then(result=>{
            setLoading(false)
            if(result.resultStatus === 'SUCCESS'){
                setUploadStatus({
                    ...result.resultObj
                })
            }else{
                alert(result.message || result.error)
                setUploadStatus({
                    ...result.resultObj, statusInfo:result.message || result.error
                })
            }
            console.log(result)
        }).catch((err)=>{
            alert(err)
            setLoading(false)
        })
    }

    const clickUploadStatusFromLNM = ()=>{
        setShowUploadStatus(!showUploadStatus)
    }

    return (
        <StyledImageUpload>
            {loading && <Loader/>}
             <UploadStatus {...uploadStatus} show={showUploadStatus}/>
            <Panel>
                <PanelBody className="p-0">
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
                        <div className="p-3 detail">
                            File Details:
                            <div>
                                File Name: {uploadData.fileName}
                            </div>
                            <div>
                                File Type: {uploadData.fileType}
                            </div>
                        </div>
                    }
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
                    <div className="btnDiv p-3">
                        {/* {uploadStatus.statusInfo && */}
                            <button type="button" className="btn btn-primary me-3 mb-1" onClick={clickUploadStatusFromLNM}>upload status from LNM</button>
                        {/* } */}
                        <button type="button" className="btn btn-green me-3 mb-1" onClick={clickSubmitBtn}>Submit</button>
                        <button type="button" className="btn btn-info me-1 mb-1" onClick={clickPartitionBtn}>Partition</button>
                    </div>
                </PanelBody>
            </Panel>
            <Panel>
                <PanelBody className="p-3">
                    <p className="mb-3 title">
                        Partition Information
                    </p>
                    <div className="tableWrap">
                        <table className="table table-striped">
                            <thead>
                                <tr className="p-3">
                                <th nowrap="true">User</th>
                                <th nowrap="true">FILE NAME</th>
                                <th nowrap="true">CREATE TIME</th>
                                <th nowrap="true">Size</th>
                                <th nowrap="true">CHANNEL</th>
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
`