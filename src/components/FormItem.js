import React from "react";
import classes from "./expenses.module.css";

const FormItem = (props) => {


  //for editing
  const editHandler =async()=>{
    try{
      const res = await fetch(`https://expense-tracker-7fe45-default-rtdb.firebaseio.com//${props.emailUrl}expenses/${props.data.id}.json`,   {
        method: "DELETE",
      }
    );

    if (res.ok) {
      props.edit(props.data);
    }
  } catch (err) {
    console.log(err.message);
  }
    }
    // https://expensesignup-default-rtdb.firebaseio.com/${props.emailUrl}expenses/${props.item.id}.json
  

  //deleting item
  const deleteHandler = async() =>{
    try {
      const res = await fetch(
        `https://expense-tracker-7fe45-default-rtdb.firebaseio.com//${props.emailUrl}expenses/${props.data.id}.json`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        // console.log('deleted successfully');
        props.deleted(props.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  }


  return (
    <li className={classes.formItem}>
    amount:-Rs{props.money}, for:-{props.discription}, type:-
      {props.category}
      <br />
      <button className={classes.edit} onClick={editHandler}>
        Edit
      </button>
      <button className={classes.delete} onClick={deleteHandler}>
        Delete
      </button>
      
    </li>
  );
};

export default FormItem;
