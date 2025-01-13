import React from 'react'
import { Button } from 'antd';
const ButtonComponent = ({size,styleButton, styleTextButton,textButton,bordered,disabled, ...rests}) => {
  return (
    <Button 
      style={{
        ...styleButton,
        background: disabled ? '#ccc' : styleButton.background
      }}
      size={size}  
      bordered={bordered}
      {...rests}>
      <span style={styleTextButton}>{textButton}</span>
        
    </Button>
  )
}

export default ButtonComponent