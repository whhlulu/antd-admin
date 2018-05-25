/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Form, Input, Row, Col, DatePicker, Button } from 'antd'
import { FilterItem } from 'components'

const { Search } = Input
const { RangePicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  md: 8,
  style: {
    marginBottom: 16,
  },
}
const Filter = ({
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const { name } = filter
  const handleFields = (fields) => {
    const { createTime } = fields
    if (createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
    }
    return fields
  }
  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    onFilterChange(fields)
  }
  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange(fields)
  }
  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }
  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }
  return (
    <Row gutter={24}>
      <Col {...ColProps}>
        <FilterItem label="关键字搜索">
          {getFieldDecorator('name', { initialValue: name })(<Search placeholder="Search Name" onSearch={handleSubmit} />)}
        </FilterItem>
      </Col>
      <Col {...ColProps} id="createTimeRangePicker">
        <FilterItem label="生成时间">
          {getFieldDecorator('createTime', { initialValue: initialCreateTime })(<RangePicker
            style={{ width: '100%' }}
            onChange={handleChange.bind(null, 'createTime')}
            getCalendarContainer={() => {
              return document.getElementById('createTimeRangePicker')
            }}
          />)}
        </FilterItem>
      </Col>
      <Col {...ColProps} style={{ textAlign: 'right' }}>
        <Button type="primary" onClick={handleSubmit}>搜索</Button>
        <Button style={{ marginLeft: 10 }} onClick={handleReset}>重置</Button>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
