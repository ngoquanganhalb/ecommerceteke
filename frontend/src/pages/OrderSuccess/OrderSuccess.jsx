import { Button, Checkbox, Form, Radio } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import Loading from '../../components/LoadingComponent/Loading';

import {
  CustomCheckbox, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperContainer,
  WrapperListOrder, WrapperPriceDiscount, WrapperRight, WrapperStyleHeader,
  WrapperStyleHeaderDilivery, WrapperTotal, Label, WrapperRadio, WrapperValue
} from './style';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import imag from '../../assets/images/logo-login.png'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { WrapperInputNumber } from './style'
import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct,
  selectedOrder
} from '../../redux/slides/orderSlide';
import { convertPrice } from '../../utils';
import * as UserService from '../../service/UserService'
import * as OrderService from '../../service/OrderService'
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide';
import { useLocation } from 'react-router-dom';

const OrderSuccess = () => {
  const order = useSelector((state) => state.order)
  const location = useLocation()
  console.log('location',location)
  
  return (
    <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
      {/* <Loading isLoading = {isLoadingAddOrder}> */}

      <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
        <h3>Đơn hàng đã đặt thành công </h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WrapperContainer>
            <WrapperInfo>
              <div>
                <Label>Phương thức giao hàng </Label>
                <WrapperValue>
                  <span style={{ color: '#ea8500', fontWeight: 'bold' }}>FAST</span> Giao hàng nhanh
                </WrapperValue>
                {/* <Radio value ="fast"></Radio>
                    <Radio value ="gojek"><span style={{color:'#ea8500', fontWeight:'bold'}}>GO_JEK</span>Giao hàng tiết kiệm</Radio> */}
              </div>
            </WrapperInfo>

            <WrapperInfo>
              <div>
                <Label>Phương thức thanh toán</Label>
                <div>
                  Thanh toán tiền mặt khi nhận hàng
                </div>
              </div>
            </WrapperInfo>

            <WrapperInfo>
              <WrapperItemOrder>
                <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <img src='' style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                  <div style={{
                    width: 260,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>{order?.name}</div>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>
                    <span style={{ fontSize: '13px', color: '#242424' }}>1212121</span>
                    {/* <WrapperPriceDiscount>{order?.amount}</WrapperPriceDiscount> */}
                  </span>
                  <WrapperCountOrder>
                    {/* <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                      onClick={() => handleChangeCount('decrease', order?.product)}
                    >
                      <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                    </button>
                    <WrapperInputNumber defaultValue={order?.amount} value={order?.amount} size="small" />
                    <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                      onClick={() => handleChangeCount('increase', order?.product)}
                    >
                      <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                    </button> */}
                  </WrapperCountOrder>
                  <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}>
                    {convertPrice(order?.price * order?.amount)}
                  </span>

                </div>
              </WrapperItemOrder>
            </WrapperInfo>
          </WrapperContainer>
        </div>
      </div>

      {/* </Loading> */}
    </div>
  )
}

export default OrderSuccess