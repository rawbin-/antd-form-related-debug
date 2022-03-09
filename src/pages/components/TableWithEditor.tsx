import { Button, Form, Input, InputNumber, Modal, Table } from 'antd';
import React, { useState } from 'react';

const tableDataSource = [...Array(5).keys()].map(personItem => {
  const personIndex = personItem + 1;
  return {
    name: `person-${personIndex}`,
    age: personIndex,
    money: personIndex,
    books: [...Array(3).keys()].map(bookItem => {
      const bookIndex = bookItem + 1;
      return {
        bookName: `book-${personIndex}-${bookIndex}`,
        bookAmount: personIndex * bookIndex,
        bookPrice: personIndex * bookIndex,
      };
    }),
  };
});

const BookFormPart = ({ name }) => {
  return <>
    <Form.Item name={[name, 'bookName']} label={'书名'}>
      <Input></Input>
    </Form.Item>
    <Form.Item name={[name, 'bookAmount']} label={'数量'}>
      <InputNumber></InputNumber>
    </Form.Item>
    <Form.Item name={[name, 'bookPrice']} label={'价格'}>
      <InputNumber></InputNumber>
    </Form.Item>
  </>;
};


const LineDataForm = ({ form }) => {
  return <Form form={form}>
    <Form.Item name={'name'} label={'姓名'}>
      <Input></Input>
    </Form.Item>
    <Form.Item name={'age'} label={'年龄'}>
      <InputNumber></InputNumber>
    </Form.Item>
    <Form.Item name={'money'} label={'资金'}>
      <InputNumber></InputNumber>
    </Form.Item>
    <Form.List name={'books'}>
      {
        fields => {
          return fields.map((field) => {
            return <BookFormPart key={field.fieldKey} {...field}></BookFormPart>;
          });
        }
      }
    </Form.List>
  </Form>;
};

const TableWithEditor = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [form] = Form.useForm();
  const tableColumns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '资金',
    dataIndex: 'money',
    key: 'money',
  }, {
    title: '操作',
    render: (text: any, record: any) => {
      // @ts-ignore
      return <Button onClick={() => {
        form.setFieldsValue(record);
        setShowEditor(true);
      }}>编辑</Button>;
    },
  }];

  return <>
    <Table dataSource={tableDataSource} columns={tableColumns} rowKey={'name'}></Table>
    <Modal title={'行编辑'} visible={showEditor} onCancel={() => {
      setShowEditor(false);
    }}>
      <LineDataForm form={form}></LineDataForm>
    </Modal>
  </>;
};

export default TableWithEditor;
