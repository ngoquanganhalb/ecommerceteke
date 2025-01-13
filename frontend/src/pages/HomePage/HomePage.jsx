import React, { useEffect, useRef, useState } from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider1 from '../../assets/images/slider1.webp'
import slider2 from '../../assets/images/slider2.webp'
import slider3 from '../../assets/images/slider3.webp'
import CardComponent from '../../components/CardComponent/CardComponent'
import { useQuery } from '@tanstack/react-query'
import * as ProductService from '../../service/ProductService'
import { useSelector } from 'react-redux'
import Loading from '../../components/LoadingComponent/Loading'
import { useDebounce } from '../../hooks/useDebounce'
const HomePage = () => {
  const searchProduct =  useSelector((state)=> state?.product?.search)
  const refSearch = useRef()
  const searchDebounce =useDebounce(searchProduct,500)
  const [limit,setLimit] = useState(6)
  const[ stateProducts,setStateProducts] = useState([])
  const [typeProducts,setTypeProducts] = useState([])

  const fetchProductAll = async (search, limit) => {
    const res = await ProductService.getAllProduct(search,limit) 
    if(search.length > 0 || refSearch.current){
      setStateProducts(res?.data)
      return res
    }
    else{
      return res
    }    
  }
  const fetchAllTypeProduct = async() => { 
    const res = await ProductService.getAllTypeProduct() 
    if(res?.status === 'OK'){
      setTypeProducts(res?.data)
    } 
    return res
  }
  useEffect(() =>{
    fetchAllTypeProduct()
  },[])

  useEffect(() => {
    if(refSearch.current) { 
      //console.log('chaychay') 
      fetchProductAll(searchDebounce,limit)
    }
    refSearch.current = true
  },[searchDebounce,limit])

  const { isLoading, data: products,isStale } = useQuery({
    queryKey: ['products',limit], // Include limit in the query key
    queryFn: () => fetchProductAll(searchDebounce,limit), // Pass query function
    keepPreviousData: true
  });
  //console.log('p',products)
  //prev query version
  //const {isLoading, data: products} =  useQuery({ queryKey: 'product',limit, queryFn: fetchProductAll })
  //useQuery(['products'], fetchProductAll)
  //  
  //console.log('dataque', useQuery)
  //console.log('data', product)
  // useEffect(() =>{
  //   if(products?.data?.length > 0){
  //     setStateProducts(products?.data)
  //   }
  // }, [products])
 // console.log('product',products,products?.total,stateProducts?.length, isLoading, products?.totalPage)
  return (
    <>
      <div style={{width:'1270px', margin:'0 auto'}}>
        <WrapperTypeProduct>
          {typeProducts.map((item) =>{
            return(
              <TypeProduct name={item} key={item}/>
            ) 
          })}
        </WrapperTypeProduct>
      </div>
      <div className='body' style={{ width: '100%', backgroundColor: '#efefef', }}>
        <div id="container"   style={{ margin: `0 auto`,height: `1000px`,width:'1270px'}}>
          <SliderComponent arrImages={[slider1,slider2,slider3]}/>   
          <WrapperProducts>
            {stateProducts?.map((product) => {
              return (
                <CardComponent 
                  key={product._id}
                  count InStock={product.countInStock} 
                  description={product.description}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  rating={product.rating}
                  type={product.type}
                  selled={product.selled}
                  discount={product.discount}
                  id={product._id}
                />
              )
            })}
          </WrapperProducts>        
          <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'10px'}}>
            <WrapperButtonMore 
              disabled={products?.total===stateProducts?.length || isLoading || products?.totalPage===1}
              textButton="Xem thêm" type="outline" 
              styleButton={{ 
                border: '1px solid rgb(11, 116, 229)', 
                color: `${(products?.total === stateProducts?.length || isLoading || products?.totalPage===1) ? '#ccc' : 'rgb(11, 116, 229)'}`,
                width: '240px', height: '38px', borderRadius: '4px'
              }} 
              styleTextButton={{
                fontWeight: 500,
                color: (products?.total === stateProducts?.length || isLoading || products?.totalPage===1) && '#fff'
              }}
              onClick ={() => setLimit((prev) => prev + 6)}
              
            />
          </div>
        </div>
      </div>
    </> 
  )
}

export default HomePage