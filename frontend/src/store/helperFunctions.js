function next_column_id (state) {
  return state.columns[ state.columns.length - 1 ].id + 1 || 1
}

function next_note_id(state, columnid){
  var nextid;
  var colnotes = state.columns.filter((col) => col.id === columnid)[0].notes  
  if(colnotes.length > 0){
    nextid = colnotes[ colnotes.length - 1 ].id + 1
  }else{
    nextid = 1
  } 
  return nextid
}

function next_reminder_id(state, columnid, noteid){
  var nextid;
  var colnotes = state.columns.filter((col) => col.id === columnid)[0].notes
  if(colnotes.length > 0){
    var note = colnotes.filter((n) => n.id === noteid)[0]
    if(note && note.alerts.length > 0){
      nextid = note.alerts[ note.alerts.length - 1 ].id + 1
    }else{
      nextid = 1
    }
  }else{
    nextid = 1
  }
  return nextid
}


export default {
  next_column_id,
  next_note_id,
  next_reminder_id
}