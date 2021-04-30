import React, { useEffect, useState, useRef }  from 'react';
import { Platform, StyleSheet, Text, View, FlatList, Button, TouchableOpacity, TextInput } from 'react-native';

let array_horas = [{"id":1,"hour":"18:00"},{"id":2,"hour":"16:00"},{"id":3,"hour":"22:00"}]

export default function() {


  const [todoInput, setTodoInput]=useState("hh:mm");
  const [atualiza, setAtualiza]=useState(1)
  const [dados, setDados]=useState([]);
  

  const fakeGet = () => array_horas;
  const fakePost = (valor) => {
    let obj = {"hour":valor};
    array_horas.push(obj);
  }
  const fakeDelete = (valor) => {array_horas = array_horas.filter((x)=> x.hour != valor)} 

  function get() {
    fetch("URl da api")
      .then((res)=> {res.json()})
      .then((json)=> {setDados(json)})
      .catch(()=>{alert("Nao conectou")})
  }

  function post(valor) {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ hour: valor })
    };
    fetch('url de post', requestOptions);
  }

  function remove_hora(valor) {
    const requestOptions = {
      method: 'DELETE',
      body: JSON.stringify({ hour: valor })
    };
    fetch('url de delete', requestOptions);
  }
  
  // useEffect(()=> {
  //   get()
  //   },[atualiza]
  // );

  useEffect(()=>{
    let res = fakeGet();
    setDados(res);
    }, [atualiza]
  );



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{ "Cafeteira App" }</Text>
      </View>
      <View style={styles.subtitle}>
        <Text style={styles.subtitle}>{ "Horarios de Funcionamento" }</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(todoInput) => setTodoInput(todoInput)}
          style={styles.input}
          value={todoInput}
        />
      <TouchableOpacity style={styles.addButton} >
        <Text style={styles.addButtonText} onPress={() => {setTodoInput("hh:mm"); setAtualiza(atualiza+1); fakePost(todoInput)}}>ADD</Text>
      </TouchableOpacity>
      </View>
      <FlatList style={styles.todoItem}
        data={dados}
        keyExtractor={({id}, index)=>id}
        renderItem={({item}) => (
          <TouchableOpacity>
          <Text value={item.hour} onLongPress={()=>{fakeDelete(item.hour); setAtualiza(atualiza+1)}} style={styles.todoText}>{item.hour}</Text> 
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  todoItem: {
    width: '100%',
    height: 20,
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,

    justifyContent: 'space-between',
    paddingLeft: 35
  },
  todoText: {
    fontSize:35,
    color: '#313131'
  },
  header: {
    backgroundColor: '#171717',
    height: 130,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#ff9900',
    fontSize: 38,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  subtitle: {
    fontSize: 25,
    alignItems: "center",
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#ccffff',
  },
    inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#171717',
    shadowOpacity: .1,
    margin:20
  },
  input: {
    backgroundColor: '#F3F3F3',
    flex: 1,
    fontSize: 25,
    height: 35,
    paddingLeft: 15,
  },
  addButton: {
    width: 100,
    backgroundColor: '#FFCE00',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonText: {
    color: '#171717',
    fontSize: 18,
    fontWeight: '700'
  },
});