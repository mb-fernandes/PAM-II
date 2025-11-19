import { supabase } from "@/services/supabase";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState ([]);

  const fetchTasks = async () => {
    const { data, error } = await supabase.from("tasks").select("*");

    if(error){
      console.error(error);
    } else {
      setTasks(data);
    }

  }; 

  const handleAddTask = async (task:string) => {
    const {data, error} = await supabase
    .from("tasks")
    .insert({ task, completed: false});
  };

  useEffect{() => {
    fetchTasks();
  }, []);

  return ( 
  <SafeAreaView style={StyleSheet.container}>
    <Text style={styles.title}>Adicione uma nova tarefa</Text>
    <View style={styles.inputContainer}>
    <TextInput 
      style={styles.input} 
      placeholder="digite aqui..." 
      onChangeText={(text) => setNewTask(text)}
    value={newTask}
    />
    <TouchableOpacity 
      style={styles.button} 
      onPress={() => handleAddTask(newTask)}
      >
      <text style={styles.buttonText}>Adicionar</text>
    </TouchableOpacity>
    </View>
    <ScrollView>
    {tasks.map((task) => (
      <View style={styles.task} key={task.id}>
      <Text style={styles.textTask}>{task.task}</Text>
      <Button title="concluir"/>
      <Button title="Excluir"/>
      </View>
    ))}
    </ScrollView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:20,
    backgroundColor: "#F5F5F5"
  },
  title: {
    fontSize:20,
    marginBottom:5,
    color:"#333"
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    padding: 10,
    fontSize: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    textAlign:"center",
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#FFF",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset:{
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation:5,
  },
  textTask: {
    fontSize: 18,
    flex: 1,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#888"
  }
});
