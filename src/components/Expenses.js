import React, { useRef, useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import classes from './expenses.module.css'
import FormItem from "./FormItem";
import { expenseAction } from "../store/expenseSlice";
import { themeActions } from "../store/themeSlice";

const Expenses = () => {
  const moneySpentRef = useRef("");
  const discriptionRef = useRef("");
  const categoryRef = useRef("");
  const dispatch = useDispatch();
  const [activatePremium, setActivatePremium] = useState(false);
  const totalAmount = useSelector((state) => state.expense.totalAmount)
  const expenseList = useSelector((state) => state.expense.expenses)
  const themeMode = useSelector((state)=> state.theme.theme)

  const email = JSON.parse(localStorage.getItem('data')).email;
    const emailUrl = email.replace(/[@.]/g, '');
  console.log(emailUrl);

 

 

  //adding expense to firebase
  const submitHandler = async (e) => {
    e.preventDefault();
    const moneySpent = moneySpentRef.current.value;
    const discription = discriptionRef.current.value;
    const category = categoryRef.current.value;

    // `https://expensesignup-default-rtdb.firebaseio.com//${emailUrl}expenses.json`
  

    try {
      
      const res = await fetch(
        `https://expense-tracker-7fe45-default-rtdb.firebaseio.com//${emailUrl}expenses.json`,
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
        } ;
        dispatch(
          expenseAction.addExpense({
            expenses: [newData],
            totalAmount: newData.amount,
          })
        );

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
  useEffect(() => {
    
    const getItems = async () => {
      if (expenseList.length === 0) {
      try {
        const res = await fetch(
          `https://expense-tracker-7fe45-default-rtdb.firebaseio.com//${emailUrl}expenses.json`
        );

        const data = await res.json();
        if (res.ok) {
          let retrievedData = [];
          let totalAmount = 0;
          // console.log(data);

          for (let key in data) {
            retrievedData.push({ id: key, ...data[key] });

            totalAmount = Number(totalAmount) + Number(data[key].amount);
          }
          dispatch(
            expenseAction.addExpense({
              expenses: retrievedData,
              totalAmount: totalAmount,
            })
          );
         
        } else {
          throw data.error;
        }
      } catch (err) {
        console.log(err.message);
      }

    }
    };
    getItems();
    console.log("showonrefresh");
  }, [emailUrl,dispatch, expenseList.length]);


  //edit 
  const edit =(data)=>{
    const updatedAmount = totalAmount - Number(data.amount);
    const updatedExpense = expenseList.filter(
      (expense) => expense.id !== data.id
    );
    moneySpentRef.current.value = data.amount;
    categoryRef.current.value = data.category;
    discriptionRef.current.value = data.discription;

    dispatch(
      expenseAction.removeExpense({
        expenses: updatedExpense,
        totalAmount: updatedAmount,
      })
    );

  }

  //delete
  const deleted = (data)=>{
    const updatedAmount = totalAmount - Number(data.amount);
    const updatedExpense = expenseList.filter(
      (expense) => expense.id !== data.id
    );
    dispatch(
      expenseAction.removeExpense({
        expenses: updatedExpense,
        totalAmount: updatedAmount,
      })
    );
  }


  //showing expense in through map 
  const newList =    expenseList.map((data) => {
   
      
       return( <FormItem
        data={data}
        key={data.id}
        money={data.amount}
        discription={data.discription}
        category={data.category}
        edit={edit}
        deleted={deleted}
        emailUrl={emailUrl}
      
      />)
      
  
  })


  //activate premium handler
  const activatePremiumHandler=()=>{
     setActivatePremium(true);
  }

  //dark theme
  const darkModeHandler=()=>{
    if (themeMode === 'light') {
      dispatch(themeActions.dark());
    } else {
      dispatch(themeActions.light());
    }
  }

  if (totalAmount < 10000 && themeMode === 'dark') {
    setActivatePremium(false);
    dispatch(themeActions.light());
  }
  // const newExpenseList = expenseList.map((item) => (
  //   <ExpenseItems
  //   item={item}
  //   key={item.id}
  //   edit={edit}
  //   deleted={deleted}
  //   emailUrl={emailUrl}
  // />
  // ));
  return (
    <div className={classes.form} >
      {totalAmount>10000 && <button className={classes.action} onClick={activatePremiumHandler}>add Premium</button>}
      {activatePremium && <button className={classes.action} onClick={darkModeHandler}>theme change</button>}
      <form onSubmit={submitHandler}>
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
        
       {newList}
        <div className={classes.totalamount}>Total = Rs.{totalAmount}</div>
      </ul>
    </div>
  );
};

export default Expenses;


