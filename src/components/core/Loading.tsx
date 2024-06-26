import { Spin } from 'antd'


function Loading() {
  return (
    <div style={{height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>

        <Spin style={{height:"70px",width:"70px"}} size='large'/>
    </div>
  )
}

export default Loading