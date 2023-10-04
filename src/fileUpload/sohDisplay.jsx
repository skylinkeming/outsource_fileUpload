import { styled } from "styled-components";
import DateTime from "react-datetime";
import { Panel, PanelBody } from "../components/panel/panel";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import "react-datetime/css/react-datetime.css";
import "react-datepicker/dist/react-datepicker.css";
import fileUploadAPI from "../api/fileUploadAPI";
import Warning from "./common/warning";
import SortIcon from "./common/sortIcon";

export default function SOHDisplay() {
  const menuBtnArr = [
    "DSP1 PS",
    "DSP1 PL",
    "DSP2 PL",
    "DSP2 PS",
    "DSP3 PS",
    "DSP3 PL",
    "DSP4 PS",
    "DSP4 PL",
  ];
  const [clickedBtn, setClickedBtn] = useState("DSP1 PS");
  const [dataList, setDataList] = useState([]);
  const [apiInput, setApiInput] = useState({
    dsp: 1,
    sohType: "PS",
  });

  useEffect(() => {
    fileUploadAPI
      .getSOHInfo(apiInput.sohType, apiInput.dsp)
      .then((result) => {
        if (result.resultStatus === "SUCCESS") {
          setDataList(result.resultObj);
        } else {
          Warning(result.message || result.error);
        }
      })
      .catch(Warning);
  }, [apiInput]);

  return (
    <StyledSOHDisplay>
      <div className="flex">
        <Panel className="one">
          <PanelBody className="p-3 button-menu">
            {menuBtnArr.map((menuItem, idx) => {
              return (
                <button
                  key={menuItem}
                  type="button"
                  className={
                    menuItem === clickedBtn
                      ? "menuBtn btn btn-primary"
                      : "menuBtn btn btn-white"
                  }
                  onClick={() => {
                    setClickedBtn(menuItem);
                    setApiInput({
                      dsp: menuItem.split(" ")[0].substring(3),
                      sohType: menuItem.split(" ")[1],
                    });
                  }}
                >
                  {menuItem}
                </button>
              );
            })}
          </PanelBody>
        </Panel>
        <Panel className="two">
          <PanelBody className="p-3">
            <p className="mb-3 title">Latest Information</p>
            <div className="table-name title">TID RX STATISTIC TABLE</div>
            <div className="entryNum">Entry Num: {dataList.length}</div>
            <table className="table table-sm">
              <thead>
                <tr className="p-3">
                  <th nowrap="true">
                    RECEIVE TIME
                    <SortIcon
                      dataList={dataList}
                      dataField={"receiveTime"}
                      setFunction={setDataList}
                    />
                  </th>
                  <th nowrap="true">
                    TIMESTAMP
                    <SortIcon
                      dataList={dataList}
                      dataField={"timeStamp"}
                      setFunction={setDataList}
                    />
                  </th>
                  <th nowrap="true">
                    ELEMENT
                    <SortIcon
                      dataList={dataList}
                      dataField={"element"}
                      setFunction={setDataList}
                    />
                  </th>
                  <th nowrap="true">
                    VALUE
                    <SortIcon
                      dataList={dataList}
                      dataField={"value"}
                      setFunction={setDataList}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataList.map((data, i) => {
                  return (
                    <tr className="p-3" key={i}>
                      <td>{data.receiveTime}</td>
                      <td>{data.timeStamp}</td>
                      <td>{data.element}</td>
                      <td>{data.value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </PanelBody>
        </Panel>
      </div>
    </StyledSOHDisplay>
  );
}

const StyledSOHDisplay = styled.div`
  .title {
    font-weight: bold;
    font-size: 20px;
  }
  .align-items-center {
    align-items: center;
  }
  .mr-5 {
    margin-right: 5px;
  }
  .search {
    margin-left: 10px;
  }
  .flex {
    display: flex;
    .one {
      min-width: 200px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .two {
      border-left: 1px solid #e9ecef;
      width: 100%;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      .table-name {
        text-align: center;
      }
      .entryNum {
        text-align: center;
        margin-bottom: 20px;
        font-size: 16px;
      }
    }
    .calendar {
      margin-left: 10px;
      display: flex;
      align-items: center;
    }
  }
  .button-menu {
    max-width: 400px;
  }
  .menuBtn {
    width: 100%;
    margin-bottom: 10px;
  }
  .menuBtn.btn.btn-white:hover {
    background: #348fe2 !important;
    color: white;
  }
`;
