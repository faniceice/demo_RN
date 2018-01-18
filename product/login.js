import React,{Component} from 'react';
import {View,TextInput,Image,Text,
  Button,ActivityIndicator} from 'react-native';

export default class LoginComponent extends Component{

  constructor(){
    super();

    this.state = {
      userName:'',
      userPwd:'',
      isLoadingShow:false,
      count:0
    };
  }

  sendRequest=()=>{
    //得到用户名、密码
    console.log(this.state);
    //向服务器端发起请求
    var url = 'http://172.163.100.57/admin/data/user/login.php?uname='+this.state.userName+"&upwd="+this.state.userPwd
    console.log(url);

    fetch(url)
    .then((response)=>response.json())
    .then((response)=>{
      console.log(response);
    //根据服务器端返回的结果 决定是不是要跳转到main
      if(response.code == 200){
        //登录成功
        this.props.navigation
        .navigate('myMain')
      }
      else{
        alert('请保证用户名和密码输入正确');
      }
    })
  }

  handlePress=()=>{
    //修改状态isLoadingShow的值该为true
    this.setState({isLoadingShow:true});
    
    //启动一个定时器，3s之后再向服务器端发请求
    myTimer = setInterval(()=>{
      var nowCount = this.state.count;
      nowCount++;
      this.setState({count:nowCount})
      if(nowCount > 3)
      {
        clearInterval(myTimer);
        //修改状态isLoadingShow的值该为false
        this.setState({isLoadingShow:false});
        //向服务器端发请求
        this.sendRequest();
      }
      
    },1000);
  }

  handleChangeUserName=(msg)=>{
    //将输入框中值 保存在 状态中
    this.setState({userName:msg});
  }

  handleChangeUserPwd=(msg)=>{
    this.setState({userPwd:msg});
  }

  render(){
    return <View>
      <Image 
       style={{width:60,height:60,alignSelf:'center',borderRadius:30}}
       source={require('../../img/1.jpg')}/>
      <TextInput 
       onChangeText={this.handleChangeUserName}
       placeholder="用户名"/>
      <TextInput
       secureTextEntry={true} 
       onChangeText={this.handleChangeUserPwd}
       placeholder="密码"/>
      <Button 
      onPress={this.handlePress}
      title="登录"/>

      {
        this.state.isLoadingShow
        &&
        <View style={{alignItems:'center'}}>
          <ActivityIndicator size="large"/>
          <Text>loading...</Text>
        </View>
      }
    </View>
  }

}