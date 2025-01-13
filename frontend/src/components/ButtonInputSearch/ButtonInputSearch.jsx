import React from 'react'
import {  SearchOutlined} from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch = (props) => {
    const{
      size,placeholder,textButton,bordered='none',
      backgroundColorInput='#fff',backgroundColorButton='rgb(13,92,182)',
      colorButton ='#fff'
    }= props
  return (
    <div style={{display:`flex`,backgroundColor : `#fff`}}>
        <InputComponent
          size={size} 
          placeholder={placeholder } 
          style={{ borderRadius: '0',backgroundColor : backgroundColorInput, border: bordered }}
          {...props}
        />
        <ButtonComponent
          size={size}  
          icon={<SearchOutlined  style={{color:colorButton }}/>}   
          styleButton={{ borderRadius: '0', border: bordered, background: backgroundColorButton}}
          textButton={textButton}
          styleTextButton={{color: colorButton}}    
          
        />
          
    </div>
  )
}

export default ButtonInputSearch
