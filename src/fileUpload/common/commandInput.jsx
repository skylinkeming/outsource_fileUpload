import { useEffect, useState } from "react"
import styled from "styled-components"

const CommandInput = ({labelName, value, onChange, options})=>{
    const [showOption, setShowOption] = useState(false)
    const [searchWord, setSearchWord] = useState("")

    useEffect(()=>{
        if(options.length){
            document.addEventListener("click",clickOutSideMenu)
        }

        return ()=>{
            if(options.length){
                document.removeEventListener("click",clickOutSideMenu)
            }
        }
    },[])

    const clickOutSideMenu = ()=>{
        setShowOption(false);
    }


    return (
        <div className="commandInput" onClick={(e)=>{e.stopPropagation()}}>
            <div className="label">{labelName}</div>
            <div className="inputDiv">
                <input type="text" 
                    onFocus={(e)=>{ setShowOption(true)}} 
                    value={value} 
                    className="form-control" 
                    placeholder="" 
                    onChange={(e)=>{
                        if(labelName === "procedure_name"){
                            setSearchWord(e.target.value)
                            onChange({
                                [labelName]:e.target.value,
                                procedureNameVal:undefined
                            })
                        } else {
                            onChange({[labelName]:e.target.value})
                        }
                    }}
                />
                {options.length > 0 && showOption &&
                    <div className="options">
                        {options.filter(option=> {
                            if(searchWord && searchWord.length > 0){
                               return option.configName.toUpperCase().includes(searchWord.toUpperCase())
                            } 
                            return option;
                        }).map(option=>{
                            return (
                                <div className="option" 
                                    key={option.configValue} 
                                    onClick={()=>{
                                        onChange({
                                            [labelName]:option.configName,
                                            procedureNameVal:option.configValue
                                        })
                                        setShowOption(false)
                                    }}
                                >
                                    {option.configName}
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    )
}


export default CommandInput;
