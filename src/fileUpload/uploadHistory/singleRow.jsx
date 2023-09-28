import { useEffect, useState } from "react";
import DetailTable from "./detailTable";
import fileUploadAPI from "../../api/fileUploadAPI";

const SingleRow = ({imageId, receiveTime, user, fileName, createTime, size, isExpanded, onClickBtn})=>{
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        if(isExpanded && dataList.length===0){
            getDetailData();
        }

    },[isExpanded])

    const getDetailData = ()=>{
        setLoading(true)
        fileUploadAPI.getPartFileList(imageId).then(result=>{
            setLoading(false)
            if(result.resultStatus === 'SUCCESS'){
                setDataList(result.resultObj.list)
            }else{
                alert(result.message || result.error)
            }
        }).catch(err=>{
            setLoading(false)
            alert(err)
        })
    }

    return (
        <>
            <tr className={isExpanded?"p-3 colored":"p-3"}>
                <td>
                    <button 
                        type="button" 
                        className={"btn btn-default me-1 mb-1" + (isExpanded? " blueBorder":"") }
                        onClick={()=>{
                            onClickBtn(!isExpanded)
                        }}
                    >
                        {isExpanded? "收起": "展開"}
                    </button>
                </td>
                <td>{user}</td>
                <td>{fileName}</td>
                <td>{createTime}</td>
                <td>{size}</td>
            </tr>

            {isExpanded && 
                <tr className="hasDetailTable">
                    <td colSpan={6}>
                        <div className="detailTableWrap">
                            {dataList.length>0?
                                <DetailTable dataList={dataList}/>:
                                <div className="tip">{loading?"loading...":"---暫無資料---"}</div>
                            }
                        </div>
                    </td>
                </tr>
            }
        </>
    )
}

export default SingleRow;