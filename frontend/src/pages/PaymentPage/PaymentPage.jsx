import { Button, Checkbox, Form, Radio } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import Loading from '../../components/LoadingComponent/Loading';

import {
  CustomCheckbox, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft,
  WrapperListOrder, WrapperPriceDiscount, WrapperRight, WrapperStyleHeader,
  WrapperStyleHeaderDilivery, WrapperTotal, Label, WrapperRadio
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
import ModalComponent from '../../components/ModalComponent/ModalComponent'
import InputComponent from '../../components/InputComponent/InputComponent'
import * as UserService from '../../service/UserService'
import * as OrderService from '../../service/OrderService'
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide';
import { useNavigate } from 'react-router-dom';
const PaymentPage = () => {
  const order = useSelector((state) => state.order)
  const user = useSelector((state) => state.user)
  const [delivery, setDelivery] = useState('fast')
  const [payment, setPayment] = useState('later_money')
  const navigate = useNavigate()

  const [listChecked, setListChecked] = useState([])
  const [isModalOpenUpdateInfo, setIsModalOpenUpdateInfo] = useState(false)
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''
  })
  const [form] = Form.useForm()

  const dispatch = useDispatch()

  //console.log('listcheck',listChecked)



  useEffect(() => {
    form.setFieldsValue(stateUserDetails)
  }, [form, stateUserDetails])

  useEffect(() => {
    console.log('user', user)
    if (isModalOpenUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone,
        // city: user?.city
      })
    }
  }, [isModalOpenUpdateInfo])

  const handleChangeAddress = () => {
    setIsModalOpenUpdateInfo(true)
  }
  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      const price = cur.price * cur.amount; // Calculate price here
      return total + price; // Update accumulator
    }, 0); // Initialize accumulator with 0

    return result;
  }, [order]);
  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      const price = (cur.discount * cur.price) / 100; // * cur.amount
      //console.log('discount',cur.discount,cur)
      return total + price; // Update accumulator
    }, 0); // Initialize accumulator with 0
    if (Number(result)) {
      return result;
    }
    return 0;
  }, [order]);
  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo > 100000) {
      return 10000
    }
    else if (priceMemo === 0) {
      return 0
    }
    else {
      return 2000
    }
  }, [priceMemo]);
  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo]);


  const handleAddOrder = () => {
    console.log('user', user)
    if (user?.access_token && order?.orderItemsSelected && user?.name
      && user?.address && user?.phone && user?.city && priceMemo && user?.id) {
      // eslint-disable-next-line no-unused-expressions
      mutationAddOrder.mutate({
        token: user?.access_token,
        orderItems: order?.orderItemsSelected,
        fullName: user?.name,
        address: user?.address,
        phone: user?.phone,
        city: user?.city,
        paymentMethod: payment,
        itemsPrice: priceMemo,
        shippingPrice: diliveryPriceMemo,
        totalPrice: totalPriceMemo,
        user: user?.id
      }
      )
    }
  }

  // console.log(`${process.env.REACT_APP_API_URL}/order/create`);
  // console.log('order',order,user)

  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id,
        token,
        ...rests } = data
      const res = UserService.updateUser(
        id,
        { ...rests },
        token,
      )
      return res
    }
  )

  const mutationAddOrder = useMutationHooks(
    (data) => {
      const {
        token,
        ...rests } = data
      const res = OrderService.createOrder(
        { ...rests },
        token
      )
      return res
    },
  )



  const { isLoading, data } = mutationUpdate
  const { data: dataAdd, isLoading: isLoadingAddOrder, isSuccess, isError } = mutationAddOrder

  //console.log('data',data)
  useEffect(() => {
    if (isSuccess && dataAdd?.status === 'OK') {
      message.success('Dat hang thanh cong')
      navigate('/orderSuccess', {
        state: {
          delivery,
          payment,
          order: order?.orderItemsSelected
        }
      })
    }
    else if (isError) {
      message.error()
    }
  }, [isSuccess, isError])

  const handleCancelUpdate = () => {
    setIsModalOpenUpdateInfo(false)
    setStateUserDetails({
      name: '',
      email: '',
      phone: '',
      address: '',
    })
  }
  const handleUpdateInfoUser = () => {
    console.log('stateUserDetails', stateUserDetails)
    const { name, address, city, phone } = stateUserDetails
    if (name && address && city && phone) {
      mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetails }, {
        onSuccess: () => {
          dispatch(updateUser({ name, address, city, phone }))
          setIsModalOpenUpdateInfo(false)
        }
      })
    }
  }

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value
    })
  }
  const handleDilivery = (e) => {
    setDelivery(e.target.value)
  }

  const handlePayment = (e) => {
    setPayment(e.target.value)
  }
  console.log('state', stateUserDetails)
  return (
    <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
      {/*<Loading isLoading={isLoadingAddOrder}>*/}

      <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
        <h3>Thanh toán</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WrapperLeft>
            <WrapperInfo>
              <div>
                <Label>Chọn phương thức giao hàng </Label>
                <WrapperRadio onChange={handleDilivery} value={delivery}>
                  <Radio value="fast"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>FAST</span> Giao hàng nhanh </Radio>
                  <Radio value="gojek"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>GO_JEK</span>Giao hàng tiết kiệm</Radio>
                </WrapperRadio>
              </div>
            </WrapperInfo>

            <WrapperInfo>
              <div>
                <Label>Chọn phương thức giao hàng</Label>
                <WrapperRadio onChange={handlePayment} value={payment}>
                  <Radio value="later_money">Thanh toán tiền mặt khi nhận hàng </Radio>

                </WrapperRadio>
              </div>
            </WrapperInfo>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: '100%' }}>
              <WrapperInfo>
                <div>
                  <span>Địa chỉ: </span>
                  <span style={{ fontWeight: 'bold' }}>{`${user?.address} ${user?.city}`}</span>
                  <span onClick={handleChangeAddress} style={{ color: 'blue', cursor: 'pointer' }}>Thay đổi </span>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Tạm tính</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>
                    {convertPrice(priceMemo)}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Giảm giá</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>
                    {convertPrice(priceDiscountMemo)}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Thuế</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Phí giao hàng</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>
                    {convertPrice(diliveryPriceMemo)}
                  </span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <span>Tổng tiền</span>
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>
                    {convertPrice(totalPriceMemo)}
                  </span>
                  <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                </span>
              </WrapperTotal>
            </div>
            <ButtonComponent
              onClick={() => handleAddOrder()} //productDetails, numProduct 
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '320px',
                border: 'none',
                borderRadius: '4px'
              }}
              textButton={'Đặt hàng'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
          </WrapperRight>
        </div>
      </div>
      <ModalComponent title="Cập nhật thông tin giao hàng" open={isModalOpenUpdateInfo}
        onCancel={handleCancelUpdate} onOk={handleUpdateInfoUser}
      >
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          //onFinish={onUpdateUser}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
          </Form.Item>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: 'Please input your city!' }]}
          >
            <InputComponent value={stateUserDetails['city']} onChange={handleOnchangeDetails} name="city" />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone!' }]}
          >
            <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
          </Form.Item>
        </Form>
      </ModalComponent>
      {/*</Loading>*/}
    </div>
  )
}

export default PaymentPage