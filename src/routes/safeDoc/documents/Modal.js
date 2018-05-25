import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'

const modal = ({
  item,
  ...modalProps
}) => {
  const { name } = item
  return (
    <Modal {...modalProps}>
      {name}
      asdsa
    </Modal>
  )
}

modal.propTypes = {
  item: PropTypes.object,
}

export default modal
