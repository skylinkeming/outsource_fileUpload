import { styled } from "styled-components";
import { Panel, PanelBody } from "../../components/panel/panel";
import React, { useEffect, useState } from "react";
import SingleRow from "./singleRow";
import fileUploadAPI from "../../api/fileUploadAPI";

export default function UploadHistory() {
  const [file, setFile] = useState();
  const [searchword, setSearchword] = useState("");
  const [expandRow, setExpandRow] = useState("");
  const [resultList, setResultList] = useState([])

  useEffect(() => {
    if(!searchword){
        fileUploadAPI
          .getFileList()
          .then((result) => {
            console.log(result);
            if(result.resultStatus === 'SUCCESS'){
                setResultList(result.resultObj.list)
            }else{
                alert(result.message || result.error)
            
            }
          })
          .catch((err) => {
            alert(err);
          });
    }
  }, [searchword]);

  const clickSearchBtn = ()=>{
    fileUploadAPI
        .getFileList(searchword)
        .then((result) => {
            if(result.resultStatus === 'SUCCESS'){
                setResultList(result.resultObj.list)
            }else{
                alert(result.message || result.error)
            }
        })
        .catch((err) => {
        alert(err);
    });
  }

  return (
    <StyledUploadHistory>
      <div className="flex searchbar">
        <div className="widget-input-box">
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
                setSearchword(e.target.value);
            }}
            onKeyDown={(e)=>{
                if(e.key==='Enter'){
                    clickSearchBtn()
                }
            }}
          />
        </div>
        <button type="button" className="btn btn-primary mb-1" onClick={clickSearchBtn}>
          Search
        </button>
      </div>
      <Panel>
        <PanelBody className="p-4">
          <p className="mb-3 title">History Information</p>
          <div className="tableWrap">
            <table className="table table-sm">
              <thead className="bigTable">
                <tr className="p-3">
                  <th nowrap="true">EXPAND</th>
                  <th nowrap="true">RECEIVE TIME</th>
                  <th nowrap="true">USER</th>
                  <th nowrap="true">FILE NAME</th>
                  <th nowrap="true">CREATETIME</th>
                  <th nowrap="true">SIZE</th>
                </tr>
              </thead>
              <tbody>
                {resultList.map((data, i) => {
                  return (
                    <SingleRow
                      key={data.imageId}
                      imageId={data.imageId}
                      receiveTime={data.submitTime}
                      user={data.creator}
                      fileName={data.fileName}
                      createTime={data.createTime}
                      size={data.size+" bytes"}
                      isExpanded={i === expandRow}
                      onClickBtn={(isExpand) => {
                        if (isExpand) {
                          setExpandRow(i);
                        } else {
                          setExpandRow();
                        }
                      }}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </PanelBody>
      </Panel>
    </StyledUploadHistory>
  );
}

const StyledUploadHistory = styled.div`
  .searchbar {
    margin-bottom: 10px;
    input {
      margin: 0;
    }
    button {
      margin-left: 20px;
    }
  }
  .title {
    font-size: 18px;
  }
  .flex {
    display: flex;
  }
  input {
    width: 200px;
    margin: 0 20px;
  }
  .select {
    width: 200px;
  }
  .tableWrap {
    max-height: 1700px;
    overflow: auto;
    table {
      margin-top: 5px;
      margin-bottom: 20px;
      thead.bigTable tr th {
        position: sticky;
        top: 0;
        background: rgba(233, 236, 239);
      }

      tr.colored {
        background: #e9ecef;
        button {
          transition: 0.3s;
          border: 1px solid #348fe2;
          color: #348fe2;
        }
      }
      td {
        vertical-align: middle;
      }
      .detailTableWrap {   
        max-height: 900px;
        overflow: auto; 
        thead tr th {
            position: sticky;
            top: 0;
            background: #f2f3f4;
        }
      }
    }
    table.detail {
      border: 1px solid #ced4da;
      thead {
        background: #f2f3f4;
      }
    }
  }
  .tip {
    text-align: center;
    padding: 5px;
    font-size: 16px;
  }
`;