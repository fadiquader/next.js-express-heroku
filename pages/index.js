import React from 'react';
import Link from 'next/link'
import { Button } from 'antd';
import Head from '../components/head'
import Nav from '../components/nav'
import '../styles/ant.less';


class Home extends React.Component {

    static async getInitialProps({req}) {
        // const data = await require('../data/table.json')
        const res = await fetch(`https://jsonplaceholder.typicode.com/comments`);
        const data = await res.json();
        return {
            data
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            filters: {
                completed: false,
            },
            data: props.data
        };

        this.onSortChange = this.onSortChange.bind(this)
        this.onfilterChange = this.onfilterChange.bind(this)
    }

    onSortChange(e){
        console.log(e.target.checked, e.target.name)
        this.setState({
            sortedInfo: {
                order: !e.target.checked ? 'descend' : 'ascend',
                columnKey: e.target.name,
            },
        });
    }

    onfilterChange(e) {
        const filters = {};
        filters[e.target.name] = e.target.checked;
        const data = [];
        this.props.data.map((record) => {
            if(!filters.completed) return data.push(record);
            if(filters.completed === record.completed)  return data.push(record);
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
            // {
            // title: 'Completed',
            // dataIndex: 'completed',
            // key: 'completed',
            // render: (text, record) => `${text}`
            // }
        ];
        return (
            <div className="container">
              <Row type="flex" gutter={32}>
                <Col span={0}>
                  <div>
                      {/*<Checkbox name="completed" onChange={this.onfilterChange}>Filter by completed</Checkbox>*/}
                  </div>
                </Col>
                <Col span={24}>
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