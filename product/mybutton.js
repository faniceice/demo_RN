import React,{Component} from 'react';

import {TouchableOpacity,Image,Text} from 'react-native';

export default class MyButton extends Component{

  render(){
    return <TouchableOpacity>
      <Image source={require('../../img/product.png')}/>
      <Text>123</Text>
    </TouchableOpacity>
  }
}