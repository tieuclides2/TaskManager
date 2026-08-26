import PropTypes from 'prop-types'

const TasksSeparator = ({ title, icon }) => {
  return (
    <div className="boder-brand-border flex gap-2 border-b border-solid pb-1">
      {icon}
      <p className="text-sm text-brand-text-gray">{title}</p>
    </div>
  )
}

TasksSeparator.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
}

export default TasksSeparator
