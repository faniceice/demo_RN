import React,{Component} from 'react';
import {Text,FlatList,Image,View,TouchableOpacity} from 'react-native';

export default class UserListComponent extends Component{

  constructor(){
    super();
    this.state = {
      list:[]
    }
  }

  componentWillMount(){
    fetch('http://172.163.100.57/admin/data/user_list.php')
      .then((result)=>result.json())
      .then(
        (result)=>{
          var myList = result.data;
          for(var i=0;i<myList.length;i++)
          {
            myList[i].key = i;
          }
          console.log(myList);
          this.setState({list:myList});
        }
      )
  }

  showPhoneNumber=(index)=>{
    alert(this.state.list[index].phone)
  }

  showItem = (info)=>{
      return <TouchableOpacity 
      onPress={()=>{this.showPhoneNumber(info.index)}}
      style={{flexDirection:'row'}}>
        <Image 
        style={{width:30,height:30,borderRadius:15}}
        source={{uri:'http://172.163.100.57/ajia_code/ajia_code/img/avatar/default.png'}}/>
        <Text>{info.item.uname}</Text>
      </TouchableOpacity>
    }

  render(){
    return <FlatList 
    renderItem={this.showItem}
    data={this.state.list}/>
  }
}