export function getId(handles) {
  return `${handles.join('-')}`
}

export function getName(handles) {
  const first = handles.shift()

  if (handles.length) {
    return `${first}[${handles.join('][')}]`
  }

  return first
}

export function attributesTable(table) {
  const attrs = {}

  if (table && Array.isArray(table)) {
    table.forEach((row) => {
      attrs[row.label] = row.value
    })
  }

  return attrs
}
