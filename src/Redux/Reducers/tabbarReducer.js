const tabbarReducer = (prevState={isShow:true},action)=>{
    let {type,payload} = action
    switch(type){
        case 'SHOW_Tabbar':
            return {...prevState,...{isShow:payload}}
        case 'HIDE_Tabbar':
            return {...prevState,...{isShow:payload}}
        default:
            return prevState
    }
}
export default tabbarReducer