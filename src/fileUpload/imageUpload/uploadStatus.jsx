import styled from "styled-components";


export default function UploadStatus({statusInfo, numberOfFile, lostFileList, errorFileList, show}){
    return (
        <StyledUploadStatus show={show}>
            <div className="infoRow">
                <div className="key">檔案錯誤狀態:</div>
                <div className="value">{statusInfo}</div>
            </div>
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
        </StyledUploadStatus>
    )
}


const StyledUploadStatus = styled.div`
    opacity:${props=>props.show? "1":"0"};
    pointer-events:${props=>props.show? "initial":"none"};
    background:#99dede;
    padding: 10px 20px;
    min-width: 400px;
    font-size: 20px;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    z-index:2;
    .infoRow {
        // display:flex;
    }
`;