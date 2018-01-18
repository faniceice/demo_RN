import React,{Component} from 'react';
import {Text,Image,View,
  StyleSheet,TouchableOpacity,ScrollView}
   from 'react-native';
import MyButton from './mybutton';

export default class MainComponent extends Component{

  // jump方法是一个自定义 用来实现导航的方法，只需要通过参数指定要跳转的目的地的地址
  jump=(desPath)=>{
    this.props.navigation.navigate(desPath)
  }

  render(){
    return <ScrollView style={{backgroundColor:'powderblue'}}>
      {/* 第一行 */}
      <View style={{flexDirection:'row'}}>

        {/*第一列*/}
        <View style={myStyles.myCol}>
          <Text style={{color:'red',fontSize:20}}>200</Text>
          <Text>当日PC端PV量</Text>
        </View>

        {/*第二列*/}
        <View style={myStyles.myCol}>
          <Text style={{color:'green',fontSize:20}}>230</Text>
          <Text>移动端PV量</Text>
        </View>
      
      </View>
      {/* 第二行 */}
      <View style={{flexDirection:'row'}}>

        {/*第一列*/}
        <View style={myStyles.myCol}>
          <Text style={{color:'red',fontSize:20}}>1020</Text>
          <Text>已完成订单总数</Text>
        </View>

        {/*第二列*/}
        <View style={myStyles.myCol}>
          <Text style={{color:'green',fontSize:20}}>2390</Text>
          <Text>当日App下载量</Text>
        </View>
      
      </View>
      {/* 第三行 */}
      <View style={{flexDirection:'row'}}>
        {/*第一列*/}
        <TouchableOpacity 
        style={myStyles.myCenter}>
            <Image 
            style={myStyles.myImg}
            source={require('../../img/order.png')}/> 
            <Text>订单管理</Text>
        </TouchableOpacity>
        {/*第二列*/}
        <TouchableOpacity
        onPress={()=>{this.jump('myUL')}}
         style={myStyles.myCenter}>
          <Image 
          style={myStyles.myImg}
          source={require('../../img/user.png')}/> 
          <Text>用户管理</Text>
        </TouchableOpacity>
      </View>
      {/* 第四行 */}
      <View style={{flexDirection:'row'}}>
        {/*第一列*/}
        <TouchableOpacity 
        onPress={()=>this.jump('myPL')}
        style={myStyles.myCenter}>
            <Image 
            style={myStyles.myImg}
            source={require('../../img/product.png')}/> 
            <Text>商品管理</Text>
        </TouchableOpacity>
        {/*第二列*/}
        <TouchableOpacity
         style={myStyles.myCenter}>
          <Image 
          style={myStyles.myImg}
          source={require('../../img/setting.png')}/> 
          <Text>设置</Text>
        </TouchableOpacity>
      </View>
      {/*第五行*/}
      <View Style={{flexDirection:'row'}}>
        <MyButton/>
        <MyButton/>
      </View>
    </ScrollView>
  }

}

const myStyles = StyleSheet.create({
  myCol:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    height:100,
    borderRightWidth:3,
    borderBottomWidth:3,
    borderColor:'#e6e6e6'
  },
  myCenter:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    height:120
  },
  myImg:{
    width:60,
    height:60
  }
})