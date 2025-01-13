import React, { useEffect, useState } from 'react';
import { Badge, Col, Popover } from 'antd';
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderSmall, WrapperContentPopup } from './style';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as UserService from '../../service/UserService';
import { useDispatch } from 'react-redux';
import { resetUser } from '../../redux/slides/userSlide';
import Loading from '../LoadingComponent/Loading';
import { searchProduct } from '../../redux/slides/productSlide';

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order)
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [search, setSearch] = useState('');

  //console.log('num',order)
  const handleNavigateLogin = () => {
    navigate('/sign-in');
  };

  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    localStorage.clear('access_token');
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setUsername(user?.name);
    setUserAvatar(user?.avatar);
    setLoading(false);
  }, [user?.name, user?.avatar]);

  const content = (
    <div>
      <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => navigate('/system/admin')}>Quản lí hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
    </div>
  );
  const onSearch = (e) => { 
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value))
  }
  return (
    <div style={{ width: '100%', background: 'rgb(26, 148, 255)', display: 'flex', justifyContent: 'center' }}>
      <WrapperHeader style={{justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between': 'unset' }}>
        <Col span={5}>
        <div onClick={() => navigate('/')}   style={{cursor:'pointer'}}>
          <WrapperTextHeader>TEKE</WrapperTextHeader>
        </div>
        </Col>
      

        {!isHiddenSearch && (
          <Col span={13}>
            <ButtonInputSearch 
              size="large" placeholder="input search textt" textButton="Tìm kiếm" bordered={false} 
              onChange={onSearch}
            />
          </Col>
        )}

        <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
          <Loading isPending={loading}>
            <WrapperHeaderAccount>
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="avatar"
                  style={{
                    height: '30px',
                    width: '30px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <UserOutlined style={{ fontSize: '30px' }} />
              )}
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click">
                    <div style={{ cursor: 'pointer', color: '#fff' }}>{username?.length ? username : user?.email}</div>
                  </Popover>
                </>
              ) : (
                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                  <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccount>
          </Loading>
          {!isHiddenCart && (
            <div onClick={() => navigate('/order')}   style={{cursor:'pointer'}}>
              <Badge count={order?.orderItems?.length} size="small">
                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  );
};
export default HeaderComponent;
