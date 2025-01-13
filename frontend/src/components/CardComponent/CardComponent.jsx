import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReporText, WrapperStyleTextSell } from './style';
import {    StarFilled  } from '@ant-design/icons';
import logo from '../../assets/images/logo.webp';
import { useNavigate } from 'react-router-dom';
import { convertPrice } from '../../utils';
const CardComponent = (props) => {
    const {countInStock, description, image, name, price, rating, type,selled, discount,id} = props
    const navigate = useNavigate()
    const handleDetailsProduct=(id) =>{
        navigate(`/product-details/${id}`)
    }
  return (
    <WrapperCardStyle
        hoverable
        headStyle={{width:`200px`, height:`200px`}}
        style={{ width: 200 }}
        bodyStyle={{padding: `10px`}}
        cover={<img alt="example" src={image} />}
        onClick={() => handleDetailsProduct(id)}
    >
        <img src={logo} style={{width:`68px`,height:'14px',position:`absolute`,top:0,left:0}} />
        <StyleNameProduct>{name}</StyleNameProduct>
        <WrapperReporText>
            <span style={{marginRight: `4px`}}>
                <span>{rating} <StarFilled style={{fontSize:`12px` , color:`yellow`}}/></span>
            </span>
            <WrapperStyleTextSell>| Đã bán {selled || 100}+</WrapperStyleTextSell>
        </WrapperReporText>
        <WrapperPriceText>
        <span style={{ marginRight: '8px' }}>{convertPrice(price)}</span>
            <WrapperDiscountText>
                - {discount || 6} %
            </WrapperDiscountText>
        </WrapperPriceText>
  </WrapperCardStyle>
  )
}

export default CardComponent