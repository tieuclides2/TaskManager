const TasksSeparator = ({ title, icon }) => {
  return (
    <div className="boder-brand-border flex gap-2 border-b border-solid pb-1">
      {icon}
      <p className="text-brand-text-gray text-sm">{title}</p>
    </div>
  )
}

export default TasksSeparator
