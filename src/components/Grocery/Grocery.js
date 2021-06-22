import React, { Component } from "react";
// import { v4 as uuidv4 } from "uuid";
import GroceryList from "./GroceryList";
import "./Grocery.css";
import axios from "axios"
import Button from "../common/Button"


const URL ="http://localhost:3001"

export class Grocery extends Component{
    state = {
        groceryList:[],
        GroceryInput:"",
        error:null,
        errorMessage:""
    }
    async componentDidMount(){
        try{
            let allGrocery = await axios.get(
                `${URL}/api/grocery/get-all-grocery`
            )
            console.log(allGrocery)
            this.setState({
                groceryList:allGrocery.data.payload
            })
            
        }catch(e){
            console.log(e)
        }
    }
    handleGroceryOnChange= (event)=>{
        this.setState({
            groceryInput:event.target.value
        })
    }
    handleOnSubmit = async (event) => {
        event.preventDefault();
        if (this.state.groceryInput.length === 0) {
            this.setState({
                error: true,
                errorMessage: "Cannot create empty grocery",
        });
        } else {
            let checkIfGroceryAlreadyExists = this.state.groceryList.findIndex(
                (item) =>
                item.grocery.toLocaleLowerCase() ===
                this.state.groceryInput.toLocaleLowerCase()
        );
        if (checkIfGroceryAlreadyExists > -1) {
                this.setState({
                error: true,
                errorMessage: "Grocery already exists",
            });
        } else {
            try {
                let createdGrocery = await axios.post(
                    `${URL}/api/grocery/create-grocery`,
                    {
                        grocery: this.state.groceryInput,
                    }
            );
    
            let newArray = [
                ...this.state.groceryList, createdGrocery.data.payload
            ];
            this.setState({
                groceryList: newArray,
                groceryInput: "",
            });
            } catch (e) {console.log(e)}
            
            
        }
    }

};
handleDeleteByID= async (_id)=>{
    try{
        let deletedGrocery= await axios.delete(
            `${URL}/api/grocery/delete-grocery/${_id}`
        )
        let filteredArray = this.state.groceryList.filter(
            (item)=>item._id !== deletedGrocery.data.payload._id
        )
        this.setState({
            groceryList:filteredArray
        })
    }catch(e){
        console.log(e)
    }
}
handleBoughtByID= async(id, purchased)=>{
    try{
        let groceryIsBoughtUpdated = await axios.put(
            `${URL}/api/grocery/update-grocery/${id}`,
            {
                purchased:!purchased,
            }
        )
        let updatedArray = this.state.groceryList.map((item)=>{
            if (item._id=== groceryIsBoughtUpdated.data.payload._id){
                item.purchased = groceryIsBoughtUpdated.data.payload.purchased
            }
            return item
        })
        this.setState({
            groceryList:updatedArray
        })
    }catch(e){
        console.log(e)
    }
}
handleEditByID = async(id, editInput)=>{
    try{
        let editedGrocery = await axios.put(
            `${URL}/api/grocery/update-grocery/${id}`,
            {
                grocery:editInput,
            }
        )
        console.log(editedGrocery);
        let updatedGroceryArray = this.state.groceryList.map((item)=>{
            if(item._id === id){
                item.grocery = editedGrocery.data.payload.grocery
            }
            return item
        })
        this.setState({
            groceryList:updatedGroceryArray,

        })
    }catch(e){
        console.log(e)
    }

} 

sortByDate = async (sortOrder)=>{
    try{
        let sortedGrocery = await axios.get(
            `${URL}/api/grocery/get-grocery-by-sort?sort=${sortOrder}`
        )
        this.setState({
            groceryList:sortedGrocery.data.payload
        })
    }catch(e){
        console.log(e)
    }
}
sortByBought = async (purchased) => {
    try {
      let isPurchasedGroceryArray = await axios.get(
        `${URL}/api/grocery/get-grocery-by-bought?purchased=${purchased}`
      );
      this.setState({
        groceryList: isPurchasedGroceryArray.data.payload,
      });
    } catch (e) {
      console.log(e);
    }
  };
  

    render(){
        return(
            <div>
                <div className="form-div">
          <form onSubmit={this.handleOnSubmit}>
            <input
              name="groceryInput"
              type="text"
              onChange={this.handleGroceryOnChange}
              value={this.state.groceryInput}
              
            />
            
            <button type="submit">Submit</button>
            <br />
            <span style={{ color: "red" }}>
              {this.state.error && this.state.errorMessage}
            </span>
          </form>
        </div>
        <div className= "sorting">
            <ul>
                <li>
                <button onClick={()=> this.sortByDate("desc")}>
                Sort by Date - Oldest to newest
                </button>
                </li>
                <li>
              <button onClick={()=> this.sortByDate("asc")}>
                Sort by Date - Newest to oldest
              </button>
            </li>
            <li>
              <button onClick={() =>this.sortByBought("true")}>Sort by Bought</button>
            </li>
            </ul>

        </div>
               <div className="grocery-div">
                   <ul>
                {this.state.groceryList.map((item)=>{
                    return(
                    <GroceryList
                    key={item._id}
                    item={item}
                    handleDeleteByID={this.handleDeleteByID}
                    handleBoughtByID={this.handleBoughtByID}
                    handleEditByID={this.handleEditByID}
                    />
                    )
                })}
                </ul>
                </div>
            </div>
        )
    }
}


export default Grocery;