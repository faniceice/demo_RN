import React,{Component} from 'react';
import {Text,FlatList,Image,View,
  ActivityIndicator,TouchableOpacity} from 'react-native';

export default class ProductListComponent extends Component{

  constructor(){
    super();
    this.state = {
      list:[],
      nowPage:1,
      pCount:1
    }
  }


  //组件准备挂载时，调用该方法，向服务器端发起请求
  componentWillMount(){
    this.loadData();
  }

  loadData=()=>{
    setTimeout(()=>{
        fetch('http://172.163.100.57/admin/data/product_list.php?pno='+this.state.nowPage)
        .then((response)=>response.json())
        .then((response)=>{
          console.log(response);
          //状态的写操作
          var myList = response.data;
          this.setState({pCount:response.pageCount});
        
          //将返回的新的数组和当前状态中数组拼在一起
          var nowList = 
          this.state.list.concat(myList);
          
          // 解决一个警告：missing keys for items
          for(var i=0;i<nowList.length;i++){
            nowList[i].key = i;
          }


          this.setState({list:nowList});
        })
    },1500);
 
  

}

  //弹窗显示当前商品所售卖的个数
  showSoldCount=(index)=>{
    alert(this.state.list[index].sold_count);
  }

  //定义一个用来显示列表项的方法
  // 在renderItem所指定的方法 showItem，是有参数的，是个对象，对象中包含item属性、index属性
  showItem=(info)=>{
    return <TouchableOpacity 
    onPress={()=>{
      this.showSoldCount(info.index)
    }}
    style={{flexDirection:'row'}}>
          <Image 
          style={{width:30,height:30}}
          source={{uri:'http://172.163.100.57/ajia_code/ajia_code/'+info.item.pic}}/>
          <Text>{info.item.title}</Text>
      </TouchableOpacity>
  }

  loadMore=()=>{
    //向服务器端 请求下一页的数据
    var pno = this.state.nowPage;
    pno++;
    if(pno > this.state.pCount)
    {
      return;
    }
    this.setState(
      {nowPage:pno},
      ()=>{
        this.loadData();
      }
      );
  }

  renderFooter=()=>{
  if(this.state.nowPage<this.state.pCount)
    {
      return <View>
              <ActivityIndicator size="large"/>
              <Text 
              style={{alignSelf:'center'}}>
                loading...
              </Text>
            </View>
    }
    else{
      return null;
    }
    
  }

  render(){
    return <FlatList 
      ListFooterComponent={this.renderFooter}
      onEndReached={this.loadMore}
      onEndReachedThreshold={0.5}
      renderItem={this.showItem}
      data={this.state.list}/> 

  }

}