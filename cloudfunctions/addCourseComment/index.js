// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  const targetDB = db.collection(event.db)
  return targetDB.doc(event.id).update({
    data:{
      commentList:event.newCommentList
    }
  }).then(res => true ).catch(err => false )
}