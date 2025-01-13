import { Button, Table } from 'antd';
import React, { useMemo, useState } from 'react'
import Loading from '../LoadingComponent/Loading'
import { Excel } from 'antd-table-saveas-excel';
const TableComponent = (props) => {
  const {selectionType = 'checkbox', data:dataSource=[], isLoading = false, columns=[],handleDeleteMany} = props
  const [rowSelectedKeys, setRowSelectedKeys] = useState([])
  const newColumnExport = useMemo(() => {
      const arr = columns?.filter((col) => col.dataIndex !== 'action')
      return arr
    }, [columns])
    //console.log('newColumn Export', newColumnExport)
  
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys)
    },
    // getCheckboxProps: (record) => ({
    // disabled: record.name === 'Disabled User',
    // name: record.name,
    // }),
  };

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
  ];
  const handleDeleteAll = () =>{
    handleDeleteMany(rowSelectedKeys)
  }

  const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(newColumnExport)
      .addDataSource(dataSource, {
        str2Percent: true
      })
      .saveAs("Excel.xlsx");
  };

  return (
    <Loading isPending={isLoading}>
        { rowSelectedKeys.length >0 &&(
          <div style={{
            background: '#1d1ddd', 
            color: '#fff',
            fontWeight: 'bold', 
            padding: '10px',
            cursor: 'pointer'}}   
            onClick={handleDeleteAll}
          > 
            Xóa tất cả
          </div>
        )}
        <Button onClick={exportExcel}>Export Excel</Button>
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={dataSource}
          {...props}
        />
    </Loading>

  )
}

export default TableComponent