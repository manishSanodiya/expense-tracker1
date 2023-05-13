import React, { useRef, useState, useEffect } from "react";
import classes from "./expenses.module.css";
import FormItem from "./FormItem";

const Expenses = () => {
  const moneySpentRef = useRef("");
  const discriptionRef = useRef("");
  const categoryRef = useRef("");
  const [listData, setListData] = useState([]);
 

  //adding expense to firebase
  const submitHandler = async (e) => {
    e.preventDefault();
    const moneySpent = moneySpentRef.current.value;
    const discription = discriptionRef.current.value;
    const category = categoryRef.current.value;
   
   

    try {
           let lt = {
        moneySp:moneySpent,
        desc:discription,
        cat:category
    }
      const res = await fetch(
        `https://expense-tracker-7fe45-default-rtdb.firebaseio.com/expenses.json`,
        {
          method: "POST",
          body: JSON.stringify({
            amount: moneySpent,
            discription: discription,
            category: category,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
   

      const data = await res.json();
      if (res.ok) {
        const newData = {
          amount: moneySpentRef.current.value,
          category: categoryRef.current.value,
          description: discriptionRef.current.value,
        };
        

        moneySpentRef.current.value = "";
        discriptionRef.current.value = "";
        categoryRef.current.value = "";
      } else {
        throw data.error;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  //getting data when refreshed

  const getItems = async () => {
    let lt = {
       
    }
    try {
      const res = await fetch(
        `https://expense-tracker-7fe45-default-rtdb.firebaseio.com/expenses.json`
      );

      const data = await res.json();
      if (res.ok) {
        let retrievedData = [];
        let totalAmount = 0;

        for (let key in data) {
          retrievedData.push({ id: key, ...data[key] });
        
           
       
          totalAmount = Number(totalAmount) + Number(data[key].amount);
          lt={
            id:key,
            moneySp:data[key].amount,
            desc: data[key].discription,
            cat: data[key].category,

          }
          setListData([...listData,lt])
          
        }
       
      } else {
        throw data.error;
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  
  

  return (
    <div>
      {" "}
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="new-password">Money Spent</label>
          <input type="number" id="spent-money" ref={moneySpentRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="new-password">Discription</label>
          <input type="text" id="discription" ref={discriptionRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="new-password">Category</label>
          <select ref={categoryRef}>
            <option>Food</option>
            <option>OTT</option>
            <option>Games</option>
            <option>Movies</option>
            <option>Groceries</option>
          </select>
        </div>
        <div className={classes.action}>
          <button>Add Expenses</button>
        </div>
      </form>
      <ul>
        {listData !== [] &&
          listData.map((data) => {
            return (
              <p>
                <FormItem
                  key={data.id}
                  money={data.moneySp}
                  discription={data.desc}
                  category={data.cat}
                />
              </p>
            );
          })}
      </ul>
    </div>
  );
};

export default Expenses;
