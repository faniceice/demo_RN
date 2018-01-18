import React,{Component} from 'react';
import {FlatList,Text} from 'react-native';

export default class TestComponent extends Component{

  constructor(){
    super();
    this.state = {
      list:[]
    }
  }

  componentWillMount(){
    var myList = this.state.list;
    for(var i=1;i<25;i++){
      myList.push(i);
    }
    this.setState({list:myList},()=>{
      console.log(this.state.list);
    });
  }

  showItem=(info)=>{
    return <Text style={{fontSize:20,color:'red'}}>{info.item}</Text>
  }

  //请求下一页的数据，将新的数据和老的数据拼在一起
  loadMore=()=>{
    //假设myList是从服务器端返回的数据
    var myList = [];
    for(var i=25;i<50;i++){
      myList.push(i);
    }
    //将新数据和老数据拼在一起
    var oldList = this.state.list;
    oldList = oldList.concat(myList);
    this.setState({list:oldList});
  }

  render(){
    return <FlatList 
      onEndReached={this.loadMore}
      onEndReachedThreshold={0.5}
      data={this.state.list} 
      renderItem={this.showItem}/>
  }

}