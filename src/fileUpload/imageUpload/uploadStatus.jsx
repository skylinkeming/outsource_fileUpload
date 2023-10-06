import styled from "styled-components";


export default function UploadStatus({statusInfo, numberOfFile, lostFileList, errorFileList, show, onClickOutside}){
    return (
        <StyledUploadStatus show={show} onClick={()=>{ 
            onClickOutside()
        }}>
            <div className="uploadStatusPanel" onClick={(e)=>{ e.stopPropagation()}}>
                {/* <div className="infoRow">
                    <div className="key">檔案錯誤狀態:</div>
                    <div className="value">{statusInfo}</div>
                </div> */}
                <div className="infoRow">
                    <div className="key">LNM收到檔案數:</div>
                    <div className="value">{numberOfFile}</div>
                </div>
                <div className="infoRow">
                    <div className="key">LNM未收到的檔案明細:</div>
                    <div className="value">{lostFileList}</div>
                </div>
                <div className="infoRow">
                    <div className="key">檔名錯誤/檔案大小錯誤的檔案明細:</div>
                    <div className="value">{errorFileList}</div>
                </div>
            </div>
        </StyledUploadStatus>
    )
}


const StyledUploadStatus = styled.div.attrs(props=>props)`
    opacity:${props=>props.show? "1":"0"};
    pointer-events:${props=>props.show? "initial":"none"};
    background: rgba(0,0,0,0.1);
    width: 100%;
    height: 100%;
    left: 0;
    position: absolute;
    z-index: 2;
    top: 0;
    transition:0.3s;
    .uploadStatusPanel {
        border:5px solid #348fe2;
        border-radius: 10px;
        background:white;
        padding: 10px 20px;
        min-width: 600px;
        font-size: 20px;
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
        z-index:2;
        .infoRow {
        }
        .key {
            font-weight: bold;
        }
    }
`;