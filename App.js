import React from "react";
import {
  View,
  Button,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { CheckBox, Card } from "react-native-elements";
import Constants from "expo-constants";
import DatePicker from "react-native-datepicker";

let id = 0;
var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  let mindate= date+'-'+month+'-'+year

const Todo = (props) => (
  <View style={styles.todoContainer}>
    <CheckBox
      checked={props.todo.checked}
      onPress={props.onTodoClick}
      style={{ paddingRight: 0 }}
    />
    <Text style={{ color: "white", paddingRight: 10 }}>
      {props.todo.dueDate}
    </Text>
    <Text style={{ fontSize: 20, fontWeight: "300", color: "white" }}>
      {props.todo.text}
    </Text>
    <TouchableOpacity style={[styles.button]} onPress={props.onDelete}>
      <Text style={([styles.buttontext], [styles.removebutton])}>Remove</Text>
    </TouchableOpacity>
  </View>
);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      text: "",
      dueDate: "",
      mindate: mindate
    };
  }

  addTodo(text, date) {
    if (text !== "" && date!="") {
      id++;
      this.setState({
        todos: [
          ...this.state.todos,
          { id: id, text: text, checked: false, dueDate: date },
        ],
        text: "",
        dueDate:"",
      });
    }
  }
  takeInput = (input) => {
    this.setState({ text: input });
  };

  dateChange = (date) => {
    this.setState({ dueDate: date });
  };

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  }

  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
          dueDate: todo.dueDate,
        };
      }),
    });
  }

  render() {
    
    return (
      <View style={[styles.appContainer, styles.fill]}>
        <Text style={[styles.heading]}>ToDo List</Text>

        <TextInput
          style={[styles.input]}
          placeholder="Enter your task..."
          placeholderTextColor="grey"
          onChangeText={this.takeInput}
          value={this.state.text}
        />
        <View style={[styles.appdate]}>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.dueDate}
            mode="date"
            placeholder="select date"
            format="DD-MM-YYYY"
            minDate={this.state.mindate}
            maxDate="01-01-2100"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={this.dateChange}
          />
          <TouchableOpacity
            style={[styles.addbutton, styles]}
            onPress={() => this.addTodo(this.state.text, this.state.dueDate)}
          >
            <Text style={[styles.buttontext]}>ADD</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ backgroundColor: "black", marginBottom: 10 }}>
          {this.state.todos.map((todo) => (
            <View>
              <Todo
                onTodoClick={() => this.toggleTodo(todo.id)}
                todo={todo}
                onDelete={() => this.removeTodo(todo.id)}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
  },
  appContainer: {
    paddingTop: Constants.statusBarHeight,
  },
  appdate: {
    flexDirection: "row",
  },
  fill: {
    flex: 1,
    backgroundColor: "black",
  },

  addbutton: {
    display: "flex",
    height: 40,
    borderRadius: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    marginLeft: "auto",
    marginRight: "auto",

    backgroundColor: "#2AC062",
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20,
  },

  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: "auto",
  },
  heading: {
    paddingLeft: 10,
    fontSize: 30,
    fontWeight: "300",
    color: "white",
  },
  input: {
    height: 40,
    borderWidth: 2,
    margin: 10,
    borderColor: "gray",
    paddingLeft: 10,
    fontWeight: "300",
    fontSize: 20,
    color: "white",
  },
  buttontext: {
    fontWeight: "300",
    fontSize: 18,
    color: "white",
    textTransform: "uppercase",
  },
  removebutton: {
    color: "red",
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
