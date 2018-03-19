import fetch from 'isomorphic-fetch'
import React from 'react';
import Link from 'next/link'
import { Row, Col, Button, Checkbox, Table } from 'antd';
import Head from '../components/head'
import Nav from '../components/nav'
import '../styles/ant.less';


class Home extends React.Component {

    static async getInitialProps({req}) {
        // const data = await require('../data/table.json')
        const res = await fetch(`https://jsonplaceholder.typicode.com/comments`);
        const data = await res.json();
        return {
            data: data.map(i => {
                i.isDeleted = Math.random() >= 0.5
                return i
            })
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            filters: {
                isDeleted: false,
            },
            data: props.data
        };

        this.onSortChange = this.onSortChange.bind(this)
        this.onfilterChange = this.onfilterChange.bind(this)
    }

    onSortChange(e){
        // console.log(e.target.checked, e.target.name)
        this.setState({
            sortedInfo: {
                order: !e.target.checked ? 'descend' : 'ascend',
                columnKey: e.target.name,
            },
        });
    }

    onfilterChange(e) {
        const filters = {};
        const filterName = e.target.name
        filters[filterName] = e.target.checked;
        const data = [];
        this.props.data.map((record) => {
            if(!filters.isDeleted) return data.push(record);
            if(filters.isDeleted === record.isDeleted)  return data.push(record);
        });

        this.setState(prev => ({
            filters: { ...prev.filters, ...filters },
            data: data
        }))
    }

    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'key',
            },
            {
                title: 'Post ID',
                dataIndex: 'postId',
                key: 'postId',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Body',
                dataIndex: 'body',
                key: 'body',
            },
            {
            title: 'Deleted',
            dataIndex: 'isDeleted',
            key: 'isDeleted',
            render: (text, record) => `${text}`
            }
        ];
        return (
            <div className="container">
                {/*<Head />*/}
              <Row type="flex" gutter={32}>
                <Col span={3}>
                  <div>
                      <Checkbox name="isDeleted" onChange={this.onfilterChange}>Filter by Deleted comments</Checkbox>
                  </div>
                </Col>
                <Col span={21}>
                    <div>
                        <h1>Data count: {this.props.data.length}</h1>
                        <h1>Data count after filter: {this.state.data.length}</h1>
                    </div>
                    <br/>
                  <Table
                      pagination={false}
                      columns={columns}
                      dataSource={this.state.data}
                  />
                </Col>
              </Row>
              <style jsx>
                  {
                      `
          .container {
          width: 75%;
          margin: 20px auto
        }
          `
                  }
              </style>
            </div>
        );
    }
}

export default Home