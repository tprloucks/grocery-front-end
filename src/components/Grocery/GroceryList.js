import React, { Component } from "react";
import PropTypes from "prop-types";
import "./GroceryList.css";
import Button from "../common/Button"

export class GroceryList extends Component {
    state={
        canEdit:false,
        editInput:this.props.item.grocery
    }
    onHandleEditClick=()=>{
        this.setState((prevState)=>{
            return{
                canEdit:!prevState.canEdit,
            }
        })
    }
    handleEditOnChange=(event)=>{
        this.setState({
            editInput:event.target.value
        })
    }
    onHandleEditSubmit=(id)=>{
        this.onHandleEditClick()
        this.props.handleEditByID(id, this.state.editInput)
    }
    render(){
        const { grocery, _id, purchased } = this.props.item;
        const{handleDeleteByID,handleBoughtByID,inputID}= this.props
        const {canEdit, editInput}= this.state
        console.log(this.props.item)
        return(
            <div className="grocerylist-div">
                 {canEdit ? (
          <input
            type="text"
            value={editInput}
            onChange={this.handleEditOnChange}
            name="editInput"
            id={inputID}
          />
        ) : (
          <li className={`li-style ${purchased && "li-style-isDone"}`}>{grocery}</li>
        )}
        {canEdit ? (
          // <button onClick={() => this.onHandleEditSubmit(_id, todo)} id="edit-button">
          //   Submit
          // </button>
          <Button
          buttonName="submit"
          cssid="edit-button"
          clickFunc={()=>this.onHandleEditSubmit(_id, grocery)}
          />
        ) : (
          // <button onClick={this.onHandleEditClick} id="edit-button">
          //   Edit
          // </button></tr>
          
          <Button
          buttonName="Edit"
          cssid="edit-button"
          clickFunc={()=>this.onHandleEditClick()}
          />

        
        )}
        <Button
          buttonName="Delete"
          cssid="delete-button"
          clickFunc={() => handleDeleteByID(_id)}
        />
        <Button
          buttonName="Bought"
          cssid="done-button"
          clickFunc={() => handleBoughtByID(_id, purchased)}
        />
        
           
            </div>
        )
    }
    
}
GroceryList.propTypes={
    item:PropTypes.object.isRequired,
    handleDeleteByID: PropTypes.func.isRequired,
    handleBoughtByID:PropTypes.func.isRequired
}

export default GroceryList


