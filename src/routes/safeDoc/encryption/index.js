import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Steps, Button, Checkbox, Radio, Upload, Icon, message, Input, Tooltip } from 'antd'
import { routerRedux } from 'dva/router'
import { Page } from 'components'
import styles from './index.less'

const Step = Steps.Step
const RadioGroup = Radio.Group
const { Dragger } = Upload

/**
 * 安全配置 Content2
 * @param saveLoading
 * @param curStep
 * @param erpPsnList
 * @param changeStepsKeys
 * @returns {*}
 * @constructor
 */
function Content2 ({
  saveLoading, curStep, erpPsnList, changeStepsKeys,
}) {
  return (
    <div>
      <div className={styles.setting1}>
        <div className={styles.checkbox}><Checkbox defaultChecked>添加明水印</Checkbox></div>
        <div className={styles.radioG}>
          <RadioGroup defaultValue={1}>
            <Radio value={1}>根据名单erp生成</Radio>
            <Radio value={2}>水印文字 <Input placeholder="Basic usage" /></Radio>
          </RadioGroup>
        </div>
      </div>
      <div className={styles.setting2}>
        <div className={styles.checkbox}><Checkbox defaultChecked>添加暗水印</Checkbox></div>
        <div className={styles.radioG}>
          <RadioGroup defaultValue={1}>
            <Radio value={1}>根据名单erp生成</Radio>
            <Radio value={2}>水印文字 <Input placeholder="Basic usage" /></Radio>
          </RadioGroup>
        </div>
      </div>

      <div>{
        erpPsnList.length > 0 && erpPsnList.map(psn =>
          <span key={psn.id}>{psn.name}</span>)
      }</div>

      <div className={styles.toolbar}>
        <Button type="primary" onClick={changeStepsKeys.bind(this, (curStep + 1))} loading={saveLoading}>确认生成</Button>
        <Button style={{ marginLeft: '.5rem' }} onClick={changeStepsKeys.bind(this, (curStep - 1))}>上一步</Button>
      </div>
    </div>
  )
}

const Encryption = ({
  encryption, dispatch,
}) => {
  const { curStep, saveLoading, erpPsnList } = encryption
  const changeStepsKeys = (stepsKey) => {
    dispatch({ type: 'encryption/updateState', payload: { curStep: stepsKey } })
  }
  const goListRoute = () => { dispatch(routerRedux.push('/safeDoc/documents')) }
  const uploadProps = {
    name: 'file',
    multiple: true,
    action: '//jsonplaceholder.typicode.com/posts/',
    onChange (info) {
      const status = info.file.status
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }
  const steps = [{
    title: '文件上传',
    content: <div>
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">点击或拖动到此处上传</p>
        <p className="ant-upload-hint">支持ppt/pptx/pdf</p>
      </Dragger>
      <div className={styles.toolbar}>
        <Button type="primary" onClick={changeStepsKeys.bind(this, (curStep + 1))}>下一步</Button>
      </div>
    </div>,
  }, {
    title: '安全配置',
    content: <Content2 saveLoading={saveLoading} curStep={curStep} erpPsnList={erpPsnList} changeStepsKeys={changeStepsKeys} />,
  }, {
    title: '完成',
    content: <div>
      <div className={styles.success}>
        <Icon type="check-circle" style={{ fontSize: 72, color: '#52c41a' }} />
        <h1>操作成功</h1>
        <div>后台正在加密，预计10分钟内完成</div>
      </div>
      <div className={styles.toolbar}>
        <Tooltip title="同一文件，修改安全配置">
          <Button type="primary" onClick={changeStepsKeys.bind(this, (curStep - 1))}>继续加密</Button>
        </Tooltip>
        <Tooltip title="重新上传文件">
          <Button type="primary" style={{ marginLeft: '.5rem' }} onClick={changeStepsKeys.bind(this, (curStep - 2))}>继续上传</Button>
        </Tooltip>
        <Button style={{ marginLeft: '.5rem' }} onClick={goListRoute}>查看记录</Button>
      </div>
    </div>,
  }]
  return (<Page inner className={styles.encryption}>
    <div className={styles.steps}>
      <Steps current={curStep}>
        {steps.map(item => <Step key={item.title} title={item.title} />)}
      </Steps>
    </div>
    <div className={styles.content}>{steps[curStep].content}</div>
  </Page>)
}

Encryption.propTypes = {
  encryption: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ encryption }) => ({ encryption }))(Encryption)
