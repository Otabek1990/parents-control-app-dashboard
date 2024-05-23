import { Spin } from 'antd'


function Loading() {
  return (
    <div style={{height:"100vh",width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>

        <Spin style={{height:"100px",width:"100px"}} size='large'/>
    </div>
  )
}

export default Loading