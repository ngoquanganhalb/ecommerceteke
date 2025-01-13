import React from 'react'
import { WrapperContent, WrapperLableText, WrapperTextPrice, WrapperTextValue } from './style'
import { Checkbox, Rate } from 'antd';

const NavbarComponent = () => {
    const onChange = () => {}
    const renderContent = (type, options) => { 
        switch (type) {
            case 'text':
                return options.map((option) => { 
                    return(
                        <WrapperTextValue>{option}</WrapperTextValue>
                    )
                })
                case 'checkbox':
                    return (
                        <Checkbox.Group style={{ width: '100%',display:'flex',flexDirection:'column',gap:'10px' }} onChange={onChange}>
                            {options.map((option) => {
                                return(
                                <Checkbox  value={option.value}>
                                    {option.label}
                                </Checkbox>
                                )
                            })}
                        </Checkbox.Group>
                    );
                    case 'star':
                        return  options.map((option) => {
                            console.log('check',option)
                            return(
                                <div style={{display:'flex'}}>
                                    <Rate style={{fontSize :'12px'}} disabled defaultValue={option} />
                                    <span style={{fontSize :'12px'}}>{`tu ${option} sao`}</span>
                                </div>
                                
                            )
                        })
                    case 'price':
                        return  options.map((option) => {
                            return(
                                <WrapperTextPrice>
                                    {option}
                                </WrapperTextPrice>
                                
                            )
                        })
                        
            default:
                return {}
        }
    }
  return (
    <div style={{backgroundColor:'#fff'}}>
        <WrapperLableText>lable</WrapperLableText>
        <WrapperContent>
            {renderContent('text', ['TV','Tủ lạnh','Laptop'])}
        </WrapperContent>
        
    </div>
  )
}

export default NavbarComponent